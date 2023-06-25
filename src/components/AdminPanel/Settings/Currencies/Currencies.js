import React, { useState } from 'react';
import { Fetcher } from '../../../../common';
import List from './List';

function Currencies() {
  const [currencyId, setCurrencyId] = useState(null);

  return (
    <>
      <Fetcher urls={['/usersapi/currencieslist/']} extra={{currencyId, setCurrencyId}}>
        {({data, extra}) => <List data={data[0]} extra={extra}/>}
      </Fetcher>
    </>
  )
}

export default Currencies;
