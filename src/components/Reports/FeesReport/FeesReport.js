import React, {useState} from 'react';
import DateRange from './DateRange';
import Table from './Table';

function FeesReport({loggedInUser}) {
  const [params, setParams] = useState(null);
  const [feesReportData, setFeesReportData] = useState({count: 0, next_page_num: 0, report: []});
  const [intValues, setIntValues] = useState([])

  return (
    <>
        <>
          <DateRange setFeesReportData={setFeesReportData} setParams={setParams} setIntValues={setIntValues}/>
          <div style={{paddingTop: '2rem'}}></div>
          <Table
            feesReportData={feesReportData} 
            setFeesReportData={setFeesReportData}
            params={params}
            loggedInUser={loggedInUser}
            intValues={intValues}
          />
        </>
    </>
  )
}

export default FeesReport;