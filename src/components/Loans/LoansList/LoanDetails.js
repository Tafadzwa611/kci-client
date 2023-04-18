import Actions from './Actions';
import { statusClasses } from './data';
import React, { useState } from 'react';

function LoanDetails({loanApiData}) {
  const [loanDetails, setLoanDetails] = useState(loanApiData);
  return (
    <div id='loan-details'>
      {loanDetails ? 
        <div style={{position:'sticky', top:'0', width:'100%'}}>
          <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
            <div style={{marginBottom:"1rem"}}>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <div style={{display:'flex', alignItems:'center'}}>
                  <span style={{marginRight:"5px"}}><b>{loanDetails.loan.client_fullname}&apos;s</b> Loan Details</span> /
                  <div style={{marginLeft:"5px"}}>
                    <button className={statusClasses[loanDetails.loan.status]}>{loanDetails.loan.status}</button>
                  </div>
                </div>
                <Actions
                  loan={loanDetails.loan}
                  setLoanDetails={setLoanDetails}
                  loanType={'cli'}
                />
              </div>
            </div>
            <div>
              <div>Details</div>
            </div>
          </div>
        </div> : null}
    </div>
  )
}

export default LoanDetails;