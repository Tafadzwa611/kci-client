import React, { useState, useEffect } from 'react';
import DateRange from './DateRange';
import { makeRequest } from '../../../utils/utils';
import NoData from './NoData';
import Table from './Table';

function CashReport() {
  const [accounts, setAccounts] = useState(null);
  const [rDate, setRDate] = useState('');
  const [accountId, setAccountId] = useState('');
  const [statement, setStatement] = useState(null);
  const [reconciled, setReconciled] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(false);
  const [order, setOrder] = useState('ReceiptsFirst');

  useEffect(() => {
    fetchAccounts();
  }, []);

  async function fetchAccounts() {
    try {
      const response = await makeRequest.get('/acc-api/cash-accounts-list/', {timeout: 6000});
      if (response.ok) {
        const data = await response.json();
        setCurrentDate(data.current_date);
        return setAccounts(data.accounts);
      }else {
        const error = await response.json();
        console.log(error);
      }
    }catch(error) {
      console.log(error);
    }
  }

  async function getStatement() {
    let url = `/acc-api/cash-report/?account_id=${accountId}&report_date=${rDate}`;
    const response = await makeRequest.get(url, {timeout: 6000});
    if (response.ok) {
      const data = await response.json();
      return data
    } else {
      const error = await response.json();
      console.log(error);
    }
  }

  const onSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    const data = await getStatement();
    setStatement(data);
    setReconciled(data.reconciled);
    setLoading(false);
  }

  if (accounts === null) {
    return 'loading'
  }

  return (
    <>
          <DateRange
            accounts={accounts}
            currentDate={currentDate}
            loading={loading}
            rDate={rDate}
            setRDate={setRDate}
            onSubmit={onSubmit}
            accountId={accountId}
            setAccountId={setAccountId}
          />
          <div style={{paddingTop: '17px'}}></div>
          {statement === null ?
            <NoData /> :
            <Table
              statement={statement}
              accountId={accountId}
              order={order}
              setOrder={setOrder}
              reconciled={reconciled}
              setReconciled={setReconciled}
            />}
    </>
  )
}

export default CashReport;