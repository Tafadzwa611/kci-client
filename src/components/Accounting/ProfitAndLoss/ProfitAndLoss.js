import React, {useState} from 'react';
import DateRange from './DateRange';
import New from './New';

function ProfitAndLoss() {
  const [profitAndLossData, setProfitAndLossData] = useState(null);

  return (
    <>
      <DateRange setProfitAndLossData={setProfitAndLossData}/>
      <div style={{paddingTop: '2rem'}}></div>
      {profitAndLossData ? <New report={profitAndLossData} /> : null}
    </>
  )
}

export default ProfitAndLoss;