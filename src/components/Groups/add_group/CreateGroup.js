import React from 'react';
import { Fetcher } from '../../../common';
import AddGroupForm from './AddGroupForm';

const CreateGroup = () => {
  return (
    <Fetcher urls={['/clientsapi/group_types/', '/usersapi/staff/', '/clientsapi/getclients/']}>
      {({data}) => <AddGroupForm groupTypes={data[0]} loan_officers={data[1]} memberslist={data[2]}/>}
    </Fetcher>
  )
}

export default CreateGroup;