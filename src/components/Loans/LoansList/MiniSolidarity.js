import React, { useEffect } from 'react';
import { statusClasses } from './data';
import Actions from './Actions';
import { useNavigate } from 'react-router-dom';

function MiniSolidarity({loanData, extra}) {
  const {loanDetails, setLoanDetails, setLoanId, setLoanData} = extra;
  const navigate = useNavigate();

  useEffect(() => {
    setLoanDetails(loanData);
  }, []);

  console.log(loanDetails);

  if (!loanDetails) {
    return <div>Loading</div>
  }

  return (
    <div>
      <div>
        <div id='loan-details'>
          <div style={{position:'sticky', top:'0', width:'100%'}}>
            <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
              <div style={{marginBottom:"1rem"}}>
                <div style={{marginBottom:"1rem", display:"flex", justifyContent:"space-between"}}>
                  <button className="btn btn-default" onClick={() => setLoanId(null)}>Close</button>
                  <button className='btn btn-default' onClick={() => navigate({pathname: '/loans/viewloans', search: `?loan_id=${loanDetails.id}&loan_type=sol`})}>
                    Max
                  </button>
                </div>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <span style={{marginRight: "5px"}}><b>{loanDetails.group_name}&apos;s</b> Loan Details</span> /
                    <div style={{marginLeft:"5px"}}>
                      <button className={statusClasses[loanDetails.status]}>{loanDetails.status}</button>
                    </div>
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
              <div>

                <div>Details</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiniSolidarity;