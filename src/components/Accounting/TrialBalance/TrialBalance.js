import React, {useState} from 'react';
import Filter from './Filter';
import TrialBalanceTable from './TrialBalanceTable';

function TrialBalance() {
  const [trialBalanceData, setTrialBalanceData] = useState(null);

  return (
    <>
      <Filter setTrialBalanceData={setTrialBalanceData}/>
      <div style={{paddingTop: '2rem'}}></div>
      {trialBalanceData ? <TrialBalanceTable trialBalance={trialBalanceData} /> : null}
    </>
  )
}

export default TrialBalance;