import React from 'react';

function Txns({txns}) {
  return (
    <div style={{overflowX:'auto', maxHeight:"600px"}} className="miniLoanDetails-container">
      <table className="table">
        <thead>
          <tr className="journal-details schedule__tables" style={{position:'sticky', top:'0'}}>
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
  )
}

export default Txns;