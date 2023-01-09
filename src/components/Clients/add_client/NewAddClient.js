import React from 'react';
import { Fetcher } from '../../../common';
import AddClientForm from './AddClientForm';

const NewAddClient = () => {
  return (
    <Fetcher urls={['/usersapi/list_field_sets/?entity_type=CLIENT', '/clientsapi/client_types/']}>
      {({data}) => <AddClientForm customForms={data[0]} clientTypes={data[1]}/>}
    </Fetcher>
  )
}

export default NewAddClient;