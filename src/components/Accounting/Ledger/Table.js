import React, {useState} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Table({txns, params, setTxns}) {
  return (
    <>
      <TableHeader txns={txns} params={params} setTxns={setTxns}/>
      <div style={{display:'block'}}>
        <div style={{padding:'0', border:'none'}}>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div className='table__height'>
              <table className='table' id='journals'>
                <thead>
                  <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                    <th style={{textAlign:'start'}}>Transaction_ID</th>
                    <th style={{textAlign:'start'}}>Value_Date</th>
                    <th style={{textAlign:'start'}}>Date_Created</th>
                    <th style={{textAlign:'start'}}>Credit</th>
                    <th style={{textAlign:'start'}}>Debit</th>
                    <th style={{textAlign:'start'}}>Balance</th>
                    <th style={{textAlign:'start'}}>Client_Id</th>
                    <th style={{textAlign:'start'}}>Client_Name</th>
                    <th style={{textAlign:'start'}}>Account_Id</th>
                    <th style={{textAlign:'start'}}>Created_By</th>
                  </tr>
                </thead>
                <tbody>
                  {txns.page_number == 1 ?
                  <tr>
                    <td style={{verticalAlign:'middle'}}>Opening Balance</td>
                    <td style={{verticalAlign:'middle'}}></td>
                    <td style={{verticalAlign:'middle'}}></td>
                    <td style={{verticalAlign:'middle'}}></td>
                    <td style={{verticalAlign:'middle'}}></td>
                    <td style={{verticalAlign:'middle'}}>{txns.account_opening_balance}</td>
                    <td style={{verticalAlign:'middle'}}></td>
                    <td style={{verticalAlign:'middle'}}></td>
                    <td style={{verticalAlign:'middle'}}></td>
                    <td style={{verticalAlign:'middle'}}></td>
                  </tr> : null}
                  {txns.journals.map(txn => {
                    return (
                      <tr key={txn.id}>
                        <td style={{verticalAlign:'middle'}}>
                          <Link to={`/accounting/viewaccounting/journals/journal/${txn.id}`}>
                            {txn.transaction_id}
                          </Link>
                        </td>
                        <td style={{verticalAlign:'middle'}}>{txn.value_date}</td>
                        <td style={{verticalAlign:'middle'}}>{txn.date_logged}</td>
                        <td style={{verticalAlign:'middle'}}>{txn.credit}</td>
                        <td style={{verticalAlign:'middle'}}>{txn.debit}</td>
                        <td style={{verticalAlign:'middle'}}>{txn.balance}</td>
                        <td style={{verticalAlign:'middle'}}>{txn.client_id}</td>
                        <td style={{verticalAlign:'middle'}}>{txn.client_name}</td>
                        <td style={{verticalAlign:'middle'}}>{txn.account_id}</td>
                        <td style={{verticalAlign:'middle'}}>{txn.created_by_name}</td>
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

const TableHeader = ({txns, params, setTxns}) => {
  return (
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager nextPageNumber={txns.next_page_num} params={params} prevPageNumber={txns.prev_page_num} setTxns={setTxns}/>
        <div style={{marginTop:'6px'}}>Showing {txns.journals.length} of {txns.count} transactions.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {txns.page_number} of {txns.num_of_pages}</div>
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

const Pager = ({prevPageNumber, nextPageNumber, setTxns, params}) => {
  const [errors, setErrors] = useState(null);

  const onClick = async (evt) => {
    try {
      const pageNum = evt.target.innerText === 'Next' ? nextPageNumber : prevPageNumber;
      params.set('page_num', pageNum);
      const response = await axios.get('/acc-api/ledger/', {params: params});
      setTxns(response.data);
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
