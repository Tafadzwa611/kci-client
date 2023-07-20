import React, {useState} from 'react';
import Filter from './Filter';
import { Fetcher } from '../../../common';
import Table from './Table';
import TableHeader from './TableHeader';

function PaymentsReport({loggedInUser}) {

  return (
    <>
      <Fetcher urls={[`/acc-api/cash-accounts-list/`, `/usersapi/branch-list/`]}>
        {({data}) => <Report accounts={data[0]} branches={data[1]} loggedInUser={loggedInUser} />}
      </Fetcher>
    </>
  )
}

const Report = ({accounts, loggedInUser, branches}) => {
  const [params, setParams] = useState(null);
  const [payments, setPayments] = useState([]);
  const [aggregateData, setAggregateData] = useState(null);
  const [intValues, setIntValues] = useState([]);

  return (
    <>
        <Filter 
            setPayments={setPayments} 
            setParams={setParams} 
            setIntValues={setIntValues}
            accounts={accounts}
            branches={branches}
            setAggregateData={setAggregateData}
        />
        <div style={{paddingTop: '2rem'}}></div>
        {aggregateData &&
        <TableHeader aggregateData={aggregateData} intValues={intValues} />
        }
        {payments.length > 0 &&
          <Table payments={payments}/>
        }
    </>
  )
}

export default PaymentsReport;