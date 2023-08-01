import React, {useState} from 'react';
import Filter from './Filter';
import Table from './Table';
import Summary from './Summary';

function ExpectedPaymentsReport() {
  const [params, setParams] = useState(null);
  const [report, setReport] = useState(null);
  const [tab, setTab] = useState('summary');

  return (
    <>
      <Filter setReport={setReport} setParams={setParams}/>
      <div style={{paddingTop: '2rem'}}></div>
      {report ?
      <>
        <div className='bloc-tabs'>
          <button className={tab === 'summary' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('summary')}>Summary</button>
          <button className={tab === 'table' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('table')}>Loans</button>
        </div>
        <div className='tab-content font-12' style={{marginTop: '3rem'}}>
          {{
            summary: <Summary summary={report.aggregate_data}/>,
            table: <Table report={report} params={params} setReport={setReport}/>
          }[tab]}
        </div>
      </> :
      null}
    </>
  )
}

export default ExpectedPaymentsReport;