import React, {useState} from 'react';
import DateRange from './DateRange';
import { Fetcher } from '../../../common';
import Table from './Table';

function LoanProductReport() {
  const [report, setReport] = useState(null);

  return (
    <>
      <Fetcher urls={[`/loansapi/loan_products_list/`]}>
        {({data}) => (
          <>
            <DateRange setReport={setReport} products={data[0]}/>
            <div style={{paddingTop: '2rem'}}></div>
            {report ? <Table report={report}/> : null}
          </>
        )}
      </Fetcher>
    </>
  )
}

export default LoanProductReport;