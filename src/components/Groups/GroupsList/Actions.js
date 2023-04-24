import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import ApproveGroup from '../GroupsDetails/Details/ChangeGroupState/ApproveGroup';
import RejectGroup from '../GroupsDetails/Details/ChangeGroupState/RejectGroup';
import BlackListGroup from '../GroupsDetails/Details/ChangeGroupState/BlackListGroup';
import UndoGroupApproval from '../GroupsDetails/Details/ChangeGroupState/UndoGroupApproval';
import GroupLeft from '../GroupsDetails/Details/ChangeGroupState/GroupLeft';
import UndoGroupRejection from '../GroupsDetails/Details/ChangeGroupState/UndoGroupRejection';
import UndoGroupLeft from '../GroupsDetails/Details/ChangeGroupState/UndoGroupLeft';
import UndoGroupBlackList from '../GroupsDetails/Details/ChangeGroupState/UndoGroupBlackList';
import DeleteGroup from './DeleteGroup';

const Actions = ({group, setGroupDetails, setGroupId, setGroupsData}) => {
  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);
  const [blacklist, setBlacklist] = useState(false);
  const [undoApproval, setUndoApproval] = useState(false);
  const [left, setLeft] = useState(false);
  const [undoReject, setUndoReject] = useState(false);
  const [undoLeft, setUndoLeft] = useState(false);
  const [undoBlackList, setUndoBlacklist] = useState(false);
  const [deleteGroup, setDeleteGroup] = useState(false);

  const blacklistUrl = `/clientsapi/blacklist_group/${group.id}/`;
  const leftUrl = `/clientsapi/mark_group_as_left/${group.id}/`;
  const approveUrl = `/clientsapi/approve_group/${group.id}/`;
  const rejectUrl = `/clientsapi/reject_group/${group.id}/`;
  const undoApprovalUrl = `/clientsapi/undo_group_approval/${group.id}/`;
  const undoGroupRejectUrl = `/clientsapi/undo_group_rejection/${group.id}/`;
  const undoGroupLeftUrl = `/clientsapi/undo_group_left/${group.id}/`;
  const undoGroupBlackListUrl = `/clientsapi/undo_group_blacklist/${group.id}/`;
  const deleteUrl = `/clientsapi/delete_group/${group.id}/`;
  
  if (group.status == 'Pending Approval') {
    return (
      <div style={{display:'flex', columnGap:'3px'}}>
        {approve && <ApproveGroup setOpen={setApprove} url={approveUrl} setGroupDetails={setGroupDetails} />}
        {reject && <RejectGroup setOpen={setReject} url={rejectUrl} setGroupDetails={setGroupDetails}/>}
        {blacklist && <BlackListGroup setOpen={setBlacklist} url={blacklistUrl} setGroupDetails={setGroupDetails}/>}
        {deleteGroup && <DeleteGroup setOpen={setDeleteGroup} url={deleteUrl} setGroupId={setGroupId} groupID={group.id} setGroupsData={setGroupsData} />}
        <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
          <button className='btn btn-olive' onClick={() => setApprove(true)}>Approve</button>
          <button className='btn btn-olive' onClick={() => setReject(true)}>Reject</button>
          <button className='btn btn-olive' onClick={() => setBlacklist(true)}>Blacklist</button>
          {/* <button className='btn btn-olive'>
            <Link to={`/loans/viewloans/editloan/${loanType}/${group.id}`}>Edit</Link>
          </button> */}
          <button className='btn btn-olive' onClick={() => setDeleteGroup(true)}>Delete</button>
        </div>
      </div>
    )
  } 
  
  else if (group.status == 'Inactive') {
    return (
      <div style={{display:'flex', columnGap:'3px'}}>
        {undoApproval && <UndoGroupApproval setOpen={setUndoApproval} url={undoApprovalUrl} setGroupDetails={setGroupDetails}/>}
        {blacklist && <BlackListGroup setOpen={setBlacklist} url={blacklistUrl} setGroupDetails={setGroupDetails}/>}
        {left && <GroupLeft setOpen={setLeft} url={leftUrl} setGroupDetails={setGroupDetails}/>}
        {deleteGroup && <DeleteGroup setOpen={setDeleteGroup} url={deleteUrl} setGroupId={setGroupId} groupID={group.id} setGroupsData={setGroupsData} />}
        <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
          <button className='btn btn-olive' onClick={() => setUndoApproval(true)}>Undo Approve</button>
          <button className='btn btn-olive' onClick={() => setBlacklist(true)}>Blacklist</button>
          <button className='btn btn-olive' onClick={() => setLeft(true)}>Left</button>
          <button className='btn btn-olive' onClick={() => setDeleteGroup(true)}>Delete</button>
        </div>
      </div>
    )
  }

  else if (group.status == 'Rejected') {
    return (
      <div style={{display:'flex', columnGap:'3px'}}>
        {undoReject && <UndoGroupRejection setOpen={setUndoReject} url={undoGroupRejectUrl} setGroupDetails={setGroupDetails}/>}
        <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
          <button className='btn btn-olive' onClick={() => setUndoReject(true)}>Undo Reject</button>
        </div>
      </div>
    )
  }

  else if (group.status == 'Left') {
    return (
      <div style={{display:'flex', columnGap:'3px'}}>
        {undoLeft && <UndoGroupLeft setOpen={setUndoLeft} url={undoGroupLeftUrl} setGroupDetails={setGroupDetails}/>}
        <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
          <button className='btn btn-olive' onClick={() => setUndoLeft(true)}>Undo Left</button>
        </div>
      </div>
    )
  }

  else if (group.status == 'Active') {
    return (
      <div style={{display:'flex', columnGap:'3px'}}>
        {blacklist && <BlackListGroup setOpen={setBlacklist} url={blacklistUrl} setGroupDetails={setGroupDetails}/>}
        <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
          <button className='btn btn-olive' onClick={() => setBlacklist(true)}>Blacklist</button>
        </div>
      </div>
    )
  }

  else if (group.status == 'Blacklisted') {
    return (
      <div style={{display:'flex', columnGap:'3px'}}>
        {undoBlackList && <UndoGroupBlackList setOpen={setUndoBlacklist} url={undoGroupBlackListUrl} setGroupDetails={setGroupDetails}/>}
        <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
          <button className='btn btn-olive' onClick={() => setUndoBlacklist(true)}>Undo Blacklist</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{display:'flex', columnGap:'3px'}}>
      <div></div>
    </div>
  )
}

export default Actions;