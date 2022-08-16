import React, { useState } from 'react';
import ClientDetails from './ClientDetails/ClientDetails';
import BusinessInfo from './BusinessInfo/BusinessInfo';
// import Directors from './directors/Directors';
// import BankingDetails from './bankingdetails/BankingDetails';
// import Files from './files/Files';
// import Transactions from './transactions/Transactions';

function CompanyClientDetails({client, branches, files, setFiles, setClient, business, setBusiness, directors, setDirectors, clientId, setDetails, setSidebar}) {
  const [tab, setTab] = useState('details');

  const handleClose = () => {
    setSidebar(false);
    setDetails(false);
  }

  return (
    <>
      <div style={{marginBottom:"1.5rem", display:"flex", justifyContent:"end"}}>
        <button className="btn btn-default client__details" onClick={handleClose}>Close</button>
      </div>
      <div className="bloc-tabs">
          <button className={tab === "details" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("details")}> Primary Contact Personal Info </button>
          <button className={tab === "business" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("business")}> Business Details </button>
          <button className={tab === "directors" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("directors")}> Directors </button>
          <button className={tab === "bnk" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("bnk")}> Banking Details </button>
          <button className={tab === "files" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("files")}> Files </button>
          <button className={tab === "txns" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("txns")}> Transactions </button>
      </div>
      <div className='tab-content font-12' style={{marginTop:"3rem"}}>
          {{
              'details': <ClientDetails setClient={setClient} client={client} branches={branches} clientId={clientId}/>,
              'business': <BusinessInfo setBusiness={setBusiness} business={business} branches={branches} clientId={clientId}/>,
              // 'directors': <Directors directors={directors} business={business} setDirectors={setDirectors}/>,
              // 'bnk': <BankingDetails client={client} clientId={clientId} setClient={setClient}/>,
              // 'files': <Files files={files} setFiles={setFiles} clientId={clientId}/>,
              // 'txns': <Transactions clientId={clientId}/>,
          }[tab]}
      </div>
    </>
  )
}

export default CompanyClientDetails;