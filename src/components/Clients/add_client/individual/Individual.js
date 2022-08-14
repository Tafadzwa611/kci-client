import React, {useState} from 'react';
import NewClient from '../NewClient';
import Banking from './Banking';
import ClientInformation from './ClientInformation';
import EmploymentDetails from './EmploymentDetails';
import Files from './Files';
import NextOfKin from './NextOfKin';
import Address from './Address';
import Overview from './overview/Overview';

function Individual({clientType, setClientType, setMainTab}) {
  const [tab, setTab] = useState('new');
  const [clientInfo, setClientInfo] = useState({first_name: '', last_name: '', gender: '', date_of_birth: '', registration_date: '',
    phone_number: '', identification_number: '', identification_type: '', email: ''});
  const [employerInfo, setEmployerInfo] = useState({employer: '', type_of_employer: '', work_address: '', job_position: '', ec_number: ''});
  const [bankInfo, setBankInfo] = useState({bank_name: '', bank_branch: '', account_number: '', mobile_money_number: ''});
  const [nokList, setNokList] = useState([]);
  const [addrList, setAddrList] = useState([]);
  const [uploadedFilesList, setUploadedFilesList] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [clientErrors, setClientErrors] = useState({});
  const [employmentErrors, setEmploymentErrors] = useState({});

  return (
    <>
      <div className="bloc-tabs">
            <button className={tab === "new" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("new")}> New Client </button>
            <button className={tab === "info" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("info")}> Client Information </button>
            <button className={tab === "addr" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("addr")}> Client Address </button>
            <button className={tab === "emp" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("emp")}> Employment Details </button>
            <button className={tab === "bnk" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("bnk")}> Banking Details </button>
            <button className={tab === "kin" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("kin")}> Next of Kin </button>
            <button className={tab === "files" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("files")}> Client Files </button>
            <button className={tab === "overview" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("overview")}> Overview </button>
      </div>
      <div className='tab-content font-12' style={{marginTop:"3rem"}}>
        {{
          'new': <NewClient clientType={clientType} setClientType={setClientType} setTab={setTab}/>,
          'info': <ClientInformation clientInfo={clientInfo} setClientInfo={setClientInfo} clientErrors={clientErrors} setClientErrors={setClientErrors} setTab={setTab}/>,
          'addr': <Address addrList={addrList} setAddrList={setAddrList} setTab={setTab}/>,
          'emp': <EmploymentDetails employerInfo={employerInfo} setEmployerInfo={setEmployerInfo} employmentErrors={employmentErrors} setEmploymentErrors={setEmploymentErrors} setTab={setTab}/>,
          'bnk': <Banking bankInfo={bankInfo} setBankInfo={setBankInfo} setTab={setTab}/>,
          'kin': <NextOfKin nokList={nokList} setNokList={setNokList} setTab={setTab}/>,
          'files': <Files selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} uploadedFilesList={uploadedFilesList} setUploadedFilesList={setUploadedFilesList} setTab={setTab}/>,
          'overview': <Overview
            clientInfo={clientInfo}
            addrList={addrList}
            employerInfo={employerInfo}
            bankInfo={bankInfo}
            nokList={nokList}
            uploadedFilesList={uploadedFilesList}
            setTab={setTab}
            setMainTab={setMainTab}
            clientErrors={clientErrors}
            employmentErrors={employmentErrors}/>
        }[tab]}
      </div>
    </>
  )
}

export default Individual;