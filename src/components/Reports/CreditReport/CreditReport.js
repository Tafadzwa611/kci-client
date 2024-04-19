import React, {useState} from 'react';
import Filter from './Filter';
import Table from './Table';

function CreditReport() {
  const [params, setParams] = useState(null);
  const [report, setReport] = useState(null);

  return (
    <>
      <Filter setReport={setReport} setParams={setParams}/>
      <div style={{paddingTop: '2rem'}}></div>
      {report && <Table report={report} setReport={setReport} params={params}/>}
    </>
  )
}

export default CreditReport;