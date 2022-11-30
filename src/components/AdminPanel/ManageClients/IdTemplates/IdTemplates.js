import React from 'react';
import List from './List';
import { Fetcher } from '../../../../common';

const IdTemplates = () => {
  return (
    <Fetcher urls={['/clientsapi/client_id_templates/']}>
      {({data}) => <List data={data[0]} />}
    </Fetcher>
  )
}

export default IdTemplates;