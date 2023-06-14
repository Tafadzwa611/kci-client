import React, {useState} from 'react';
import DateRange from './DateRange';
import { Fetcher } from '../../../common';
import Table from './Table';
import NoData from './NoData';

function CashReport({loggedInUser}) {

  return (
    <>
      <Fetcher urls={[`/acc-api/cash-accounts-list/`]}>
        {({data}) => <Report accounts={data[0]} loggedInUser={loggedInUser} />}
      </Fetcher>
    </>
  )
}

const Report = ({accounts, loggedInUser}) => {
  const [params, setParams] = useState(null);
  const [statement, setStatement] = useState(null);
  const [intValues, setIntValues] = useState([])
  const [order, setOrder] = useState('ReceiptsFirst');
  const [reconciled, setReconciled] = useState(null);

  return (
    <>
      <DateRange 
        setStatement={setStatement} 
        setParams={setParams} 
        setIntValues={setIntValues}
        accounts={accounts}
        setReconciled={setReconciled}
      />
      <div style={{paddingTop: '2rem'}}></div>
      {statement === null ?
        <NoData /> :
        <Table
          statement={statement} 
          loggedInUser={loggedInUser}
          intValues={intValues}
          order={order}
          setOrder={setOrder}
          reconciled={reconciled}
        />
      }
    </>
  )
}

export default CashReport;