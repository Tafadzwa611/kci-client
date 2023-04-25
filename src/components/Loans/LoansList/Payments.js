import React from 'react';

const thStyle2 = {border: 'none', borderBottom: '1px solid #c1d0d7'};
function Payments({payments}) {
  return (
    <table>
      <thead>
        <tr>
          <th style={thStyle2}><b>Date Recorded</b></th>
          <th style={thStyle2}><b>Collection Date</b></th>
          <th style={thStyle2}><b>Collected by</b></th>
          <th style={thStyle2}><b>Receipt Number</b></th>
          <th style={thStyle2}><b>Notes</b></th>
          <th style={thStyle2}><b>Branch Collected</b></th>
          <th style={thStyle2}><b>Account</b></th>
          <th style={thStyle2}><b>Principal Paid</b></th>
          <th style={thStyle2}><b>Interest Paid</b></th>
          <th style={thStyle2}><b>Penalty Paid</b></th>
          <th style={thStyle2}><b>Fees Paid</b></th>
          <th style={thStyle2}><b>To Be Refunded</b></th>
          <th style={thStyle2}><b>Total Amount Paid</b></th>
          <th style={thStyle2}><b>Action</b></th>
        </tr>
      </thead>
      <tbody>
        {payments.map(payment => (
          <tr key={payment.id}>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.date_recorded}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.cdate_created}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.user_name}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.receipt_number}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.notes}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.branch_name}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.fund_account_name}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.principal_amount_paid}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.interest_amount_paid}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.penalty}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.fees}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.money_to_be_refunded}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.amount_paid}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>Action</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Payments;