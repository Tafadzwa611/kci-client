import React, { useState } from 'react';
import Details from './Details/Details';
import ClientAddresses from './ClientAddresses/ClientAddresses';
import NextOfKin from './nok/NextOfKin';
import Files from './Files/Files';
import EmploymentDetails from './Employment/EmploymentDetails';
import BankingDetails from './BankingDetails/BankingDetails';
import Transactions from './Transactions/Transactions';
import ApproveClient from './ChangeClientState/ApproveClient';
import RejectClient from './ChangeClientState/RejectClient';
import UndoClientRejection from './ChangeClientState/UndoClientRejection';
import RequestUndoClientRejection from './ChangeClientState/RequestChangeClientState/RequestUndoClientRejection';
import UndoClientLeft from './ChangeClientState/UndoClientLeft';
import ClientLeft from './ChangeClientState/ClientLeft';
import BlacklistClient from './ChangeClientState/BlackListClient';
import UndoClientBlackList from './ChangeClientState/UndoClientBlackList';
import UndoClientApproval from './ChangeClientState/UndoClientApproval';
import RequestClientRejection from './ChangeClientState/RequestChangeClientState/RequestClientRejection';
import RequestClientApproval from './ChangeClientState/RequestChangeClientState/RequestClientApproval';
import RequestUndoClientApproval from './ChangeClientState/RequestChangeClientState/RequestUndoClientApproval';
import RequestUndoClientBlackList from './ChangeClientState/RequestChangeClientState/RequestUndoClientBlacklist';
import RequestClientBlackList from './ChangeClientState/RequestChangeClientState/RequestClientBlackList';
import RequestClientLeft from './ChangeClientState/RequestChangeClientState/RequestClientLeft';
import RequestUndoClientLeft from './ChangeClientState/RequestChangeClientState/RequestUndoClientLeft';
import MoreIndividualClientDetails from './Details/MoreIndividualClientDetails';
import ClientLoans from './ClientLoans/ClientLoans';

function 
IndividualClientDetails({client, setClient, addresses, setAddresses, nokList, setNokList, clientId, files, userperms, branches, setFiles, setDetails}) {
  const [tab, setTab] = useState('details');
  const [openApproveClient, setOpenApproveClient] = useState(false);
  const [rejectClient, setRejectClient] = useState(false);
  const [undoClientRejection, setUndoClientRejection] = useState(false);
  const [requestundoClientRejection, setRequestUndoClientRejection] = useState(false);
  const [requestClientRejection, setRequestClientRejection] = useState(false);
  const [undoclientleft, setUndoClientLeft] = useState(false);
  const [clientleft, setClientLeft] = useState(false);
  const [clientblacklist, setClientBlacklist] = useState(false);
  const [undoclientblacklist, setUndoClientBlacklist] = useState(false);
  const [undoclientapproval, setUndoClientApproval] = useState(false);
  const [requestClientApproval, setRequestClientApproval] = useState(false);
  const [requestUndoClientApproval, setRequestUndoClientApproval] = useState(false);
  const [requestClientBlacklist, setRequestClientBlackList] = useState(false);
  const [requestUndoClientBlacklist, setRequestUndoClientBlackList] = useState(false);
  const [requestClientLeft, setRequestClientLeft] = useState(false);
  const [requestUndoClientLeft, setRequestUndoClientLeft] = useState(false);
  const [openmore, setOpenMore] = useState(false);


  const handleClose = () => {
    setDetails(false);
  }

  return (
    <>  

        {undoclientapproval &&
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

        {openApproveClient &&
          <ApproveClient 
            clientId={clientId} 
            setClient={setClient} 
            setOpenApproveClient={setOpenApproveClient} 
            openApproveClient={openApproveClient}
          />
        }

        {rejectClient &&
          <RejectClient 
            clientId={clientId} 
            setClient={setClient} 
            setRejectClient={setRejectClient} 
          />
        }

        {undoClientRejection &&
          <UndoClientRejection 
            clientId={clientId} 
            setClient={setClient} 
            setUndoClientRejection={setUndoClientRejection} 
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
        />

        <div style={{marginBottom:"1.5rem", display:"flex", justifyContent:"space-between"}}>
          <div style={{display:"flex", columnGap:"3px"}}>
            <button className="btn btn-default client__details" onClick={handleClose}>Close</button>
            <button className="btn btn-default client__details" onClick={(e) => setOpenMore(curr => !curr)}>Expand</button>
          </div>
          {client.status == 'Blacklisted' && 
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
          }
          {client.status == 'Inactive' && 
            <div className="client-state-btns" style={{display:"flex", columnGap:"3px"}}>
              {userperms.approve_client ?
                <button className="btn btn-olive" onClick={(e) => setUndoClientApproval(curr => !curr)}>Undo Approve</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestUndoClientApproval(curr => !curr)}>Request Undo Approve</button>
              }
              {userperms.blacklist_client ?
                <button className="btn btn-olive" onClick={(e) => setClientBlacklist(curr => !curr)}>Blacklist</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestClientBlackList(curr => !curr)}>Request Blacklist</button>
              }
              {userperms.mark_client_as_left ?
                <button className="btn btn-olive" onClick={(e) => setClientLeft(curr => !curr)}>Left</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestClientLeft(curr => !curr)}>Request Left</button>
              }
            </div>
          }
          {client.status == 'Pending Approval' && 
            <div className="client-state-btns" style={{display:"flex", columnGap:"3px"}}>
              {userperms.approve_client ?
                <button className="btn btn-olive" onClick={(e) => setOpenApproveClient(curr => !curr)}>Approve</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestClientApproval(curr => !curr)}>Request Approve</button>
              }
              {userperms.reject_client ?
                <button className="btn btn-olive" onClick={(e) => setRejectClient(curr => !curr)}>Reject</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestClientRejection(curr => !curr)}>Request Reject</button>
              }
              {userperms.blacklist_client ?
                <button className="btn btn-olive" onClick={(e) => setClientBlacklist(curr => !curr)}>Blacklist</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestClientBlackList(curr => !curr)}>Request Blacklist</button>
              }
            </div>
          }
          {client.status == 'Rejected' && 
            <div className="client-state-btns" style={{display:"flex", columnGap:"3px"}}>
              {userperms.undo_client_rejection ?
                <button className="btn btn-olive" onClick={(e) => setUndoClientRejection(curr => !curr)}>Undo Rejection</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestUndoClientRejection(curr => !curr)}>Request Undo Rejection</button>
              }
            </div>
          }
        </div>
        <div className="bloc-tabs">
            <button className={tab === "details" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("details")}> Personal Info </button>
            <button className={tab === "addresses" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("addresses")}> Address List </button>
            <button className={tab === "emp" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("emp")}> Employment Details </button>
            <button className={tab === "bnk" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("bnk")}> Banking Details </button>
            <button className={tab === "nok" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("nok")}> Next Of Kin List </button>
            <button className={tab === "files" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("files")}> Files </button>
            <button className={tab === "txns" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("txns")}> Transactions </button>
            <button className={tab === "loans" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("loans")}> Loans </button>
        </div>
        <div className='tab-content font-12' style={{marginTop:"3rem"}}>
            {{
                'details': <Details clientId={clientId} setClient={setClient} client={client} branches={branches}/>,
                'addresses': <ClientAddresses clientId={clientId} addresses={addresses} setAddresses={setAddresses} client={client} />,
                'emp': <EmploymentDetails clientId={clientId} setClient={setClient} client={client} />,
                'bnk': <BankingDetails clientId={clientId} setClient={setClient} client={client} />,
                'nok': <NextOfKin clientId={clientId} nokList={nokList} setNokList={setNokList} client={client}/>,
                'files': <Files clientId={clientId} files={files} setFiles={setFiles} client={client}/>,
                'txns': <Transactions clientId={clientId} />,
                'loans': <ClientLoans clientId={clientId} />,
            }[tab]}
        </div>
    </>
  )
}

export default IndividualClientDetails;