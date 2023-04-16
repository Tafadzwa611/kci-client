import React from 'react';
import { Fetcher } from '../../../../common';
import List from './List';

function Fees() {
  return (
    <Fetcher urls={['/loansapi/list_fees/']}>
      {({data}) => <List data={data[0]}/>}
    </Fetcher>
  )
}

export default Fees;