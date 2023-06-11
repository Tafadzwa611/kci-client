import React, {useState} from 'react';
import Filter from './Filter';
import MonthlyTable from './MonthlyTable';

function MonthlyReport({loggedInUser}) {
  const [params, setParams] = useState(null);
  const [monthlyReportData, setMonthlyReportData] = useState({report: []});

  return (
    <>
        <>
          <Filter setMonthlyReportData={setMonthlyReportData} setParams={setParams} />
          <div style={{paddingTop: '2rem'}}></div>
          <MonthlyTable
            report={monthlyReportData} 
            setMonthlyReportData={setMonthlyReportData}
            params={params}
            loggedInUser={loggedInUser}
          />
        </>
    </>
  )
}

export default MonthlyReport;