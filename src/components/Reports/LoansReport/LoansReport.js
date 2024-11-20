import React, {useState} from 'react';
import Filter from './Filter';
import LoansReportTable from './LoansReportTable';
import Summary from './Summary';
import { Fetcher } from '../../../common';

function LoansReport() {
  const [params, setParams] = useState(null);
  const [report, setReport] = useState(null);
  const [tab, setTab] = useState('summary');

  return (
    <Fetcher urls={['/usersapi/list_units/']}>
      {({data}) => <LoansReportSection units={data[0]} params={params} setParams={setParams} report={report} setReport={setReport} tab={tab} setTab={setTab}/>}
    </Fetcher>
  )
}

const LoansReportSection = ({params, setParams, report, setReport, tab, setTab, units}) => {
  return (
    <>
      <Filter setReport={setReport} setParams={setParams} units={units}/>
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