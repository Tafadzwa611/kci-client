import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ApproveLoan from './ApproveLoan';

const Actions = ({loan, setLoanDetails, loanType}) => {
  const [approve, setApprove] = useState(false);
  const navigate = useNavigate();
  const url = loanType === 'cli' ? `/loansapi/approve_loan/${loan.id}/` : `/loansapi/approve_sloan/${loan.id}/`;

  if (loan.status == 'Processing') {
    return (
      <div style={{display:'flex', columnGap:'3px'}}>
        {approve && <ApproveLoan setOpen={setApprove} url={url} setLoanDetails={setLoanDetails} />}
        <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
          <button className='btn btn-olive' onClick={() => setApprove(true)}>Approve</button>
          <button className='btn btn-olive' onClick={(e) => console.log(e)}>Reject</button>
          <Link to={`/loans/viewloans/editloan/${loanType}/${loan.id}`}>Edit</Link>
          <button className='btn btn-olive' onClick={(e) => console.log(e)}>Delete</button>
          <button className='btn btn-olive' onClick={() => navigate({pathname: '/loans/viewloans', search: `?loan_id=${loan.id}&loan_type=${loanType}`})}>
            Max
          </button>
        </div>
      </div>
    )
  } else if (loan.status == 'Approved') {
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

export default Actions;