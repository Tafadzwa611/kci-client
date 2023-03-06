import React from 'react';
import { Fetcher } from '../../../../common';
import List from './List';

const GroupRoles = () => {
  return (
    <Fetcher urls={['/clientsapi/group_roles/']}>
      {({data}) => <List data={data[0]} />}
    </Fetcher>
  )
}

export default GroupRoles;