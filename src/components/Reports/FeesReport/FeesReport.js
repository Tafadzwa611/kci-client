import React, {useState} from 'react';
import DateRange from './DateRange';
import Table from './Table';
import Summary from './Summary';

function FeesReport() {
  const [params, setParams] = useState(null);
  const [report, setReport] = useState(null);
  const [tab, setTab] = useState('summary');

  return (
    <>
      <DateRange setReport={setReport} setParams={setParams}/>
      <div style={{paddingTop: '2rem'}}></div>
      {report ?
      <>
        <div className='bloc-tabs'>
          <button className={tab === 'summary' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('summary')}>Summary</button>
          <button className={tab === 'list' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('list')}>List</button>
        </div>
        <div className='tab-content font-12' style={{marginTop: '3rem'}}>
          {{
            summary: <Summary summary={report.totals}/>,
            list: <Table report={report} setReport={setReport} params={params}/>
          }[tab]}
        </div>
      </> : null}
    </>
  )
}

export default FeesReport;