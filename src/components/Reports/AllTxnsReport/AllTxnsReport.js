import React from 'react';
import Filter from './Filter';
import Table from './Table';


function AllTxnsReport() {
  const [params, setParams] = React.useState(null);
  const [report, setReport] = React.useState(null);

  return (
    <div>
      <Filter setReport={setReport} setParams={setParams}/>
      {report && (
        <div className='tab-content font-12' style={{marginTop: '3rem'}}>
          <Table report={report} setReport={setReport} params={params}/>
        </div>
      )}
    </div>
  )
}

export default AllTxnsReport;
