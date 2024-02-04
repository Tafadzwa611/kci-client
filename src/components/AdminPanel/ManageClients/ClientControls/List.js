import React, { useState } from 'react';
import {SuccessBtn, Table} from '../../../../common';
import UpdateClientControls from './UpdateClientControls';

const CONTROL_NAMES = {
  client_initial_status: 'New Client Initial Status',
  id_duplicate_level_type: 'Id Duplicate Check Level',
  pry_phone_duplicate_level_type: 'Primary Phone Duplicate Check Level',
  sec_phone_duplicate_level_type: 'Secondary Phone Duplicate Check Level',
  whatsapp_duplicate_level_type: 'Whatsapp Duplicate Check Level',
  email_duplicate_level_type: 'Email Duplicate Check Level',
  fullname_duplicate_level_type: 'Fullname Duplicate Check Level',
  home_phone_duplicate_level_type: 'Home Phone Duplicate Check Level',
  min_client_age: 'Minimum Client Age',
  maximum_group_size: 'Maximum group size',
  minimum_group_size: 'Minimum group size',
  client_officer_required: 'Client Officer Required',
  group_officer_required: 'Group Officer Required',
  allow_multi_groups_per_client: 'Allow multi groups per client',
  client_id_format: 'Client Number Format',
  allow_clients_without_id: 'Allow Clients Without ID'
};

const List = ({initControls}) => {
  const [clientControls, setClientControls] = useState(initControls);
  const [openModal, setOpenModal] = useState(false);

  const headers = ['Control', 'Value'];
  const rows = getTableRows(clientControls);

  return (
    <div>
      <SuccessBtn handler={() => setOpenModal(true)} value={'Update Controls'}/>
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
  return Object.keys(clientControls).sort().map(key => {
    return (
      <tr key={key}>
        <td>{CONTROL_NAMES[key]}</td>
        <td>
          {clientControls[key] === null || clientControls[key] ===  '' ? 'Do Not Check' : clientControls[key]}
          {(key === 'min_client_age' && clientControls[key] != null) && ' years'}
          {(key === 'maximum_group_size' && clientControls[key] != null) && ' members'}
          {(key === 'minimum_group_size' && clientControls[key] != null) && ' members'}
          {key === 'allow_clients_without_id' &&  (clientControls[key] ? 'Yes' : 'No')}
          {key === 'client_officer_required' &&  (clientControls[key] ? 'Yes' : 'No')}
          {key === 'group_officer_required' &&  (clientControls[key] ? 'Yes' : 'No')}
          {key === 'allow_multi_groups_per_client' &&  (clientControls[key] ? 'Yes' : 'No')}
        </td>
      </tr>
    )
  })
}

export default List;