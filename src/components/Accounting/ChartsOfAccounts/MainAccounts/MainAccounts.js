import React, {useState} from 'react';
import DateRange from './DateRange';
import { Link } from 'react-router-dom';

const MainAccounts = () => {
  const [mainaccounts, setMainAccounts] = useState([]);

  return (
    <>
      <div style={{margin:'20px 0'}}>
        <button type='button' className='btn btn-success'>
          <Link to='/accounting/viewaccounting/chartsofaccounts/addheaderaccount'>Add Header Account</Link>
        </button>
      </div>
      <DateRange setMainAccounts={setMainAccounts}/>
      <div style={{paddingTop: '2rem'}}></div>
      <div style={{padding:'0', border:'none'}} className='table-container full__width font-12'>
        <div className='table-responsive full__table'>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div className='table__height'>
              <table className='table' id='accounts'>
                <thead>
                  <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                    <th>GL Code</th>
                    <th>Main Account Name</th>
                    <th>Type</th>
                    <th>Date Created</th>
                  </tr>
                </thead>
                <tbody>
                  {mainaccounts.map(account => {
                    return (
                      <tr key={account.id}>
                        <td>
                          <Link to={`/accounting/viewaccounting/chartsofaccounts/headeraccount/${account.id}`}>
                            {account.general_ledger_code}
                          </Link>
                        </td>
                        <td>{account.general_ledger_name}</td>
                        <td>{account.account_type}</td>
                        <td>{account.account_date}</td>
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

export default MainAccounts;