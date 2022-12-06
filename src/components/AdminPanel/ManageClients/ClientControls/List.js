import React, { useState } from 'react';
import {SuccessBtn, Table} from '../../../../common';
import UpdateClientControls from './UpdateClientControls';

const CONTROL_NAMES = {
  client_initial_status: 'New Client Initial Status',
  id_duplicate_level_type: 'Id Duplicate Check Level',
  pry_phone_duplicate_level_type: 'Primary Phone Duplicate Check Level',
  sec_phone_duplicate_level_type: 'Secondary Phone Duplicate Check Level',
  email_duplicate_level_type: 'Email Duplicate Check Level',
  fullname_duplicate_level_type: 'Fullname Duplicate Check Level',
  home_phone_duplicate_level_type: 'Home Phone Duplicate Check Level',
  min_client_age: 'Minimum Client Age',
  allow_clients_without_id: 'Allow Clients Without Identification'
};

const List = ({initControls}) => {
  const [clientControls, setClientControls] = useState(initControls);
  const [openModal, setOpenModal] = useState(false);

  const headers = ['Control', 'Value'];
  const rows = getTableRows(clientControls);

  return (
    <div>
      <SuccessBtn handler={_ => setOpenModal(true)} value={'Update Controls'}/>
      <UpdateClientControls
        key={JSON.stringify(clientControls)}
        open={openModal}
        setOpen={setOpenModal}
        clientControls={clientControls}
        setClientControls={setClientControls}
      />
      <Table rows={rows} headers={headers}/>
    </div>
  )
}

const getTableRows = (clientControls) => {
  return Object.keys(clientControls).map(key => {
    return (
      <tr key={key}>
        <td>{CONTROL_NAMES[key]}</td>
        <td>
          {clientControls[key] === null || clientControls[key] ===  '' ? 'Do Not Check' : clientControls[key]}
          {(key === 'min_client_age' && clientControls[key] != null) && ' years'}
          {key === 'allow_clients_without_id' &&  (clientControls[key] ? 'Yes' : 'No')}
        </td>
      </tr>
    )
  })
}

export default List;