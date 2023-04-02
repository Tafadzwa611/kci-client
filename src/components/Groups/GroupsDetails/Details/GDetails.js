import React, { useState } from 'react';
import Details from './Details/Details';
import GroupMembers from './Details/GroupMembers';
// import Files from './Files/Files';
// import Transactions from './Transactions/Transactions';
import ApproveGroup from './ChangeGroupState/ApproveGroup';
import RejectGroup from './ChangeGroupState/RejectGroup';
import UndoGroupRejection from './ChangeGroupState/UndoGroupRejection';
import RequestUndoGroupRejection from './ChangeGroupState/RequestChangeGroupState/RequestUndoGroupRejection';
import UndoGroupLeft from './ChangeGroupState/UndoGroupLeft';
import GroupLeft from './ChangeGroupState/GroupLeft';
import BlacklistGroup from './ChangeGroupState/BlackListGroup';
import UndoGroupBlackList from './ChangeGroupState/UndoGroupBlackList';
import UndoGroupApproval from './ChangeGroupState/UndoGroupApproval';
import RequestGroupRejection from './ChangeGroupState/RequestChangeGroupState/RequestGroupRejection';
import RequestGroupApproval from './ChangeGroupState/RequestChangeGroupState/RequestGroupApproval';
import RequestUndoGroupApproval from './ChangeGroupState/RequestChangeGroupState/RequestUndoGroupApproval';
import RequestUndoGroupBlackList from './ChangeGroupState/RequestChangeGroupState/RequestUndoGroupBlackList';
import RequestGroupBlackList from './ChangeGroupState/RequestChangeGroupState/RequestGroupBlackList';
import RequestGroupLeft from './ChangeGroupState/RequestChangeGroupState/RequestGroupLeft';
import RequestUndoGroupLeft from './ChangeGroupState/RequestChangeGroupState/RequestUndoGroupLeft';
import MoreGroupDetails from './Details/MoreGroupDetails';
// import ClientLoans from './ClientLoans/ClientLoans';

function GDetails({group, setGroup, members, setMembers, groupId, userperms, setDetails, branches}) {
  const [tab, setTab] = useState('gdetails');
  const [openApproveGroup, setOpenApproveGroup] = useState(false);
  const [rejectGroup, setRejectGroup] = useState(false);
  const [undoGroupRejection, setUndoGroupRejection] = useState(false);
  const [requestundoGroupRejection, setRequestUndoGroupRejection] = useState(false);
  const [requestGroupRejection, setRequestGroupRejection] = useState(false);
  const [undogroupleft, setUndoGroupLeft] = useState(false);
  const [groupleft, setGroupLeft] = useState(false);
  const [groupblacklist, setGroupBlacklist] = useState(false);
  const [undogroupblacklist, setUndoGroupBlacklist] = useState(false);
  const [undogroupapproval, setUndoGroupApproval] = useState(false);
  const [requestGroupApproval, setRequestGroupApproval] = useState(false);
  const [requestUndoGroupApproval, setRequestUndoGroupApproval] = useState(false);
  const [requestGroupBlacklist, setRequestGroupBlackList] = useState(false);
  const [requestUndoGroupBlacklist, setRequestUndoGroupBlackList] = useState(false);
  const [requestGroupLeft, setRequestGroupLeft] = useState(false);
  const [requestUndoGroupLeft, setRequestUndoGroupLeft] = useState(false);
  const [openmore, setOpenMore] = useState(false);


  const handleClose = () => {
    setDetails(false);
  }

  return (
    <>  
      {openApproveGroup &&
        <ApproveGroup 
          groupId={groupId} 
          setGroup={setGroup} 
          setOpenApproveGroup={setOpenApproveGroup} 
        />
      }

      {undogroupapproval &&
        <UndoGroupApproval 
          groupId={groupId}
          setGroup={setGroup}
          setUndoGroupApproval={setUndoGroupApproval}
        />
      }

      {rejectGroup &&
        <RejectGroup
          groupId={groupId} 
          setGroup={setGroup} 
          setRejectGroup={setRejectGroup} 
        />
      }

      {undoGroupRejection &&
        <UndoGroupRejection 
          groupId={groupId} 
          setGroup={setGroup} 
          setUndoGroupRejection={setUndoGroupRejection} 
        />
      }

      {groupleft &&
        <GroupLeft 
          groupId={groupId}
          setGroup={setGroup}
          setGroupLeft={setGroupLeft}
        />
      }

      {undogroupleft &&
        <UndoGroupLeft 
          groupId={groupId}
          setGroup={setGroup}
          setUndoGroupLeft={setUndoGroupLeft}
        />
      }

      {groupblacklist &&
        <BlacklistGroup 
          groupId={groupId}
          setGroup={setGroup}
          setGroupBlacklist={setGroupBlacklist}
        />
      }

      {undogroupblacklist &&
        <UndoGroupBlackList 
          groupId={groupId}
          setGroup={setGroup}
          setUndoGroupBlacklist={setUndoGroupBlacklist}
        />
      }

      <RequestGroupApproval 
        requestGroupApproval={requestGroupApproval} 
        setRequestGroupApproval={setRequestGroupApproval} 
      />

      <RequestUndoGroupRejection 
        requestundoGroupRejection={requestundoGroupRejection} 
        setRequestUndoGroupRejection={setRequestUndoGroupRejection} 
      />

      <RequestGroupRejection 
        requestGroupRejection={requestGroupRejection} 
        setRequestGroupRejection={setRequestGroupRejection} 
      />

      <RequestUndoGroupApproval 
        requestUndoGroupApproval={requestUndoGroupApproval} 
        setRequestUndoGroupApproval={setRequestUndoGroupApproval} 
      />

      <RequestGroupBlackList 
        requestGroupBlacklist={requestGroupBlacklist} 
        setRequestGroupBlackList={setRequestGroupBlackList} 
      />

      <RequestUndoGroupBlackList 
        requestUndoGroupBlacklist={requestUndoGroupBlacklist} 
        setRequestUndoGroupBlackList={setRequestUndoGroupBlackList} 
      />

      <RequestGroupLeft 
        requestGroupLeft={requestGroupLeft} 
        setRequestGroupLeft={setRequestGroupLeft} 
      />

      <RequestUndoGroupLeft 
        requestUndoGroupLeft={requestUndoGroupLeft} 
        setRequestUndoGroupLeft={setRequestUndoGroupLeft} 
      />

      <MoreGroupDetails 
        openmore={openmore} 
        setOpenMore={setOpenMore} 
        groupId={groupId}
        setGroup={setGroup}
        group={group}
        branches={branches}
      />

        <div style={{marginBottom:"1.5rem", display:"flex", justifyContent:"space-between"}}>
          <div style={{display:"flex", columnGap:"3px"}}>
            <button className="btn btn-default client__details" onClick={handleClose}>Close</button>
            <button className="btn btn-default client__details" onClick={(e) => setOpenMore(curr => !curr)}>Expand</button>
          </div>
          {group.status == 'Pending Approval' && 
            <div className="client-state-btns" style={{display:"flex", columnGap:"3px"}}>
              {userperms.approve_client ?
                <button className="btn btn-olive" onClick={(e) => setOpenApproveGroup(curr => !curr)}>Approve</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestGroupApproval(curr => !curr)}>Request Approve</button>
              }
              {userperms.reject_client ?
                <button className="btn btn-olive" onClick={(e) => setRejectGroup(curr => !curr)}>Reject</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestGroupRejection(curr => !curr)}>Request Reject</button>
              }
              {userperms.blacklist_client ?
                <button className="btn btn-olive" onClick={(e) => setGroupBlacklist(curr => !curr)}>Blacklist</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestGroupBlackList(curr => !curr)}>Request Blacklist</button>
              }
            </div>
          }
          {group.status == 'Inactive' && 
            <div className="client-state-btns" style={{display:"flex", columnGap:"3px"}}>
              {userperms.approve_client ?
                <button className="btn btn-olive" onClick={(e) => setUndoGroupApproval(curr => !curr)}>Undo Approve</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestGroupApproval(curr => !curr)}>Request Approve</button>
              }
              {userperms.blacklist_client ?
                <button className="btn btn-olive" onClick={(e) => setGroupBlacklist(curr => !curr)}>Blacklist</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestGroupBlackList(curr => !curr)}>Request Blacklist</button>
              }
              {userperms.mark_client_as_left ?
                <button className="btn btn-olive" onClick={(e) => setGroupLeft(curr => !curr)}>Left</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestGroupLeft(curr => !curr)}>Request Left</button>
              }
            </div>
          }

          {group.status == 'Rejected' && 
            <div className="client-state-btns" style={{display:"flex", columnGap:"3px"}}>
              {userperms.undo_client_rejection ?
                <button className="btn btn-olive" onClick={(e) => setUndoGroupRejection(curr => !curr)}>Undo Rejection</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestUndoGroupRejection(curr => !curr)}>Request Undo Rejection</button>
              }
            </div>
          }

          {group.status == 'Left' && 
            <div className="client-state-btns" style={{display:"flex", columnGap:"3px"}}>
              {userperms.undo_mark_as_left ?
                <button className="btn btn-olive" onClick={(e) => setUndoGroupLeft(curr => !curr)}>Undo Left</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestUndoGroupLeft(curr => !curr)}>Request Undo Left</button>
              }
            </div>
          }


          {group.status == 'Active' && 
            <div className="client-state-btns" style={{display:"flex", columnGap:"3px"}}>
              {userperms.blacklist_client ?
                <button className="btn btn-olive" onClick={(e) => setGroupBlacklist(curr => !curr)}>Blacklist</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestGroupBlackList(curr => !curr)}>Request Blacklist</button>
              }
            </div>
          }
          {group.status == 'Blacklisted' && 
            <div className="client-state-btns" style={{display:"flex", columnGap:"3px"}}>
              {userperms.undo_client_blacklist ?
                <button className="btn btn-olive" onClick={(e) => setUndoGroupBlacklist(curr => !curr)}>Undo Blacklist</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestUndoGroupBlackList(curr => !curr)}>Request Undo Blacklist</button>
              }
            </div>
          }
        </div> 
        <div className="bloc-tabs">
            <button className={tab === "gdetails" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("gdetails")}> Group Info </button>
            <button className={tab === "gmbrs" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("gmbrs")}> Group Members </button>
            <button className={tab === "gfiles" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("gfiles")}> Files </button>
            <button className={tab === "gtxns" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("gtxns")}> Transactions </button>
            <button className={tab === "gloans" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("gloans")}> Loans </button>
        </div>
        <div className='tab-content font-12' style={{marginTop:"3rem"}}>
            {{
                'gdetails': <Details setGroup={setGroup} group={group} groupId={groupId} branches={branches} />,
                'gmbrs': <GroupMembers group={group} />,
                // 'gdetails': <Details groudId={groudId} setGroup={setGroup} group={group} branches={branches}/>,
                // 'gfiles': <Files clientId={clientId} files={files} setFiles={setFiles} client={client}/>,
                // 'gtxns': <Transactions clientId={clientId} />,
                // 'gloans': <ClientLoans clientId={clientId} />,
            }[tab]}
        </div>
    </>
  )
}

export default GDetails;