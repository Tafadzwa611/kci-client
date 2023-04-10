import React, { useEffect } from 'react';
import { statusClasses } from './data';
import { Link } from 'react-router-dom';

function LoanDetails({loanDetails}) {
  const {loan} = loanDetails;

  useEffect(() => {
    const element = document.getElementById('loan-details');
    element.scrollIntoView({ behavior: 'instant' });
  }, []);

  return (
    <div id='loan-details'>
      <div style={{position:'sticky', top:'0', width:'100%'}}>
        <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
          <div style={{display:'flex', alignItems:'center', columnGap:'1rem'}}>
            <button className={statusClasses[loan.status]}>{loan.status}</button>
            <span><b>{loan.client_fullname}&apos;s</b> Loan Details</span>
          </div>
          <Actions status={loan.status} loanDetails={loanDetails} />
        </div>
      </div>
    </div>
  )
}

const Actions = ({status, loanDetails}) => {
  if (status == 'Processing') {
    return (
      <div style={{display:'flex', columnGap:'3px'}}>
        <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
          <button className='btn btn-olive' onClick={(e) => console.log(e)}>Approve</button>
          <button className='btn btn-olive' onClick={(e) => console.log(e)}>Reject</button>
          <Link to={`/loans/viewloans/editloan/cli/${loanDetails.loan.id}`}>Edit</Link>
          <button className='btn btn-olive' onClick={(e) => console.log(e)}>Delete</button>
        </div>
      </div>
    )
  } else if (status == 'Approved') {
    return (
      <div style={{display:'flex', columnGap:'3px'}}>
        <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
          <button className='btn btn-olive' onClick={(e) => console.log(e)}>Undo Approve</button>
          <button className='btn btn-olive' onClick={(e) => console.log(e)}>Disburse</button>
        </div>
      </div>
    )
  }
  return (
    <div style={{display:'flex', columnGap:'3px'}}>
      <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
        <button className='btn btn-olive' onClick={(e) => console.log(e)}>Undo Disbursement</button>
      </div>
    </div>
  )
}

export default LoanDetails;