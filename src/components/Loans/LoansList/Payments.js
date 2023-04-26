import React from 'react';

function Payments({payments}) {
  return (
    <div style={{overflowX:'auto', maxHeight:"600px"}} className="miniLoanDetails-container">
      <table className="table">
        <thead>
          <tr className="journal-details schedule__tables" style={{position:'sticky', top:'0'}}>
            <th className="schedule__table">Date Recorded</th>
            <th className="schedule__table">Collection Date</th>
            <th className="schedule__table">Collected by</th>
            <th className="schedule__table">Receipt Number</th>
            <th className="schedule__table">Notes</th>
            <th className="schedule__table">Branch Collected</th>
            <th className="schedule__table">Account</th>
            <th className="schedule__table">Principal Paid</th>
            <th className="schedule__table">Interest Paid</th>
            <th className="schedule__table">Penalty Paid</th>
            <th className="schedule__table">Fees Paid</th>
            <th className="schedule__table">To Be Refunded</th>
            <th className="schedule__table">Total Amount Paid</th>
            <th className="schedule__table">Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.id}>
              <td className="schedule__table">{payment.date_recorded}</td>
              <td className="schedule__table">{payment.cdate_created}</td>
              <td className="schedule__table">{payment.user_name}</td>
              <td className="schedule__table">{payment.receipt_number}</td>
              <td className="schedule__table">{payment.notes}</td>
              <td className="schedule__table">{payment.branch_name}</td>
              <td className="schedule__table">{payment.fund_account_name}</td>
              <td className="schedule__table">{payment.principal_amount_paid}</td>
              <td className="schedule__table">{payment.interest_amount_paid}</td>
              <td className="schedule__table">{payment.penalty}</td>
              <td className="schedule__table">{payment.fees}</td>
              <td className="schedule__table">{payment.money_to_be_refunded}</td>
              <td className="schedule__table">{payment.amount_paid}</td>
              <td className="schedule__table">Action</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Payments;