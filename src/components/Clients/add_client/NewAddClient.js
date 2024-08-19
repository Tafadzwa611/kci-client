import React from 'react';
import { Fetcher } from '../../../common';
import AddClientForm from './AddClientForm';

const NewAddClient = () => {
  const urls = [
    '/usersapi/list_field_sets/?entity_type=CLIENT&active=1',
    '/clientsapi/client_types/',
    '/clientsapi/client_id_templates/',
    '/clientsapi/client_controls/',
    '/usersapi/staff/?loan_officers_only=1'
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