import React, {useState} from 'react';
import axios from 'axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Link } from 'react-router-dom';

const Table = ({ detailAccounts, pageInfo, currentNumOfAccounts, setSubAccounts, setPageInfo, params }) => {
  return (
    <>
      <div className='table-header'>
        <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
          <Pager
            nextPageNumber={pageInfo.next_page_num}
            prevPageNumber={pageInfo.prev_page_num}
            params={params}
            setSubAccounts={setSubAccounts}
            setPageInfo={setPageInfo}
          />
          <div style={{marginTop:'6px'}}>Showing {currentNumOfAccounts} of {pageInfo.count} clients.</div>
        </div>
        <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
          <div style={{marginTop:'6px'}}>Page {pageInfo.number} of {pageInfo.num_of_pages}</div>
          <div>
            <ReactHTMLTableToExcel
              id='test-table-xls-button'
              className='btn btn-default'
              table='clients'
              filename='clients'
              sheet='tablexls'
              buttonText='Download as XLS'
            />
          </div>
        </div>
      </div>
      <div style={{padding:'0', border:'none', marginTop:'2rem'}} className='table-container full__width font-12'>
        <div className='table-responsive full__table'>
          <div style={{position:'sticky', top:'0'}}>
            <table className='table'>
              <thead>
                <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                  <th>GL Code</th>
                  <th>Branch</th>
                  <th>Account Date</th>
                  <th>Account Name</th>
                  <th>Account Type</th>
                  <th>Balance</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {detailAccounts.map(account => {
                  return (
                    <tr key={account.id}>
                      <td><Link to={`/accounting/viewaccounting/chartsofaccounts/detailaccount/${account.id}`}>{account.general_ledger_code}</Link></td>
                      <td>{account.branch__name}</td>
                      <td>{account.account_date}</td>
                      <td>{account.general_ledger_name}</td>
                      <td>{account.account_type}</td>
                      <td>{account.account_balance}</td>
                      <td>{account.suspended ? 'No' : 'Yes'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

const Pager = ({prevPageNumber, nextPageNumber, setSubAccounts, setPageInfo, params}) => {
  const [errors, setErrors] = useState(null);

  const onClick = async (evt) => {
    try {
      const pageNum = evt.target.innerText === 'Next' ? nextPageNumber : prevPageNumber;
      params.set('page_num', pageNum);
      const response = await axios.get('/acc-api/sub_accounts_api/', {params: params});
      setSubAccounts(response.data.accounts);
      delete response.data['accounts'];
      setPageInfo(response.data);
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
      {errors ? JSON.stringify(errors) : null}
      {prevPageNumber ? <><button className='btn btn-default' onClick={onClick}>Back</button><br/></> : null}
      {nextPageNumber ? <button className='btn btn-default' onClick={onClick}>Next</button> : null}
    </div>
  )
}

export default Table;