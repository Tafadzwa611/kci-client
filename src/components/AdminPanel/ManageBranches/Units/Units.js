import React from 'react';
import { Fetcher } from '../../../../common';
import List from './List';

function Units() {
  return (
    <Fetcher urls={['/usersapi/list_units/']}>
      {({data}) => <List data={data[0]}/>}
    </Fetcher>
  )
}

export default Units;