import React, { useEffect, useRef, useState } from 'react';
import { Fetcher } from '../../common';
import { Link } from 'react-router-dom';
import { useNotifications } from '../../contexts/NotificationsContext';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from 'axios';

function Notifications() {
  return (
    <Fetcher urls={['/usersapi/get-notifications/?page_num=1']}>
      {({data}) => <Table data={data[0]}/>}
    </Fetcher>
  )
}

const getLink = (entityId, ntype) => {
  return {
    export: `/data/viewdata/dataexport/${entityId}`
  }[ntype]
}

const Table = ({data}) => {
  const [notifications, setNotifications] = useState(data);
  const [showNew, setShowNew] = useState(false);
  const {unreadNotifs} = useNotifications(0);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (!isFirstRun.current && unreadNotifs) {
      setShowNew(true);
    }
    isFirstRun.current = false;
  }, [unreadNotifs]);

  const refresh = async () => {
    try {
      const response = await axios.get('/usersapi/get-notifications/?page_num=1');
      setNotifications(response.data);
      setShowNew(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {showNew ?
      <span onClick={refresh} style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>Show New Notifications</span> :
      null}
      <TableHeader notifications={notifications} setNotifications={setNotifications}/>
      <div style={{display:'block'}}>
        <div style={{padding:'0', border:'none'}}>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div className='table__height'>
              <table className='table' id='journals'>
                <thead>
                  <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                    <th style={{textAlign:'start'}}>Description</th>
                    <th style={{textAlign:'start'}}>Created By</th>
                    <th style={{textAlign:'start'}}>Date Created</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.list.map(notif => {
                    return (
                      <tr key={notif.id}>
                        <td style={{verticalAlign:'middle'}}>
                          {notif.entity_id ?
                          <Link to={getLink(notif.entity_id, notif.ntype)}>
                            {notif.description}
                          </Link> : notif.description}
                        </td>
                        <td style={{verticalAlign:'middle'}}>{notif.created_by}</td>
                        <td style={{verticalAlign:'middle'}}>{notif.date_created}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const TableHeader = ({notifications, setNotifications}) => {
  return (
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager nextPageNumber={notifications.next_page_num} prevPageNumber={notifications.prev_page_num} setNotifications={setNotifications}/>
        <div style={{marginTop:'6px'}}>Showing {notifications.list.length} of {notifications.count} notifications.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {notifications.page_number} of {notifications.num_of_pages}</div>
        <div>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='btn btn-default'
            table='journals'
            filename='ledger'
            sheet='tablexls'
            buttonText='Download as XLS'
          />
        </div>
      </div>
    </div>
  )
}

const Pager = ({prevPageNumber, nextPageNumber, setNotifications}) => {
  const [errors, setErrors] = useState(null);

  const onClick = async (evt) => {
    try {
      const pageNum = evt.target.innerText === 'Next' ? nextPageNumber : prevPageNumber;
      const response = await axios.get(`/usersapi/get-notifications/?page_num=${pageNum}`);
      setNotifications(response.data);
    } catch (error) {
      if (error.message === 'Network Error') {
        setErrors({detail: 'Network Error'});
      } else {
        setErrors({detail: 'Server Error'});
      }
    }
  }

  return (
    <div className='footer-container font-12 text-light' style={{display:'flex', columnGap:'3px'}}>
      {errors && JSON.stringify(errors)}
      {prevPageNumber && <><button className='btn btn-default' onClick={onClick}>Back</button><br/></>}
      {nextPageNumber ? <button className='btn btn-default' onClick={onClick}>Next</button>: null}
    </div>
  )
}

export default Notifications