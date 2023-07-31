import React, {useState} from 'react';
import Filter from './Filter';
import { Fetcher } from '../../../common';
import Table from './Table';
import Summary from './Summary';

function PaymentsReport() {
  const [params, setParams] = useState(null);
  const [report, setReport] = useState(null);
  const [tab, setTab] = useState('summary');

  return (
    <Fetcher urls={[`/acc-api/cash-accounts-list/`, `/usersapi/branch-list/`]}>
      {({data}) => (
        <>
          <Filter setReport={setReport} setParams={setParams} accounts={data[0]} branches={data[1]}/>
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
          </>
          : null}
        </>
      )}
    </Fetcher>
  )
}

export default PaymentsReport;