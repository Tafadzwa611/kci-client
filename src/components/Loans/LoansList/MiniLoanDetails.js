import Actions from './Actions';
import { statusClasses } from './data';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MiniLoanDetails({loanData, extra}) {
  const {loanDetails, setLoanDetails, setLoanId, setLoanData} = extra;
  const navigate = useNavigate();

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
            <div style={{marginBottom:"1rem", display:"flex", justifyContent:"space-between"}}>
              <button className="btn btn-default" onClick={() => setLoanId(null)}>Close</button>
              <button className='btn btn-default' onClick={() => navigate({pathname: '/loans/viewloans', search: `?loan_id=${loanDetails.loan.id}&loan_type=cli`})}>
                Max
              </button>
            </div>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <span style={{marginRight:"5px"}}><b>{loanDetails.loan.client_fullname}&apos;s</b> Loan Details</span> /
                <span style={{margin: "0 5px"}}><b>{loanDetails.loan.loan_id}</b></span> /
                <div style={{marginLeft:"5px"}}>
                  <button className={statusClasses[loanDetails.loan.status]}>{loanDetails.loan.status}</button>
                </div>
              </div>
              <Actions
                loan={loanDetails.loan} 
                setLoanDetails={setLoanDetails}
                setLoanId={setLoanId}
                setLoanData={setLoanData}
                loanType={'cli'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiniLoanDetails;