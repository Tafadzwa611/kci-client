import React, {useState} from 'react';
import DateRange from './DateRange';
import Table from './Table';

function Cashflow() {
  const [cashflowData, setCashFlowData] = useState(null);

  return (
    <>
        <>
          <DateRange setCashFlowData={setCashFlowData}/>
          <div style={{paddingTop: '2rem'}}></div>
          {cashflowData ? <Table statement={cashflowData} /> : null}
        </>
    </>
  )
}

export default Cashflow;