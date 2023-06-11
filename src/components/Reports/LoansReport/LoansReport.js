import React, {useState} from 'react';
import Filter from './Filter';
import LoansReportTable from './LoansReportTable';
import Summary from './Summary';

function LoansReport({loggedInUser}) {
  const [params, setParams] = useState(null);
  const [loansReportData, setLoansReportData] = useState({count: 0, next_page_num: 0, loans: []});
  const [intValues, setIntValues] = useState([])

  return (
    <>
        <>
          <Filter setLoansReportData={setLoansReportData} setParams={setParams} setIntValues={setIntValues}/>
          <Summary 
            report={loansReportData} 
            intValues={intValues}
            loggedInUser={loggedInUser}
          />
          <LoansReportTable
            loansReportData={loansReportData} 
            setLoansReportData={setLoansReportData}
            params={params}
            loggedInUser={loggedInUser}
            intValues={intValues}
          />
        </>
    </>
  )
}

export default LoansReport;