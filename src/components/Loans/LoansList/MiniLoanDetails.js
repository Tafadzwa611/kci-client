import Actions from './Actions';
import { statusClasses } from './data';
import React, { useEffect } from 'react';

function MiniLoanDetails({loanData, extra}) {
  const {loanDetails, setLoanDetails} = extra;

  useEffect(() => {
    setLoanDetails(loanData);
  }, []);

  if (!loanDetails) {
    return <div>Loading</div>
  }

  return (
    <div>
      <div id='loan-details'>
        <div style={{position:'sticky', top:'0', width:'100%'}}>
          <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
            <div style={{display:'flex', alignItems:'center', columnGap:'1rem'}}>
              <span><b>{loanDetails.loan.loan_id}</b></span>
              <button className={statusClasses[loanDetails.loan.status]}>{loanDetails.loan.status}</button>
              <span><b>{loanDetails.loan.client_fullname}&apos;s</b> Loan Details</span>
            </div>
            <Actions loan={loanDetails.loan} setLoanDetails={setLoanDetails} loanType={'cli'}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiniLoanDetails;