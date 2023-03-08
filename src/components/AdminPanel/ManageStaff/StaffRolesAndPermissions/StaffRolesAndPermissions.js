import React from 'react';
import { Fetcher } from '../../../../common';
import List from './List';

const StaffRolesAddPermissions = () => {
  return (
    <Fetcher urls={['/usersapi/staffroles/']}>
      {({data}) => <List data={data[0]} />}
    </Fetcher>
  )
}

export default StaffRolesAddPermissions;