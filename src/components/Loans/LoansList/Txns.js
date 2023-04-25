import React from 'react';

const thStyle2 = {border: 'none', borderBottom: '1px solid #c1d0d7'};
function Txns({txns}) {
  return (
    <table>
      <thead>
        <tr>
          <th style={thStyle2}><b>Value Date</b></th>
          <th style={thStyle2}><b>Description</b></th>
          <th style={thStyle2}><b>Debit</b></th>
          <th style={thStyle2}><b>Credit</b></th>
          <th style={thStyle2}><b>Total Balance</b></th>
        </tr>
      </thead>
      <tbody>
        {txns.map(txn => (
          <tr key={txn.id}>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{txn.cvalue_date}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{txn.description}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{txn.entry_type === 'Dr' && txn.amount}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{txn.entry_type === 'Cr' && txn.amount}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{txn.balance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Txns;