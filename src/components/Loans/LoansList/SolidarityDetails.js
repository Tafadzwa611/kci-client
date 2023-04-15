import React, { useEffect } from 'react';
import { statusClasses } from './data';
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
          <div style={{marginBottom:"1rem"}}>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <span style={{marginRight:"5px"}}><b>{loanDetails.group_name}&apos;s</b> Loan Details</span> /
                <div style={{marginLeft:"5px"}}>
                  <button className={statusClasses[loanDetails.status]}>{loanDetails.status}</button>
                </div>
              </div>
              <Actions
                loan={loanDetails}
                setLoanDetails={setLoanDetails}
                setLoanData={setLoanData}
                setLoanId={setLoanId}
                loanType={'sol'}
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

export default SolidarityDetails;