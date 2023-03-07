import Filter from './Filter';
import { makeRequest } from '../../../utils/utils';
import MiniLoader from '../../Loader/MiniLoader';
import React, {useState, useEffect, useRef} from 'react';
import TableHeader from './TableHeader';
import Table from './Table';
import Footer from './Footer';


function PaymentsReport() {
    const [payments, setPayments] = useState([]);
    const [aggregateData, setAggregateData] = useState({});
    const [currencies, setCurrencies] = useState([]);
    const [currencyId, setCurrencyId] = useState('');
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [branches, setBranches] = useState([]);
    const [paymentBranchId, setPaymentBranchId] = useState('');
    const [loanBranchId, setLoanBranchId] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [paymentFundAccountId, setPaymentFundAccountId] = useState('');
    const [loanFundAccountId, setLoanFundAccountId] = useState('');
    const [loanNumber, setLoanNumber] = useState('');
    const [mode, setMode] = useState('screen');
    const [initing, setIniting] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const pageNum = useRef(1);
    const disableFetch = currencyId === ''|| minDate === '' || maxDate === '';

    useEffect(() => {
        async function runInit() {
            await Promise.all([fetchAccounts(), fetchCurrencies(), fetchBranches()]);
            setIniting(false);
        }
        runInit();
    }, []);

    useEffect(() => {
        setLoanFundAccountId('');
        setPaymentFundAccountId('');
    }, [currencyId]);

    const onSubmit = async (evt) => {
        evt.preventDefault();
        pageNum.current = 1;
        // setPayments([]);
        setLoading(true);
        const url = getUrl();
        await getPayments(url);
        setLoading(false);
    }

    const loadMore = async (evt) => {
        evt.preventDefault();
        setLoadingMore(true);
        const url = getUrl();
        await getPayments(url);
        setLoadingMore(false);
    }

    async function getPayments(url) {
        const response = await makeRequest.get(url, {timeout: 80000});
        if (response.ok) {
            const data = await response.json();
            setPayments(curr => [...curr, ...data.payments]);
            setAggregateData(data.aggregate_data);
            setLoaded(true);
            pageNum.current = data.next_page_num;
        } else {
            const error = await response.json();
            console.log(error);
        }
    }

    const getUrl = () => {
        let url = `/reportsapi/payments-report/?currency_id=${currencyId}&page_num=${pageNum.current}&min_date=${minDate}&max_date=${maxDate}`;
        if (paymentFundAccountId != '') {
            url += `&payment_fund_account_id=${paymentFundAccountId}`;
        }
        if (loanFundAccountId != '') {
            url += `&loan_fund_account_id=${loanFundAccountId}`;
        }
        if (loanNumber != '') {
            url += `&loan_number=${loanNumber}`;
        }
        if (paymentBranchId != '') {
            url += `&payment_branch_id=${paymentBranchId}`;
        }
        if (loanBranchId != '') {
            url += `&loan_branch_id=${loanBranchId}`;
        }
        return url
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

    async function fetchBranches() {
        try {
            const response = await makeRequest.get('/usersapi/get-branches/', {timeout: 80000});
            if (response.ok) {
                const data = await response.json();
                return setBranches([...data.results.map(result => ({...result, label: result.name, value:result.id}))]);
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    if (currencies===null) {
        return <MiniLoader />
    }

    return (
        <>
            <Filter
                minDate={minDate}
                setMinDate={setMinDate}
                maxDate={maxDate}
                setMaxDate={setMaxDate}
                currencies={currencies}
                currencyId={currencyId}
                setCurrencyId={setCurrencyId}
                branches={branches}
                accounts={accounts}
                paymentFundAccountId={paymentFundAccountId}
                setPaymentFundAccountId={setPaymentFundAccountId}
                loanFundAccountId={loanFundAccountId}
                setLoanFundAccountId={setLoanFundAccountId}
                loanNumber={loanNumber}
                setLoanNumber={setLoanNumber}
                mode={mode}
                setMode={setMode}
                disableFetch={disableFetch}
                onSubmit={onSubmit}
                loading={loading}
                paymentBranchId={paymentBranchId}
                setPaymentBranchId={setPaymentBranchId}
                loanBranchId={loanBranchId}
                setLoanBranchId={setLoanBranchId}
            />
            <div style={{paddingTop: '1.5rem'}}></div>
            {
                loaded && <div>
                    <TableHeader 
                        aggregateData={aggregateData} 
                        minDate={minDate}  
                        maxDate={maxDate}
                    />
                    <>
                        <Table payments={payments}/>
                        <Footer
                            nextPageNumber={pageNum.current}
                            loadMore={loadMore}
                            loadingMore={loadingMore}
                        />
                    </>
                </div>
            }
        </>
    )
}

export default PaymentsReport;