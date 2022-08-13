import React, { useState } from 'react';
import ClientInfo from './ClientInfo';
import AddressesOverview from './AddressesOverview';
import EmploymentOverview from './EmploymentOverview';
import BankingOverview from './BankingOverview';
import NextOfKinOverview from './NextOfKinOverview';
import FilesOverview from './FilesOverview';
import { makeRequest } from '../../../../../utils/utils'
// import {useHistory} from 'react-router-dom';

function Overview({
  clientInfo,
  addrList,
  employerInfo,
  bankInfo,
  nokList,
  uploadedFilesList,
  setTab,
  clientErrors,
  employmentErrors
}) {
  const [serverErrors, setServerErrors] = useState({});
//   let history = useHistory();

  const submit = async () => {
    const filteredEmployerInfo = Object.fromEntries(Object.entries(employerInfo).filter(([key, value]) => value !== ''));
    const filteredBankInfo = Object.fromEntries(Object.entries(bankInfo).filter(([key, value]) => value !== ''));
    const filteredClientInfo = Object.fromEntries(Object.entries(clientInfo).filter(([key, value]) => value !== ''));
    const body = {
      ...filteredClientInfo,
      ...filteredEmployerInfo,
      ...filteredBankInfo,
      next_of_kin_list: nokList,
      address_list: addrList,
      file_list: uploadedFilesList,
      type_of_client: 'Individual'
    };
    const response = await makeRequest.post('/clientsapi/add_client/', body, {timeout: 8000});
    if (response.ok) {
      const data = await response.json();
    //   history.push(`/cDetails/${data.client_id}`);
      return
    }
    const errors = await response.json();
    console.log(errors);
    setServerErrors(errors);
    window.scrollTo(0, 0);
  }

  const errors = {...clientErrors, ...employmentErrors};
  const clientInfoWithoutEmail = Object.fromEntries(Object.entries(clientInfo).filter(([key, value]) => key !== 'email'));
  const disableSubmit = (Object.values(clientInfoWithoutEmail).findIndex(el => el === '') != -1) || (addrList.length === 0) || (Object.values(errors).findIndex(el => el !== '') != -1);

  return (
    <>
      <div>
        {Object.keys(serverErrors).length > 0 && <DisplayServerErrors serverErrors={serverErrors}/>}
        <ClientInfo clientInfo={clientInfo} clientErrors={clientErrors}/>
        <AddressesOverview addrList={addrList}/>
        <EmploymentOverview employerInfo={employerInfo} employmentErrors={employmentErrors}/>
        <BankingOverview bankInfo={bankInfo}/>
        <NextOfKinOverview nokList={nokList}/>
        <FilesOverview uploadedFilesList={uploadedFilesList}/>
      </div>
      <div>
        <button onClick={submit} type='button' style={disableSubmit ? {pointerEvents: 'none', opacity: '0.7'} : {}} disabled={disableSubmit} className='btn btn-info float-right'>
          Submit
        </button>
        <button onClick={e => setTab('files')} type='button' className='btn btn-default'>Back</button>
      </div>
    </>
  )
}

const DisplayServerErrors = ({serverErrors}) => {
  return(
    <div className='alert alert-danger alert-dismissible'>
      <button type='button' className='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
      <h4><i className='icon fa fa-ban'></i> Alert!</h4>
        {Object.values(serverErrors).map(error => error)}
    </div>
  )
}

export default Overview;