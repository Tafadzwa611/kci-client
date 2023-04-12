import React, { useEffect } from 'react';
import { statusClasses } from './data';
import Actions from './Actions';

function MiniSolidarity({loanData, extra}) {
  const {loanDetails, setLoanDetails, setLoanId, setLoanData} = extra;

  useEffect(() => {
    setLoanDetails(loanData);
  }, []);

  if (!loanDetails) {
    return <div>Loading</div>
  }

  return (
    <div>
      <div>
        <div id='loan-details'>
          <div style={{position:'sticky', top:'0', width:'100%'}}>
            <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
              <div style={{display:'flex', alignItems:'center', columnGap:'1rem'}}>
                <span><b>{loanDetails.loan_id}</b></span>
                <button className={statusClasses[loanDetails.status]}>{loanDetails.status}</button>
                <span><b>{loanDetails.group_name}&apos;s</b> Loan Details</span>
              </div>
              <Actions
                loan={loanDetails}
                setLoanDetails={setLoanDetails}
                setLoanId={setLoanId}
                setLoanData={setLoanData}
                loanType={'sol'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiniSolidarity;