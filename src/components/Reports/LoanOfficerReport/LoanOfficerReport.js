import React, {useState} from 'react';
import DateRange from './DateRange';
import Table from './Table';

function LoanOfficerReport({loggedInUser}) {
  const [params, setParams] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [report, setReport] = useState([]);
  const [intValues, setIntValues] = useState([]);

  return (
    <>
        <DateRange 
            setReport={setReport} 
            setParams={setParams} 
            setIntValues={setIntValues}
            setCurrency={setCurrency}
        />
        <div style={{paddingTop: '2rem'}}></div>
        {report.length > 0  &&
            <Table report={report} currency={currency} intValues={intValues} loggedInUser={loggedInUser}/>
        }
    </>
  )
}

export default LoanOfficerReport;