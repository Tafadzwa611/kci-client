import React, { useState } from 'react';
import { Fetcher } from '../../../../common';
import List from './List';

function Currencies() {

  return (
    <>
      <Fetcher urls={['/usersapi/currencieslist/']}>
        {({data}) => <List data={data[0]}/>}
      </Fetcher>
    </>
  )
}

export default Currencies;
