import React, {useState} from 'react';
import DateRange from './DateRange';
import Table from './Table';
import Summary from './Summary';

function FeesReport({loggedInUser}) {
  const [params, setParams] = useState(null);
  const [feesReportData, setFeesReportData] = useState({count: 0, next_page_num: 0, report: []});
  const [intValues, setIntValues] = useState([])
  const [currency, setCurrency] = useState(null)
  const [summary, setSummary] = useState(null);

  return (
    <>
        <>
          <DateRange 
            setFeesReportData={setFeesReportData} 
            setParams={setParams} 
            setIntValues={setIntValues} 
            setCurrency={setCurrency}
            setSummary={setSummary}
          />
          <div style={{paddingTop: '2rem'}}></div>
          {summary &&
            <Summary 
              summary={summary} 
              currency={currency} 
              intValues={intValues} 
              loggedInUser={loggedInUser} 
            />
          }
          <Table
            feesReportData={feesReportData} 
            setFeesReportData={setFeesReportData}
            params={params}
            loggedInUser={loggedInUser}
            intValues={intValues}
            currency={currency}
          />
        </>
    </>
  )
}

export default FeesReport;