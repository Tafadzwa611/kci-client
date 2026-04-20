import React, { useState } from 'react';
import Filter from './Filter';
import Table from './Table';
import Summary from './Summary';

function ExpensesReport() {
  const [params, setParams] = useState(null);
  const [report, setReport] = useState(null);
  const [tab, setTab] = useState('summary');

  return (
    <>
      <Filter setReport={setReport} setParams={setParams} />
      <div style={{ paddingTop: '2rem' }}></div>
      {report ? (
        <>
          <div className='bloc-tabs'>
            <button
              className={tab === 'summary' ? 'tabs-client active-tabs' : 'tabs-client'}
              onClick={() => setTab('summary')}
            >
              Summary
            </button>
            <button
              className={tab === 'expenses' ? 'tabs-client active-tabs' : 'tabs-client'}
              onClick={() => setTab('expenses')}
            >
              Expenses
            </button>
          </div>

          <div className='tab-content font-12' style={{ marginTop: '3rem' }}>
            {{
              summary: <Summary report={report} />,
              expenses: <Table report={report} params={params} setReport={setReport} setParams={setParams} />,
            }[tab]}
          </div>
        </>
      ) : null}
    </>
  );
}

export default ExpensesReport;
