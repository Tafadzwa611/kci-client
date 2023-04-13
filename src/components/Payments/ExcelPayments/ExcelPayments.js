import React, {useEffect, useState} from 'react';
import { makeRequest } from '../../../utils/utils';
import MiniLoader from '../../Loader/MiniLoader';
import Filter from './Filter';
import PaymentsReportList from './PaymentsReportList';
import {useNavigate} from 'react-router-dom';


function ExcelPayments() {
    const [paymentDate, setPaymentDate] = useState('');
    const [reports, setReports] = useState([]);
    const [fileName, setFileName] = useState(null);
    const [fieldName, setFieldName] = useState('loan_id');
    const [amountCol, setAmountCol] = useState('');
    const [refCol, setRefCol] = useState('');
    const [order, setOrder] = useState('loan_added_on');
    const [cashAccountId, setCashAccountId] = useState('');
    const [currencyId, setCurrencyId] = useState('');
    const [currencies, setCurrencies] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [initing, setIniting] = useState(true);
    const [loading, setLoading] = useState(false);
    const [includeFP, setIncludeFP] = useState(false);
    const disableFetch = currencyId === ''|| paymentDate === '' || fileName === null || amountCol === '' || refCol === '' || cashAccountId === '';
    let navigate = useNavigate();

    useEffect(() => {
        async function runInit() {
            await Promise.all([fetchAccounts(), fetchCurrencies(), fetchReports()]);
            setIniting(false);
        }
        runInit();
    }, []);

    async function onSubmit(evt) {
        evt.preventDefault();
        setLoading(true);
        const data = {
            payment_date: paymentDate, file_name: fileName,
            field_name: fieldName, ref_col: refCol,
            cash_account_id: cashAccountId, amount_col: amountCol,
            order: order, include_fp_op: includeFP
        };
        const response = await makeRequest.post('/loansapi/start_excel_payments_processing/', data, {timeout: 60000});
        if (response.ok) {
            const data = await response.json();
            navigate.push(`/paymentsreport/${data.result}`);
            return
        } else {
            const error = await response.json();
            console.log(error);
        }
        setLoading(false);
    }

    async function fetchAccounts() {
        try {
            const response = await makeRequest.get('/acc-api/cash-accounts-list/', {timeout: 80000});
            if (response.ok) {
                const data = await response.json();
                return setAccounts(data.accounts);
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    async function fetchReports() {
        try {
        const response = await makeRequest.get('/loansapi/excel_payments_report_list/', {timeout: 80000});
        if (response.ok) {
            const data = await response.json();
            return setReports(data);
        }else {
            const error = await response.json();
            console.log(error);
        }
        }catch(error) {
            console.log(error);
        }
    }

    async function fetchCurrencies() {
        try {
            const response = await makeRequest.get('/usersapi/list_currencies/', {timeout: 80000});
            if (response.ok) {
                const data = await response.json();
                return setCurrencies([...data.map(result => ({...result, label: result.shortname, value:result.id}))]);
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    if (initing) {
        return <MiniLoader />
    }

    return (
        <>
        <div>
            <div>
                <Filter
                    paymentDate={paymentDate}
                    setPaymentDate={setPaymentDate}
                    setFileName={setFileName}
                    fieldName={fieldName}
                    setFieldName={setFieldName}
                    amountCol={amountCol}
                    setAmountCol={setAmountCol}
                    refCol={refCol}
                    setRefCol={setRefCol}
                    order={order}
                    setOrder={setOrder}
                    cashAccountId={cashAccountId}
                    setCashAccountId={setCashAccountId}
                    currencyId={currencyId}
                    setCurrencyId={setCurrencyId}
                    currencies={currencies}
                    accounts={accounts}
                    onSubmit={onSubmit}
                    loading={loading}
                    disableFetch={disableFetch}
                    includeFP={includeFP}
                    setIncludeFP={setIncludeFP}
                />
                <div style={{paddingTop: '17px'}}></div>
                <div className='row'>
                    <div className='col-12'>
                        <PaymentsReportList reports={reports}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ExcelPayments;