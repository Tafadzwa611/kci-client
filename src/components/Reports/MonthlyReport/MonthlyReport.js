import React, {useState} from 'react';
import Filter from './Filter';
import MonthlyTable from './MonthlyTable';

function MonthlyReport() {
  const [monthlyReportData, setMonthlyReportData] = useState(null);

  return (
    <>
      <Filter setMonthlyReportData={setMonthlyReportData}/>
      <div style={{paddingTop: '2rem'}}></div>
      {monthlyReportData ? <MonthlyTable report={monthlyReportData}/> : null}
    </>
  )
}

export default MonthlyReport;