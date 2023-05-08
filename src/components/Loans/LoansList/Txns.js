import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function Txns({txns, client_name}) {
  return (
    <>
      <div style={{display:"flex", justifyContent:"flex-end", marginBottom:"1rem"}}>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='btn btn-default'
          table='transactions'
          filename={`${client_name}'s transactions`}
          sheet='tablexls'
          buttonText='Download as XLS'
        />
      </div>
      <div style={{padding:"1.5rem"}} className="miniLoanDetails-container">
        <div style={{width:'100%', overflowX:'auto'}}>
          <div style={{maxHeight:'600px'}}>
            <table className="table" id="transactions">
              <thead>
                <tr className="journal-details header" style={{position:'sticky', top:'0'}}>
                  <th className="schedule__table">Value Date</th>
                  <th className="schedule__table">Description</th>
                  <th className="schedule__table">Debit</th>
                  <th className="schedule__table">Credit</th>
                  <th className="schedule__table">Total Balance</th>
                </tr>
              </thead>
              <tbody>
                {txns.map(txn => (
                  <tr key={txn.id}>
                    <td className="schedule__table">{txn.cvalue_date}</td>
                    <td className="schedule__table">{txn.description}</td>
                    <td className="schedule__table">{txn.entry_type === 'Dr' && txn.amount}</td>
                    <td className="schedule__table">{txn.entry_type === 'Cr' && txn.amount}</td>
                    <td className="schedule__table">{txn.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Txns;