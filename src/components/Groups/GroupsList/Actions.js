import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import ApproveGroup from '../GroupsDetails/Details/ChangeGroupState/ApproveGroup';
// import UndoLoanApproval from './UndoLoanApproval';
// import DeleteLoan from './DeleteLoan';
// import RejectLoan from './RejectLoan';

const Actions = ({group, setGroupDetails, setGroupId, setGroupsData}) => {
  const [approve, setApprove] = useState(false);
//   const [reject, setReject] = useState(false);
//   const [deleteLoan, setDelete] = useState(false);
//   const [undoApproval, setUndoApproval] = useState(false);
  
  if (group.status == 'Pending Approval') {
    const approveUrl = `/clientsapi/approve_group/${group.id}/`;
    // const rejectUrl = loanType === 'cli' ? `/loansapi/reject_loan/${group.id}/` : `/loansapi/reject_sloan/${group.id}/`;
    // const deleteUrl = loanType === 'cli' ? `/loansapi/delete_loan/${group.id}/` : `/loansapi/delete_sloan/${group.id}/`;
    return (
      <div style={{display:'flex', columnGap:'3px'}}>
        {approve && <ApproveGroup setOpen={setApprove} url={approveUrl} setGroupDetails={setGroupDetails} groupId={group.id} />}
        {/* {reject && <RejectLoan setOpen={setReject} url={rejectUrl} setGroupDetails={setGroupDetails}/>}
        {deleteLoan && <DeleteLoan
          setOpen={setDelete}
          url={deleteUrl}
          setGroupDetails={setGroupDetails}
          setGroupId={setGroupId}
          loanId={group.id}
          setGroupsData={setGroupsData}
        />} */}
        <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
          <button className='btn btn-olive' onClick={() => setApprove(true)}>Approve</button>
          {/* <button className='btn btn-olive' onClick={() => setReject(true)}>Reject</button>
          <button className='btn btn-olive'>
            <Link to={`/loans/viewloans/editloan/${loanType}/${group.id}`}>Edit</Link>
          </button>
          <button className='btn btn-olive' onClick={() => setDelete(true)}>Delete</button> */}
        </div>
      </div>
    )
  } 
  
//   else if (group.status == 'Approved') {
//     const undoApprovalUrl = loanType === 'cli' ? `/loansapi/undo_loan_approval/${group.id}/` : `/loansapi/undo_sloan_approval/${group.id}/`;
//     return (
//       <div style={{display:'flex', columnGap:'3px'}}>
//         {undoApproval && <UndoLoanApproval setOpen={setUndoApproval} url={undoApprovalUrl} setGroupDetails={setGroupDetails}/>}
//         <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
//           <button className='btn btn-olive' onClick={() => setUndoApproval(true)}>Undo Approve</button>
//           <button className='btn btn-olive' onClick={(e) => console.log(e)}>Disburse</button>
//         </div>
//       </div>
//     )
//   }
  return (
    <div style={{display:'flex', columnGap:'3px'}}>
      {/* <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
        <button className='btn btn-olive' onClick={(e) => console.log(e)}>Undo Disbursement</button>
      </div> */}
      <div></div>
    </div>
  )
}

export default Actions;