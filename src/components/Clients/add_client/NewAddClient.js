import React from 'react';
import { Fetcher } from '../../../common';
import AddClientForm from './AddClientForm';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';

const NewAddClient = () => {
  const {loggedInUser} = useLoggedInUser();

  const urls = [
    '/usersapi/list_field_sets/?entity_type=CLIENT',
    '/clientsapi/client_types/',
    '/clientsapi/client_id_templates/',
    '/clientsapi/client_controls/',
    `/usersapi/staff/?branch_id=${loggedInUser.branch_id}&loan_officers_only=1`
  ];

  return (
    <Fetcher urls={urls}>
      {({data}) => (
        <AddClientForm
          customForms={data[0]}
          clientTypes={data[1]}
          idTemplates={data[2]}
          clientControls={data[3]}
          staff={data[4]}
        />
      )}
    </Fetcher>
  )
}

export default NewAddClient;