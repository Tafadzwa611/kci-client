import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ApproveLoan from './ApproveLoan';
import UndoLoanApproval from './UndoLoanApproval';
import DeleteLoan from './DeleteLoan';

const Actions = ({loan, setLoanDetails, loanType, setLoanId, setLoanData}) => {
  const [approve, setApprove] = useState(false);
  const [deleteLoan, setDelete] = useState(false);
  const [undoApproval, setUndoApproval] = useState(false);
  const navigate = useNavigate();
  
  if (loan.status == 'Processing') {
    const approveUrl = loanType === 'cli' ? `/loansapi/approve_loan/${loan.id}/` : `/loansapi/approve_sloan/${loan.id}/`;
    const deleteUrl = loanType === 'cli' ? `/loansapi/delete_loan/${loan.id}/` : `/loansapi/delete_sloan/${loan.id}/`;
    return (
      <div style={{display:'flex', columnGap:'3px'}}>
        {approve && <ApproveLoan setOpen={setApprove} url={approveUrl} setLoanDetails={setLoanDetails}/>}
        {deleteLoan && <DeleteLoan
          setOpen={setDelete}
          url={deleteUrl}
          setLoanDetails={setLoanDetails}
          setLoanId={setLoanId}
          loanId={loan.id}
          setLoanData={setLoanData}
        />}
        <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
          <button className='btn btn-olive' onClick={() => setApprove(true)}>Approve</button>
          <button className='btn btn-olive' onClick={(e) => console.log(e)}>Reject</button>
          <Link to={`/loans/viewloans/editloan/${loanType}/${loan.id}`}>Edit</Link>
          <button className='btn btn-olive' onClick={() => setDelete(true)}>Delete</button>
          <button className='btn btn-olive' onClick={() => navigate({pathname: '/loans/viewloans', search: `?loan_id=${loan.id}&loan_type=${loanType}`})}>
            Max
          </button>
        </div>
      </div>
    )
  } else if (loan.status == 'Approved') {
    const undoApprovalUrl = loanType === 'cli' ? `/loansapi/undo_loan_approval/${loan.id}/` : `/loansapi/undo_sloan_approval/${loan.id}/`;
    return (
      <div style={{display:'flex', columnGap:'3px'}}>
        {undoApproval && <UndoLoanApproval setOpen={setUndoApproval} url={undoApprovalUrl} setLoanDetails={setLoanDetails}/>}
        <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
          <button className='btn btn-olive' onClick={() => setUndoApproval(true)}>Undo Approve</button>
          <button className='btn btn-olive' onClick={(e) => console.log(e)}>Disburse</button>
          <button className='btn btn-olive' onClick={() => navigate({pathname: '/loans/viewloans', search: `?loan_id=${loan.id}&loan_type=${loanType}`})}>
            Max
          </button>
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