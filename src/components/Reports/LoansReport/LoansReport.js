import React, {useState} from 'react';
import Filter from './Filter';
import LoansReportTable from './LoansReportTable';

function LoansReport({loggedInUser}) {
  const [params, setParams] = useState(null);
  const [loansReportData, setLoansReportData] = useState({count: 0, next_page_num: 0, loans: []});
  const [intValues, setIntValues] = useState([])

  return (
    <>
        <>
          <Filter setLoansReportData={setLoansReportData} setParams={setParams} setIntValues={setIntValues}/>
          <div style={{paddingTop: '2rem'}}></div>
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