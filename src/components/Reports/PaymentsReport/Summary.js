import React from 'react';

function Summary({summary}) {
  return (
    <div style={{margin:'2rem 0'}}>
      <div>
        <div style={{display:'grid', marginTop:'1.5rem', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: '10px'}}>
          <div>
            <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
              <li><b>Payments Info</b></li>
              <li>Total Amount Paid: {summary.total_amount_paid}</li>
              <li>Total Principal Paid: {summary.total_principal_paid}</li>
              <li>Total Interest Paid: {summary.total_interest_paid}</li>
              <li>Total Penalty Paid: {summary.total_penalty_paid}</li>
              <li>Total Fees Paid: {summary.total_fees_paid}</li>
              <li>Total Overpayment: {summary.total_overpayment}</li>
              <li>Number Of Payments: {summary.number_of_payments}</li>
              <li>Number Of Loans: {summary.number_of_loans}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Summary;