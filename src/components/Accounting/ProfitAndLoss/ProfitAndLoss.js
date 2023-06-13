import React, {useState} from 'react';
import DateRange from './DateRange';
import Display from './Display';
import New from './New';

function Cashflow({loggedInUser}) {
  const [params, setParams] = useState(null);
  const [profitAndLossData, setProfitAndLossData] = useState(null);
  const [intValues, setIntValues] = useState([])

  return (
    <>
        <>
          <DateRange setProfitAndLossData={setProfitAndLossData} setParams={setParams} setIntValues={setIntValues}/>
          <div style={{paddingTop: '2rem'}}></div>
          {intValues.v === 'o' ? <Display report={profitAndLossData} /> : 
          <New intValues={intValues} report={profitAndLossData} loggedInUser={loggedInUser} />}
        </>
    </>
  )
}

export default Cashflow;