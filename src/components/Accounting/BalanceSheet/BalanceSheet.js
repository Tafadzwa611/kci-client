import React, {useState} from 'react';
import Filter from './Filter';
import Display from './Display';

function BalanceSheet() {
  const [balanceSheetData, setbalanceSheetData] = useState(null);

  return (
    <>
      <Filter setbalanceSheetData={setbalanceSheetData}/>
      <div style={{paddingTop: '2rem'}}></div>
      {balanceSheetData ? <Display report={balanceSheetData} /> : null}
    </>
  )
}

export default BalanceSheet;