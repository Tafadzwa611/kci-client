import React, {useState} from 'react';
import DateRange from './DateRange';
import { Fetcher } from '../../../common';
import Table from './Table';

function CashReport() {
  const [statement, setStatement] = useState(null);

  return (
    <Fetcher urls={[`/acc-api/cash-accounts-list/`]}>
      {({data}) => (
        <>
          <DateRange setStatement={setStatement} accounts={data[0].accounts}/>
          <div style={{paddingTop: '2rem'}}></div>
          {statement && (
            <div>
              {statement.last_reconciliation_date && (
                <b>Last Closure Date {statement.last_reconciliation_date}</b>
              )}
              {statement.is_partially_closed && (
                <div>
                  Status: <span className="badge badge-danger">Partially Closed</span>
                </div>
              )}
              <Table 
                statement={statement}
                setStatement={setStatement}
              />
            </div>
          )}
        </>
      )}
    </Fetcher>
  )
}

export default CashReport;