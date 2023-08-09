import React, { useState } from 'react';
import axios from 'axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function Table({trail, params, setTrail}) {
  return (
    <>
      <TableHeader trail={trail} params={params} setTrail={setTrail}/>
      <div className='table-container' style={{padding:'0', border:'none'}}>
        <div className='table-responsive font-12' style={{maxHeight:'600px'}}>
          <table className='table' id='clients-report' style={{width:'100%'}}>
            <thead className='clients-report-table'>
              <tr className='journal-details fees__report_thead'> 
                <th>Action</th>
                <th>Entity</th>
                <th>Entity Name/ID</th>
                <th>Perfomed At</th>
                <th>Perfomed By</th>
                <th>Changes</th>
              </tr>
            </thead>
            <tbody>
              {trail.entries.map(entry => (
                <tr key={entry.id}>
                  <td>{entry.action_type} {entry.action_name}</td>
                  <td>{entry.entity}</td>
                  <td>{entry.object_repr}</td>
                  <td>{entry.event_timestamp}</td>
                  <td>{entry.actor_name}</td>
                  <td>{entry.data_changes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

const TableHeader = ({trail, params, setTrail }) => {
  return (
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager nextPageNumber={trail.next_page_num} params={params} prevPageNumber={trail.prev_page_num} setTrail={setTrail}/>
        <div style={{marginTop:'6px'}}>Showing {trail.entries.length} of {trail.count} entries.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {trail.number} of {trail.num_of_pages}</div>
        <div>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='btn btn-default'
            table='clients-report'
            filename='audit-report'
            sheet='tablexls'
            buttonText='Download as XLS'
          />
        </div>
      </div>
    </div>
  )
}

const Pager = ({prevPageNumber, nextPageNumber, setTrail, params}) => {
  const [errors, setErrors] = useState(null);

  const onClick = async (evt) => {
    try {
      const pageNum = evt.target.innerText === 'Next' ? nextPageNumber : prevPageNumber;
      params.set('page_num', pageNum);
      const response = await axios.get('/reportsapi/audit-trail/', {params: params});
      setTrail(response.data);
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

export default Table;