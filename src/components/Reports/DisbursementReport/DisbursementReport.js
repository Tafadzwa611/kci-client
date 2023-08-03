import React, {useState} from 'react';
import DateRange from './DateRange';
import Table from './Table';

function DisbursementReport() {
  const [params, setParams] = useState(null);
  const [report, setReport] = useState(null);

  return (
    <>
      <DateRange setReport={setReport} setParams={setParams}/>
      <div style={{paddingTop: '2rem'}}></div>
      {report ? <Table report={report} setReport={setReport} params={params}/> : null}
    </>
  )
}

export default DisbursementReport;