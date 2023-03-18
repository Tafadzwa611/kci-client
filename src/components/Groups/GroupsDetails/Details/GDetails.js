import React, { useState } from 'react';
import Details from './Details/Details';
// import Files from './Files/Files';
// import Transactions from './Transactions/Transactions';
import ApproveGroup from './ChangeGroupState/ApproveGroup';
import RejectGroup from './ChangeGroupState/RejectGroup';
import UndoGroupRejection from './ChangeGroupState/UndoGroupRejection';
// import RequestUndoClientRejection from './ChangeClientState/RequestChangeClientState/RequestUndoClientRejection';
// import UndoClientLeft from './ChangeClientState/UndoClientLeft';
// import ClientLeft from './ChangeClientState/ClientLeft';
// import BlacklistClient from './ChangeClientState/BlackListClient';
// import UndoClientBlackList from './ChangeClientState/UndoClientBlackList';
import UndoGroupApproval from './ChangeGroupState/UndoGroupApproval';
// import RequestClientRejection from './ChangeClientState/RequestChangeClientState/RequestClientRejection';
// import RequestClientApproval from './ChangeClientState/RequestChangeClientState/RequestClientApproval';
// import RequestUndoClientApproval from './ChangeClientState/RequestChangeClientState/RequestUndoClientApproval';
// import RequestUndoClientBlackList from './ChangeClientState/RequestChangeClientState/RequestUndoClientBlacklist';
// import RequestClientBlackList from './ChangeClientState/RequestChangeClientState/RequestClientBlackList';
// import RequestClientLeft from './ChangeClientState/RequestChangeClientState/RequestClientLeft';
// import RequestUndoClientLeft from './ChangeClientState/RequestChangeClientState/RequestUndoClientLeft';
// import MoreIndividualClientDetails from './Details/MoreIndividualClientDetails';
// import ClientLoans from './ClientLoans/ClientLoans';

// function IndividualClientDetails({client, setClient, addresses, setAddresses, nokList, setNokList, clientId, files, userperms, branches, setFiles, setDetails}) {
function GDetails({group, setGroup, members, setMembers, groupId, userperms, setDetails}) {
  const [tab, setTab] = useState('gdetails');
  const [openApproveGroup, setOpenApproveGroup] = useState(false);
  const [rejectGroup, setRejectGroup] = useState(false);
  const [undoGroupRejection, setUndoGroupRejection] = useState(false);
//   const [requestundoClientRejection, setRequestUndoClientRejection] = useState(false);
//   const [requestClientRejection, setRequestClientRejection] = useState(false);
//   const [undoclientleft, setUndoClientLeft] = useState(false);
//   const [clientleft, setClientLeft] = useState(false);
//   const [clientblacklist, setClientBlacklist] = useState(false);
//   const [undoclientblacklist, setUndoClientBlacklist] = useState(false);
  const [undogroupapproval, setUndoGroupApproval] = useState(false);
//   const [requestClientApproval, setRequestClientApproval] = useState(false);
//   const [requestUndoClientApproval, setRequestUndoClientApproval] = useState(false);
//   const [requestClientBlacklist, setRequestClientBlackList] = useState(false);
//   const [requestUndoClientBlacklist, setRequestUndoClientBlackList] = useState(false);
//   const [requestClientLeft, setRequestClientLeft] = useState(false);
//   const [requestUndoClientLeft, setRequestUndoClientLeft] = useState(false);
//   const [openmore, setOpenMore] = useState(false);


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

        {/* {undoclientapproval &&
          <UndoClientApproval 
            clientId={clientId}
            setClient={setClient}
            setUndoClientApproval={setUndoClientApproval}
          />
        }

        {undoclientblacklist &&
          <UndoClientBlackList 
            clientId={clientId}
            setClient={setClient}
            setUndoClientBlacklist={setUndoClientBlacklist}
          />
        }

        {clientblacklist &&
          <BlacklistClient 
            clientId={clientId}
            setClient={setClient}
            setClientBlacklist={setClientBlacklist}
          />
        }

        {clientleft &&
          <ClientLeft 
            clientId={clientId}
            setClient={setClient}
            setClientLeft={setClientLeft}
          />
        }

        {undoclientleft &&
          <UndoClientLeft 
            clientId={clientId}
            setClient={setClient}
            setUndoClientLeft={setUndoClientLeft}
          />
        }

        <RequestUndoClientRejection 
          clientId={clientId} 
          requestundoClientRejection={requestundoClientRejection} 
          setRequestUndoClientRejection={setRequestUndoClientRejection} 
        />

        <RequestClientRejection 
          clientId={clientId} 
          requestClientRejection={requestClientRejection} 
          setRequestClientRejection={setRequestClientRejection} 
        />

        <RequestClientApproval 
          clientId={clientId} 
          requestClientApproval={requestClientApproval} 
          setRequestClientApproval={setRequestClientApproval} 
        />

        <RequestUndoClientApproval 
          clientId={clientId} 
          requestUndoClientApproval={requestUndoClientApproval} 
          setRequestUndoClientApproval={setRequestUndoClientApproval} 
        />

        <RequestClientBlackList 
          clientId={clientId} 
          requestClientBlacklist={requestClientBlacklist} 
          setRequestClientBlackList={setRequestClientBlackList} 
        />

        <RequestUndoClientBlackList 
          clientId={clientId} 
          requestUndoClientBlacklist={requestUndoClientBlacklist} 
          setRequestUndoClientBlackList={setRequestUndoClientBlackList} 
        />

        <RequestClientLeft 
          clientId={clientId} 
          requestClientLeft={requestClientLeft} 
          setRequestClientLeft={setRequestClientLeft} 
        />

        <RequestUndoClientLeft 
          clientId={clientId} 
          requestUndoClientLeft={requestUndoClientLeft} 
          setRequestUndoClientLeft={setRequestUndoClientLeft} 
        />

        <MoreIndividualClientDetails 
          openmore={openmore} 
          setOpenMore={setOpenMore} 
          clientId={clientId}
          setClient={setClient}
          client={client}
          branches={branches}
          addresses={addresses}
          setAddresses={setAddresses}
          nokList={nokList}
          setNokList={setNokList}
          files={files}
          setFiles={setFiles}
        /> */}

        <div style={{marginBottom:"1.5rem", display:"flex", justifyContent:"space-between"}}>
          <div style={{display:"flex", columnGap:"3px"}}>
            <button className="btn btn-default client__details" onClick={handleClose}>Close</button>
            <button className="btn btn-default client__details" onClick={(e) => setOpenMore(curr => !curr)}>Expand</button>
          </div>
          {group.status == 'Pending Approval' && 
            <div className="client-state-btns" style={{display:"flex", columnGap:"3px"}}>
              {userperms.approve_client ?
                <button className="btn btn-olive" onClick={(e) => setOpenApproveGroup(curr => !curr)}>Approve</button>:
                <button className="btn btn-olive">Request Approval</button>
                // <button className="btn btn-olive" onClick={(e) => setRequestClientApproval(curr => !curr)}>Request Approve</button>
              }
              {userperms.reject_client ?
                <button className="btn btn-olive" onClick={(e) => setRejectGroup(curr => !curr)}>Reject</button>:
                <button className="btn btn-olive">Request Reject</button>
                // <button className="btn btn-olive" onClick={(e) => setRequestClientRejection(curr => !curr)}>Request Reject</button>
              }
              {/* {userperms.blacklist_client ?
                <button className="btn btn-olive" onClick={(e) => setClientBlacklist(curr => !curr)}>Blacklist</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestClientBlackList(curr => !curr)}>Request Blacklist</button>
              } */}
            </div>
          }
          {group.status == 'Inactive' && 
            <div className="client-state-btns" style={{display:"flex", columnGap:"3px"}}>
              {userperms.approve_client ?
                <button className="btn btn-olive" onClick={(e) => setUndoGroupApproval(curr => !curr)}>Undo Approve</button>:
                <button className="btn btn-olive">Request Undo Approve</button>
                // <button className="btn btn-olive" onClick={(e) => setRequestUndoClientApproval(curr => !curr)}>Request Undo Approve</button>
              }
              {/* {userperms.blacklist_client ?
                <button className="btn btn-olive" onClick={(e) => setClientBlacklist(curr => !curr)}>Blacklist</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestClientBlackList(curr => !curr)}>Request Blacklist</button>
              }
              {userperms.mark_client_as_left ?
                <button className="btn btn-olive" onClick={(e) => setClientLeft(curr => !curr)}>Left</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestClientLeft(curr => !curr)}>Request Left</button>
              } */}
            </div>
          }

          {group.status == 'Rejected' && 
            <div className="client-state-btns" style={{display:"flex", columnGap:"3px"}}>
              {userperms.undo_client_rejection ?
                <button className="btn btn-olive" onClick={(e) => setUndoGroupRejection(curr => !curr)}>Undo Rejection</button>:
                <button className="btn btn-olive">Request Undo Rejection</button>
                // <button className="btn btn-olive" onClick={(e) => setRequestUndoClientRejection(curr => !curr)}>Request Undo Rejection</button>
              }
            </div>
          }
          {/* {client.status == 'Blacklisted' && 
            <div className="client-state-btns" style={{display:"flex", columnGap:"3px"}}>
              {userperms.undo_client_blacklist ?
                <button className="btn btn-olive" onClick={(e) => setUndoClientBlacklist(curr => !curr)}>Undo Blacklist</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestUndoClientBlackList(curr => !curr)}>Request Undo Blacklist</button>
              }
            </div>
          }
          {client.status == 'Left' && 
            <div className="client-state-btns" style={{display:"flex", columnGap:"3px"}}>
              {userperms.undo_mark_as_left ?
                <button className="btn btn-olive" onClick={(e) => setUndoClientLeft(curr => !curr)}>Undo Left</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestUndoClientLeft(curr => !curr)}>Request Undo Left</button>
              }
            </div>
          }
          {client.status == 'Active' && 
            <div className="client-state-btns" style={{display:"flex", columnGap:"3px"}}>
              {userperms.blacklist_client ?
                <button className="btn btn-olive" onClick={(e) => setClientBlacklist(curr => !curr)}>Blacklist</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestClientBlackList(curr => !curr)}>Request Blacklist</button>
              }
            </div>
          }*/}
        </div> 
        <div className="bloc-tabs">
            <button className={tab === "gdetails" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("gdetails")}> Group Info </button>
            <button className={tab === "gfiles" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("gfiles")}> Files </button>
            <button className={tab === "gtxns" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("gtxns")}> Transactions </button>
            <button className={tab === "gloans" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("gloans")}> Loans </button>
        </div>
        <div className='tab-content font-12' style={{marginTop:"3rem"}}>
            {{
                'gdetails': <Details setGroup={setGroup} group={group}/>,
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