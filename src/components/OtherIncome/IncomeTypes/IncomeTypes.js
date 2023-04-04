import React, { useState } from 'react';
import { Fetcher } from '../../../common';
import List from './List';

function IncomeTypes() {
  const [incomeTypeId, setIncomeTypeId] = useState(null);

  return (
    <>
      <Fetcher urls={['/otherincomeapi/otherincometypeslist/']} extra={{incomeTypeId, setIncomeTypeId}}>
        {({data, extra}) => <List data={data[0]} extra={extra}/>}
      </Fetcher>
    </>
  )
}

export default IncomeTypes;