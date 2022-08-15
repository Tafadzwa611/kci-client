
import React, { useState } from 'react';
import Details from './Details/Details';
import ClientAddresses from './ClientAddresses/ClientAddresses';
// import NextOfKin from './nok/NextOfKin';
// import Files from './files/Files';
import EmploymentDetails from './Employment/EmploymentDetails';
import BankingDetails from './BankingDetails/BankingDetails';
// import Transactions from '../company/transactions/Transactions';

function IndividualClientDetails({client, setClient, addresses, setAddresses, nokList, setNokList, clientId, files, branches, setFiles, setOpen}) {
  const [tab, setTab] = useState('details');

  return (
    <>
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
                'details': <Details clientId={clientId} setClient={setClient} client={client} branches={branches} setOpen={setOpen}/>,
                'addresses': <ClientAddresses clientId={clientId} addresses={addresses} setAddresses={setAddresses} />,
                'emp': <EmploymentDetails clientId={clientId} setClient={setClient} client={client} />,
                'bnk': <BankingDetails clientId={clientId} setClient={setClient} client={client} />,
            }[tab]}
        </div>
    </>
  )
}

export default IndividualClientDetails;