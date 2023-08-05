import React, {useState} from 'react';
import Filter from './Filter';
import Table from './Table';

function DailyReport() {
  const [report, setReport] = useState(null);

  return (
    <>
      <Filter setReport={setReport}/>
      <div style={{paddingTop: '2rem'}}></div>
      {report ? <Table report={report}/> : null}
    </>
  )
}

export default DailyReport;