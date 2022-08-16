import React, { useState, useEffect } from 'react';
import {makeRequest} from '../../../../../utils/utils';
import PenaltyRow from './PenaltyRow';
import DisbursementRow from './DisbursementRow';
import PaymentRow from './PaymentRow';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { async } from 'regenerator-runtime';

function Transactions({clientId}) {
  const [transactions, setTransactions] = useState(null);
  const [currencies, setCurrencies] = useState(null);
  const [currencyId, setCurrencyId] = useState(null);

  useEffect(() => {
    getTxns();
  }, [currencyId]);

  const getTxns = async () => {
    if (currencyId !== null) {
        await fetchTxns();
    }
  }

  useEffect(() => {
    getCurrencies();
  }, []);

  const getCurrencies = async () => {
    await fetchCurrencies();
  }

  async function fetchTxns() {
    try {
      const response = await makeRequest.get(`/clientsapi/get_client_txns/${clientId}/?currency_id=${currencyId}`, {timeout: 8000});
      if (response.ok) {
        const json_res = await response.json();
        return setTransactions(json_res);
      }
    }catch(error) {
      console.log(error);
    }
  }

  async function fetchCurrencies() {
    try {
      const response = await makeRequest.get('/usersapi/list_currencies/', {timeout: 8000});
      if (response.ok) {
        const data = await response.json();
        const zwlId = data.filter(currency => currency.shortname === 'ZWL')[0].id;
        setCurrencyId(zwlId);
        return setCurrencies([...data.map(result => ({...result, label: result.shortname, value:result.id}))]);
      }else {
        const error = await response.json();
        console.log(error);
      }
    }catch(error) {
      console.log(error);
    }
  }

  if (transactions===null || currencies === null) {
    return <div>Loading</div>
  }

  return (
    <>
      <div className='row'>
        <div className='col-12'>
          <div className='pull-right'>
            <ReactHTMLTableToExcel
              id='test-table-xls-button'
              className='download-table-xls-button'
              table='transactions'
              filename='tablexls'
              sheet='tablexls'
              buttonText='Download as XLS'/>
            <CurrencySelector currencies={currencies} currencyId={currencyId} setCurrencyId={setCurrencyId}/>
          </div>
        </div>
      </div>
      <div className='active tab-pane' style={{marginTop: '15px'}}>
        <div className='table-responsive pad'>
          <table id='transactions' className='table table-bordered table-hover well'>
            <thead>
              <tr style={{backgroundColor: '#F2F8FF'}}>
                <th className='text-left text-bold'>Date_Posted</th>
                <th className='text-left text-bold'>Reference</th>
                <th className='text-left text-bold'>Loan_Description</th>
                <th className='text-right text-bold'>Repayments</th>
                <th className='text-right text-bold'>Disbursements</th>
                <th className='text-right text-bold'>Principal Due</th>
                <th className='text-right text-bold'>Interest Due</th>
                <th className='text-right text-bold'>Penalty Due</th>
                <th className='text-right text-bold'>Balance<em className='currency'></em></th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? transactions.map((transaction, idx) => ({
                'disbursement': <DisbursementRow key={idx} transaction={transaction}/>,
                'payment': <PaymentRow key={idx} transaction={transaction}/>,
                'penalty': <PenaltyRow key={idx} transaction={transaction}/>
              }[transaction.txn_type])): <tr><td colSpan={10} style={{textAlign: 'center'}}>No transactions could be found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Transactions;

function CurrencySelector({currencies, currencyId, setCurrencyId}) {
  const changeCurrency = (evt) => {
    setCurrencyId(evt.target.value);
  }

  return (
    <select value={currencyId} onChange={changeCurrency}>
      {currencies.map(currency => {
        return <option key={currency.id} value={currency.id}>{currency.shortname}</option>
      })}
    </select>
  )
}
