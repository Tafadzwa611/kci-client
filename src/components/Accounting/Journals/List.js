import React, {useState} from 'react';
import DateRange from './DateRange';
import { Fetcher } from '../../../common';
import Table from './Table';
import { Link } from 'react-router-dom';

function List() {
  const [params, setParams] = useState(null);
  const [info, setInfo] = useState({count: 0, next_page_num: 0, journals: []});

  return (
    <>
      <Fetcher urls={['/usersapi/staff/']}>
        {({data}) => (
          <>
            <div style={{margin:'20px 0'}}>
              <button type='button' className='btn btn-success'>
                <Link to='/accounting/viewaccounting/journals/addjournal'>Add Journal</Link>
              </button>
              <button type='button' className='btn btn-success' style={{ marginLeft: 6 }}>
                <Link to='/accounting/viewaccounting/journals/addjournalbatch'>Add Bulk Journals</Link>
              </button>
            </div>
            <DateRange setParams={setParams} staff={data[0]} setInfo={setInfo}/>
            <div style={{paddingTop: '2rem'}}></div>
            <Table info={info} setInfo={setInfo} params={params}/>
          </>
        )}
      </Fetcher>
    </>
  )
}

export default List;