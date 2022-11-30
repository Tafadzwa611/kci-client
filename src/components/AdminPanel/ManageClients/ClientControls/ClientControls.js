import React from 'react';
import {Fetcher} from '../../../../common';
import List from './List';

const ClientControls = () => {
  return (
    <Fetcher urls={['/clientsapi/client_controls/']}>
      {({data}) => <List initControls={data[0]} />}
    </Fetcher>
  );
}

export default ClientControls;