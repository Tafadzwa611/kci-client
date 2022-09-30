
import React, { useState } from 'react';
import Details from './Details/Details';
import ClientAddresses from './ClientAddresses/ClientAddresses';
import NextOfKin from './nok/NextOfKin';
import Files from './Files/Files';
import EmploymentDetails from './Employment/EmploymentDetails';
import BankingDetails from './BankingDetails/BankingDetails';
import Transactions from './Transactions/Transactions';
import ApproveClient from './ChangeClientState/ApproveClient';

function IndividualClientDetails({client, setClient, addresses, setAddresses, nokList, setNokList, clientId, files, branches, setFiles, setDetails}) {
  const [tab, setTab] = useState('details');
  const [openApproveClient, setOpenApproveClient] = useState(false);

  const handleClose = () => {
    setDetails(false);
  }

  return (
    <>
        {openApproveClient &&<ApproveClient clientId={clientId} setClient={setClient} setOpenApproveClient={setOpenApproveClient} openApproveClient={openApproveClient}/>}
        <div style={{marginBottom:"1.5rem", display:"flex", justifyContent:"space-between"}}>
          <button className="btn btn-default client__details" onClick={handleClose}>Close</button>
          {client.status == 'Pending Approval' && 
            <div className="client-state-btns" style={{display:"flex", columnGap:"3px"}}>
              <button className="btn btn-olive" onClick={(e) => setOpenApproveClient(curr => !curr)}>Approve Client</button>
              <button className="btn btn-olive">Reject Client</button>
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
        </div>
        <div className='tab-content font-12' style={{marginTop:"3rem"}}>
            {{
                'details': <Details clientId={clientId} setClient={setClient} client={client} branches={branches}/>,
                'addresses': <ClientAddresses clientId={clientId} addresses={addresses} setAddresses={setAddresses} />,
                'emp': <EmploymentDetails clientId={clientId} setClient={setClient} client={client} />,
                'bnk': <BankingDetails clientId={clientId} setClient={setClient} client={client} />,
                'nok': <NextOfKin clientId={clientId} nokList={nokList} setNokList={setNokList} />,
                'files': <Files clientId={clientId} files={files} setFiles={setFiles} />,
                'txns': <Transactions clientId={clientId} />,
            }[tab]}
        </div>
    </>
  )
}

export default IndividualClientDetails;