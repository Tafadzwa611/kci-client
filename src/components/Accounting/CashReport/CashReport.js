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
          {statement ? <Table statement={statement} setStatement={setStatement} /> : null}
        </>
      )}
    </Fetcher>
  )
}

export default CashReport;