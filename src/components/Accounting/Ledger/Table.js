import React from 'react';
import Pager from './Pager';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function Table({openingBal, txns, params, setTxns, mode}) {
  return (
    <>
      <TableHeader txns={txns} params={params} setTxns={setTxns} mode={mode}/>
      <div style={{display:'block'}}>
        <div style={{padding:'0', border:'none'}}>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div className='table__height'>
              <table className='table' id='journals'>
                <thead>
                  <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                    <th style={{textAlign:"start"}}>Transaction_ID</th>
                    <th style={{textAlign:"start"}}>Booking_Date</th>
                    <th style={{textAlign:"start"}}>Date_Created</th>
                    <th style={{textAlign:"start"}}>Credit</th>
                    <th style={{textAlign:"start"}}>Debit</th>
                    <th style={{textAlign:"start"}}>Balance</th>
                    <th style={{textAlign:"start"}}>Client_Id</th>
                    <th style={{textAlign:"start"}}>Client_Name</th>
                    <th style={{textAlign:"start"}}>Account_Id</th>
                    <th style={{textAlign:"start"}}>Created_By</th>
                  </tr>
                </thead>
                <tbody>
                  {txns.number == 1 &&
                    <tr>
                      <td style={{verticalAlign:"middle"}}>Opening Balance</td>
                      <td style={{verticalAlign:"middle"}}></td>
                      <td style={{verticalAlign:"middle"}}></td>
                      <td style={{verticalAlign:"middle"}}></td>
                      <td style={{verticalAlign:"middle"}}></td>
                      <td style={{verticalAlign:"middle"}}>{openingBal}</td>
                      <td style={{verticalAlign:"middle"}}></td>
                      <td style={{verticalAlign:"middle"}}></td>
                      <td style={{verticalAlign:"middle"}}></td>
                      <td style={{verticalAlign:"middle"}}></td>
                    </tr>
                  }
                  {txns.journals.map(txn => {
                    return (
                      <tr key={txn.id}>
                        <td style={{verticalAlign:"middle"}}>{txn.transaction_id}</td>
                        <td style={{verticalAlign:"middle"}}>{txn.booking_date}</td>
                        <td style={{verticalAlign:"middle"}}>{txn.date_logged}</td>
                        <td style={{verticalAlign:"middle"}}>{txn.credit ?? ''}</td>
                        <td style={{verticalAlign:"middle"}}>{txn.debit ?? ''}</td>
                        <td style={{verticalAlign:"middle"}}>{txn.balance}</td>
                        <td style={{verticalAlign:"middle"}}>{txn.client_id}</td>
                        <td style={{verticalAlign:"middle"}}>{txn.client_name}</td>
                        <td style={{verticalAlign:"middle"}}>{txn.account_id}</td>
                        <td style={{verticalAlign:"middle"}}>{txn.created_by_name}</td>
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

const TableHeader = ({txns, params, setTxns, mode}) => {
  return (
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager
          nextPageNumber={txns.next_page_num}
          params={params}
          loadMoreExpenses={() => console.log('loadMoreExpenses')}
          loadingMore={false}
          prevPageNumber={txns.prev_page_num}
          setTxns={setTxns}
          mode={mode}
        />
        <div style={{marginTop:'6px'}}>Showing {txns.journals.length} of {txns.count} transactions.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {txns.number} of {txns.num_of_pages}</div>
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

export default Table;
