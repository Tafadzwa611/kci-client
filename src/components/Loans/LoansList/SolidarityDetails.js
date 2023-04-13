import React, { useEffect } from 'react';
import Actions from './Actions';

function SolidarityDetails({
  loanApiData,
  loanDetails,
  setLoanDetails,
  setLoanData,
  setLoanId
}) {
  useEffect(() => {
    if (!loanDetails) {
      setLoanDetails(loanApiData);
    }
  }, []);

  return (
    <div id='loan-details'>
      {loanDetails ?
      <div style={{position:'sticky', top:'0', width:'100%'}}>
        <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
          <div style={{display:'flex', alignItems:'center', columnGap:'1rem'}}>
            <span><b>{loanDetails.group_name}&apos;s</b> Loan Details</span>
          </div>
          <Actions
            loan={loanDetails}
            setLoanDetails={setLoanDetails}
            setLoanData={setLoanData}
            setLoanId={setLoanId}
            loanType={'sol'}
          />
        </div>
      </div> : null}
    </div>
  )
}

export default SolidarityDetails;