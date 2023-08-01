import React from 'react';

function Summary({summary}) {
  return (
    <div style={{margin:'2rem 0'}}>
      <div>
        <div style={{display:'grid', marginTop:'1.5rem', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: '10px'}}>
          <div>
            <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
              <li><b>Installments Info</b></li>
              <li>Number Of Installments: {summary.num_of_installments}</li>
              <li>Total Expected Amount: {summary.total_expected_amount}</li>
              <li>Total Amount Paid: {summary.total_amount_paid}</li>

              <li>Total Expected Principal: {summary.total_expected_principal}</li>
              <li>Total Expected Interest: {summary.total_expected_interest}</li>
              <li>Total Expected Penalty: {summary.total_expected_penalty}</li>
              <li>Total Expected Fees: {summary.total_expected_fees}</li>
        
              <li>Total Unpaid Principal: {summary.total_pending_principal}</li>
              <li>Total Unpaid Interest: {summary.total_pending_interest}</li>
              <li>Total Unpaid Penalty: {summary.total_pending_penalty}</li>
              <li>Total Unpaid Fees: {summary.total_pending_fees}</li>

              <li>Total Principal Paid: {summary.total_principal_paid}</li>
              <li>Total Interest Paid: {summary.total_interest_paid}</li>
              <li>Total Penalty Paid: {summary.total_penalty_paid}</li>
              <li>Total Fees Paid: {summary.total_fees_paid}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Summary;