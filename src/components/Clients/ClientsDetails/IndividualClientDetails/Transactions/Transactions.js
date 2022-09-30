import React, { useState, useEffect } from 'react';
import {makeRequest} from '../../../../../utils/utils';
import PenaltyRow from './PenaltyRow';
import DisbursementRow from './DisbursementRow';
import PaymentRow from './PaymentRow';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import MiniLoader from '../../../../Loader/MiniLoader';

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
        return <MiniLoader />
    }

  return (
        <>
            <div style={{marginBottom:"1.5rem", display:"flex", justifyContent:"end", columnGap:"10px"}} className="text-light">
                <ReactHTMLTableToExcel
                id='test-table-xls-button'
                className='btn btn-default client__details'
                table='transactions'
                filename='tablexls'
                sheet='tablexls'
                buttonText='Download as XLS'/>
                <CurrencySelector currencies={currencies} currencyId={currencyId} setCurrencyId={setCurrencyId}/>
            </div>
            <table id='transactions' className='table'>
                <thead>
                    <tr className="client__address__table">
                        <th className="table-head-dark-color">Date_Posted</th>
                        <th className="table-head-dark-color">Reference</th>
                        <th className="table-head-dark-color">Loan_Description</th>
                        <th className="table-head-dark-color">Repayments</th>
                        <th className="table-head-dark-color">Disbursements</th>
                        <th className="table-head-dark-color">Principal Due</th>
                        <th className="table-head-dark-color">Interest Due</th>
                        <th className="table-head-dark-color">Penalty Due</th>
                        <th className="table-head-dark-color">Balance<em className='currency'></em></th>
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
        </>
    )
}

export default Transactions;

function CurrencySelector({currencies, currencyId, setCurrencyId}) {
    const changeCurrency = (evt) => {
        setCurrencyId(evt.target.value);
    }

    return (
        <select value={currencyId} onChange={changeCurrency} className="btn btn-default client__details">
        {currencies.map(currency => {
            return <option key={currency.id} value={currency.id}>{currency.shortname}</option>
        })}
        </select>
    )
}
