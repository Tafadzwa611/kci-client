import React from 'react';
import { Fetcher } from '../../../common';
import AddGroup from './AddGroup';

const CreateGroup = () => {
  return (
    <Fetcher urls={['/clientsapi/group_types/', '/usersapi/staff/', '/clientsapi/getclients/']}>
      {({data}) => <AddGroup groupTypes={data[0]} loanOfficers={data[1]} membersList={data[2]}/>}
    </Fetcher>
  )
}

export default CreateGroup;