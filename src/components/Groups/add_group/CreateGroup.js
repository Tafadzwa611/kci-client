import React from 'react';
import { Fetcher } from '../../../common';
import AddGroup from './AddGroup';

const CreateGroup = () => {
  return (
    <Fetcher urls={['/clientsapi/group_types/', '/usersapi/staff/']}>
      {({data}) => <AddGroup groupTypes={data[0]} loanOfficers={data[1]} />}
    </Fetcher>
  )
}

export default CreateGroup;