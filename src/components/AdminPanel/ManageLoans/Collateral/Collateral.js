import React from 'react';
import { Fetcher } from '../../../../common';
import List from './List';

function Collateral() {
  return (
    <Fetcher urls={['/loansapi/list_collateral_types/']}>
      {({data}) => <List data={data[0]}/>}
    </Fetcher>
  )
}

export default Collateral;