import React from 'react';

function Penalties({penalties}) {
  return (
    <div style={{overflowX:'auto', maxHeight:"600px"}} className="miniLoanDetails-container">
      <table className="table">
        <thead>
          <tr className="journal-details schedule__tables" style={{position:'sticky', top:'0'}}>
            <th className="schedule__table">Penalty Date</th>
            <th className="schedule__table">Reason for Penalty</th>
            <th className="schedule__table">Amount</th>
            <th className="schedule__table">Amount Paid</th>
            <th className="schedule__table">Amount Due</th>
            <th className="schedule__table">Status</th>
            <th className="schedule__table">Action</th>
          </tr>
        </thead>
        <tbody>
          {penalties.map(penalty => (
            <tr key={penalty.id}>
              <td className="schedule__table">{penalty.cdate_created}</td>
              <td className="schedule__table">{penalty.description}</td>
              <td className="schedule__table">{penalty.amount_for_fixed_amount_penalty}</td>
              <td className="schedule__table">{penalty.amount_paid}</td>
              <td className="schedule__table">{penalty.amount_due}</td>
              <td className="schedule__table">{penalty.status}</td>
              <td className="schedule__table">Action</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Penalties;