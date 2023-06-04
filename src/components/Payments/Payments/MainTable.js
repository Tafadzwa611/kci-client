import React from 'react';

function MainTable({paymentsData}) {
  const {payments, count} = paymentsData;

  return (
    <>
      <div style={{display:'block'}}>
        <div style={{padding:'0', border:'none'}}>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div className='table__height'>
              <table className='table' id='payments'>
                <thead>
                  <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                    <th style={{textAlign:"start"}}>Loan #</th>
                    <th style={{textAlign:"start"}}>Collection_Date</th>
                    <th style={{textAlign:"start"}}>Collected_By</th>
                    <th style={{textAlign:"start"}}>Payment_Type</th>
                    <th style={{textAlign:"start"}}>Method</th>
                    <th style={{textAlign:"start"}}>Client</th>
                    <th style={{textAlign:"start"}}>Amount_Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map(payment => {
                    return (
                      <tr key={payment.id}>
                        <td style={{verticalAlign:"middle"}}>{payment.loan_number}</td>
                        <td style={{verticalAlign:"middle"}}>{payment.db_date_created}</td>
                        <td style={{verticalAlign:"middle"}}>{payment.collected_by_username}</td>
                        <td style={{verticalAlign:"middle"}}>{payment.payment_type}</td>
                        <td style={{verticalAlign:"middle"}}>{payment.payment_method}</td>
                        <td style={{verticalAlign:"middle"}}>{payment.client}</td>
                        <td style={{verticalAlign:"middle"}}>{payment.amount_paid}</td>
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

export default MainTable;