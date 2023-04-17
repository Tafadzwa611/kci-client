import React from 'react';
import { Fetcher } from '../../../../common';
import List from './List';

function Holidays() {
  return (
    <Fetcher urls={['/usersapi/list_branch_holidays/']}>
      {({data}) => <List data={data[0]}/>}
    </Fetcher>
  )
}

export default Holidays;