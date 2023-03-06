import React from 'react';
import { Fetcher } from '../../../../common';
import List from './List';

const GroupTypes = () => {
  return (
    <Fetcher urls={['/clientsapi/group_types/']}>
      {({data}) => <List data={data[0]} />}
    </Fetcher>
  )
}

export default GroupTypes;