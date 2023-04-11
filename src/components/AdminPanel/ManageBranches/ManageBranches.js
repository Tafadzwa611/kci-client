import React, { useState } from 'react';
import { Fetcher } from '../../../common';
import List from './List';

function ManageBranches() {

  return (
    <>
        <Fetcher urls={['/usersapi/branch-list/']}>
            {({data}) => <List data={data[0]} />}
        </Fetcher>
    </>
  )
}

export default ManageBranches;




