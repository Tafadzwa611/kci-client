import React from 'react';
import { Fetcher } from '../../../common';
import AddGroup from './AddGroup';

const CreateGroup = () => {
  return (
    <Fetcher urls={['/clientsapi/group_types/', '/usersapi/staff/', '/clientsapi/group_roles/']}>
      {({data}) => <AddGroup groupTypes={data[0]} loanOfficers={data[1]} groupRoles={data[2]} />}
    </Fetcher>
  )
}

export default CreateGroup;