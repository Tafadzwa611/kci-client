import React, {useState} from 'react';
import DateRange from './DateRange';
import Table from './Table';

function LoanOfficerReport() {
  const [report, setReport] = useState(null);

  return (
    <>
      <DateRange setReport={setReport}/>
      <div style={{paddingTop: '2rem'}}></div>
      {report ? <Table report={report}/> : null}
    </>
  )
}

export default LoanOfficerReport;