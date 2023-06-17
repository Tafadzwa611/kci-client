import React, {useState} from 'react';
import Filter from './Filter';
import ExpectedPaymentsTable from './ExpectedPaymentsTable';
import TableHeader from './TableHeader';

function ExpectedPaymentsReport({accounts, branches}) {
  const [params, setParams] = useState(null);
  const [installments, setInstallments] = useState([]);
  const [aggregateData, setAggregateData] = useState(null);
  const [intValues, setIntValues] = useState([]);

  return (
    <>
        <Filter 
            setInstallments={setInstallments} 
            setParams={setParams} 
            setIntValues={setIntValues}
            setAggregateData={setAggregateData}
        />
        <div style={{paddingTop: '2rem'}}></div>
        {aggregateData &&
        <TableHeader aggregateData={aggregateData} intValues={intValues} />
        }
        <ExpectedPaymentsTable installments={installments}/>
    </>
  )
}

export default ExpectedPaymentsReport;