import React, {useState} from 'react';
import DateRange from './DateRange';
import Table from './Table';

function Cashflow({loggedInUser}) {
  const [params, setParams] = useState(null);
  const [cashflowData, setCashFlowData] = useState(null);

  return (
    <>
        <>
          <DateRange setCashFlowData={setCashFlowData} setParams={setParams}/>
          <div style={{paddingTop: '2rem'}}></div>
          {cashflowData &&
            <Table
              statement={cashflowData} 
              loggedInUser={loggedInUser}
            />
          }
        </>
    </>
  )
}

export default Cashflow;