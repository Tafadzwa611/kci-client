import React, {useState} from 'react';
import Filter from './Filter';
import MonthlyTable from './MonthlyTable';
import { Fetcher } from '../../../common';

function MonthlyReport() {
  const [monthlyReportData, setMonthlyReportData] = useState(null);

  return (
    <Fetcher urls={['/usersapi/list_units/']}>
      {({data}) => <MonthlyReportSection units={data[0]} monthlyReportData={monthlyReportData} setMonthlyReportData={setMonthlyReportData}/>}
    </Fetcher>
  )
}

const MonthlyReportSection = ({monthlyReportData, setMonthlyReportData, units}) => {
  return (
    <>
      <Filter setMonthlyReportData={setMonthlyReportData} units={units}/>
      <div style={{paddingTop: '2rem'}}></div>
      {monthlyReportData ? <MonthlyTable report={monthlyReportData}/> : null}
    </>
  )
}

export default MonthlyReport;