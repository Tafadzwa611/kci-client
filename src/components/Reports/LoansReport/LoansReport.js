import React, {useState} from 'react';
import Filter from './Filter';
import LoansReportTable from './LoansReportTable';
import Summary from './Summary';

function LoansReport() {
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
          <button className={tab === 'loans' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('loans')}>Loans</button>
        </div>
        <div className='tab-content font-12' style={{marginTop: '3rem'}}>
          {{
            summary: <Summary summary={report.summary}/>,
            loans: <LoansReportTable report={report} setReport={setReport} params={params}/>
          }[tab]}
        </div>
      </> : null}
    </>
  )
}

export default LoansReport;