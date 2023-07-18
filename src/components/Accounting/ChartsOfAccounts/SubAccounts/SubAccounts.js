import React, {useState} from 'react';
import Table from './Table';
import Filter from './Filter';
import { Link } from 'react-router-dom';

const SubAccounts = () => {
  const [subaccounts, setSubAccounts] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [params, setParams] = useState(null);

  return (
    <>
      <div style={{margin:'20px 0'}}>
        <button type='button' className='btn btn-success'>
          <Link to='/accounting/viewaccounting/chartsofaccounts/adddetailaccount'>Add Detail Account</Link>
        </button>
      </div>
      <Filter setSubAccounts={setSubAccounts} setPageInfo={setPageInfo} setParams={setParams}/>
      <Table
        detailAccounts={subaccounts}
        pageInfo={pageInfo}
        currentNumOfAccounts={subaccounts.length}
        setSubAccounts={setSubAccounts}
        setPageInfo={setPageInfo}
        params={params}
      />
    </>
  )
}

export default SubAccounts;