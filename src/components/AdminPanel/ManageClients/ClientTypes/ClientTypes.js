import React from 'react';
import { Fetcher } from '../../../../common';
import List from './List';

const ClientTypes = () => {
  return (
    <Fetcher urls={['/clientsapi/client_types/']}>
      {({data}) => <List data={data[0]} />}
    </Fetcher>
  )
}

export default ClientTypes;