import React from 'react';
import { Fetcher } from '../../../../common';
import List from './List';

function NonWorkingDays() {
  return (
    <Fetcher urls={['/usersapi/list_non_working_days/']}>
      {({data}) => <List data={data[0]}/>}
    </Fetcher>
  )
}

export default NonWorkingDays;