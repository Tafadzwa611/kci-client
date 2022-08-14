import React from 'react';
import ClientInfo from './ClientInfo';
import BusinessInfo from './BusinessInfo';
import DirectorsTable from './DirectorsTable';
import FilesTable from './FilesTable';
import { makeRequest } from '../../../../../utils/utils'
// import {useHistory} from 'react-router-dom';

function Overview({clientInfo, businessInfo, dirList, businessErrors, clientErrors, uploadedFilesList, bankInfo}) {
//   let history = useHistory();

  const submit = async () => {
    const filteredClientInfo = Object.fromEntries(Object.entries({...clientInfo, ...bankInfo, file_list: uploadedFilesList}).filter(([key, value]) => value !== ''));
    const updatedBusiness = {...businessInfo, directors: dirList, registration_date: filteredClientInfo.registration_date, file_ids: uploadedFilesList.map(fl => fl.file_id)};
    const body = {...filteredClientInfo, business: updatedBusiness, type_of_client: 'Company'};
    const response = await makeRequest.post('/clientsapi/add_client/', body, {timeout: 6000});
    if (response.ok) {
      const data = await response.json();
    //   history.push(`/cDetails/${data.client_id}`);
      return
    }
    const errors = await response.json();
    console.log(errors);
    // setServerErrors(errors);
    window.scrollTo(0, 0);
  }

  const errors = {...clientErrors, ...businessErrors};
  const clientInfoWithoutEmail = Object.fromEntries(Object.entries(clientInfo).filter(([key, value]) => key !== 'email'));
  const disableSubmit = (Object.values(clientInfoWithoutEmail).findIndex(el => el === '') != -1) || (Object.values(errors).findIndex(el => el !== '') != -1);

  return (
    <>
      <>
        <ClientInfo clientInfo={clientInfo} clientErrors={clientErrors}/>
        <BusinessInfo businessInfo={businessInfo}/>
        <DirectorsTable dirList={dirList}/>
        <FilesTable uploadedFilesList={uploadedFilesList}/>
      </>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
        <button onClick={e => setTab('files')} type='button' className='btn btn-default'>Back</button>
        <button onClick={submit} type='button' style={disableSubmit ? {pointerEvents: 'none', opacity: '0.7'} : {}} disabled={disableSubmit} className='btn btn-info'>
          Submit
        </button>
      </div>
    </>
  )
}

export default Overview;