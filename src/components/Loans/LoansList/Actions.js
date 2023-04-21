import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import ApproveLoan from './ApproveLoan';
import UndoLoanApproval from './UndoLoanApproval';
import DeleteLoan from './DeleteLoan';
import RejectLoan from './RejectLoan';
import DisburseLoan from './DisburseLoan';
import UndoDisbursement from './UndoDisbursement';

const Actions = ({loan, setLoanDetails, loanType, setLoanId, setLoanData}) => {
  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);
  const [deleteLoan, setDelete] = useState(false);
  const [disburse, setDisburse] = useState(false);
  const [undoDisburse, setUndoDisburse] = useState(false);
  const [undoApproval, setUndoApproval] = useState(false);
  
  if (loan.status == 'Processing') {
    const approveUrl = loanType === 'cli' ? `/loansapi/approve_loan/${loan.id}/` : `/loansapi/approve_sloan/${loan.id}/`;
    const rejectUrl = loanType === 'cli' ? `/loansapi/reject_loan/${loan.id}/` : `/loansapi/reject_sloan/${loan.id}/`;
    const deleteUrl = loanType === 'cli' ? `/loansapi/delete_loan/${loan.id}/` : `/loansapi/delete_sloan/${loan.id}/`;
    return (
      <div style={{display:'flex', columnGap:'3px'}}>
        {approve && <ApproveLoan setOpen={setApprove} url={approveUrl} setLoanDetails={setLoanDetails}/>}
        {reject && <RejectLoan setOpen={setReject} url={rejectUrl} setLoanDetails={setLoanDetails}/>}
        {deleteLoan && <DeleteLoan
          loanId={loan.id}
          setOpen={setDelete}
          url={deleteUrl}
          setLoanDetails={setLoanDetails}
          setLoanId={setLoanId}
          setLoanData={setLoanData}
        />}
        <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
          <button className='btn btn-olive' onClick={() => setApprove(true)}>Approve</button>
          <button className='btn btn-olive' onClick={() => setReject(true)}>Reject</button>
          <button className='btn btn-olive'>
            <Link to={`/loans/viewloans/editloan/${loanType}/${loan.id}`}>Edit</Link>
          </button>
          <button className='btn btn-olive' onClick={() => setDelete(true)}>Delete</button>
        </div>
      </div>
    )
  } else if (loan.status == 'Approved') {
    const undoApprovalUrl = loanType === 'cli' ? `/loansapi/undo_loan_approval/${loan.id}/` : `/loansapi/undo_sloan_approval/${loan.id}/`;
    const disburseUrl = loanType === 'cli' ? `/loansapi/disburse_loan/${loan.id}/` : `/loansapi/disburse_sloan/${loan.id}/`;
    return (
      <div style={{display:'flex', columnGap:'3px'}}>
        {undoApproval && <UndoLoanApproval setOpen={setUndoApproval} url={undoApprovalUrl} setLoanDetails={setLoanDetails}/>}
        {disburse && <DisburseLoan setOpen={setDisburse} loan={loan} url={disburseUrl} setLoanDetails={setLoanDetails}/>}
        <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
          <button className='btn btn-olive' onClick={() => setUndoApproval(true)}>Undo Approve</button>
          <button className='btn btn-olive' onClick={() => setDisburse(true)}>Disburse</button>
        </div>
      </div>
    )
  }else if (loan.status == 'Open') {
  const undoDisburseUrl = loanType === 'cli' ? `/loansapi/undo_loan_disbursement/${loan.id}/` : `/loansapi/undo_sloan_disbursement/${loan.id}/`;
  return (
    <div style={{display:'flex', columnGap:'3px'}}>
      {undoDisburse && <UndoDisbursement setOpen={setUndoDisburse} url={undoDisburseUrl} setLoanDetails={setLoanDetails}/>}
      <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
        <button className='btn btn-olive' onClick={() => setUndoDisburse(true)}>Undo Disbursement</button>
      </div>
    </div>
  )
  } else {
    return (
      <div>
      </div>
    )
  }
}

export default Actions;