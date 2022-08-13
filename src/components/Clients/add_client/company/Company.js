import React, { useState } from 'react';
import NewClient from '../NewClient';
import PrimaryContactInfo from './primarycontact/PrimaryContactInfo';
import Business from './businessinfo/Business';
import Directors from './directors/Directors';
import Files from './files/Files';
import Overview from './overview/Overview';
import Banking from './banking/Banking';

const initClientInfo = {first_name: '', last_name: '', gender: '', date_of_birth: '', registration_date: '', phone_number: '', identification_number: '', identification_type: '', email: ''};
const initBusinessInfo = {name: '', business_type: '', business_start_date: '', registration_date: '', address: '', city: '', country: ''};

function Company({clientType, setClientType}) {
  const [tab, setTab] = useState('new');
  const [clientInfo, setClientInfo] = useState(initClientInfo);
  const [businessInfo, setBusinessInfo] = useState(initBusinessInfo);
  const [dirList, setDirList] = useState([]);
  const [businessErrors, setBusinessErrors] = useState({});
  const [clientErrors, setClientErrors] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFilesList, setUploadedFilesList] = useState([]);
  const [bankInfo, setBankInfo] = useState({bank_name: '', bank_branch: '', account_number: ''});

  return (
    <>
      <div className="bloc-tabs">
          <button className={tab === "new" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("new")}> New Client </button>
            <button className={tab === "cinfo" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("cinfo")}> Primary Contact Information </button>
            <button className={tab === "binfo" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("binfo")}> Business Information </button>
            <button className={tab === "dirs" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("dirs")}> Directors </button>
            <button className={tab === "bnk" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("bnk")}> Banking Details </button>
            <button className={tab === "bfiles" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("bfiles")}> Business Files </button>
            <button className={tab === "coverview" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("coverview")}> Overview </button>
      </div>
      <div className='tab-content font-12' style={{marginTop:"3rem"}}>
        {{
          'new': <NewClient clientType={clientType} setClientType={setClientType} setTab={setTab}/>,
          'cinfo': <PrimaryContactInfo clientInfo={clientInfo} setClientInfo={setClientInfo} clientErrors={clientErrors} setClientErrors={setClientErrors} setTab={setTab}/>,
          'binfo': <Business businessInfo={businessInfo} businessErrors={businessErrors} setBusinessErrors={setBusinessErrors} setBusinessInfo={setBusinessInfo} setTab={setTab}/>,
          'dirs': <Directors dirList={dirList} setDirList={setDirList} setTab={setTab}/>,
          'bnk': <Banking bankInfo={bankInfo} setBankInfo={setBankInfo} setTab={setTab}/>,
          'bfiles': <Files selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} uploadedFilesList={uploadedFilesList} setUploadedFilesList={setUploadedFilesList} setTab={setTab}/>,
          'coverview': <Overview
            clientInfo={clientInfo}
            bankInfo={bankInfo}
            clientErrors={clientErrors}
            businessErrors={businessErrors}
            businessInfo={businessInfo}
            dirList={dirList}
            uploadedFilesList={uploadedFilesList}
            />,
        }[tab]}
      </div>
    </>
  )
}

export default Company;