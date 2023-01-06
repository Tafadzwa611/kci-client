import React, { useRef, useState, useEffect, useCallback } from 'react';
import DateRange from './DateRange';
import Header from './Header';
import Table from './Table';
import Footer from './Footer';
import NoData from './NoData';
import { makeRequest } from '../../../utils/utils';
import { debounceFunction, useAsyncReference } from './utils';
import MiniLoader from '../../Loader/MiniLoader';

const Journals = () => {
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [asStatement, setAsStatement] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [accountId, setAccountId] = useState('');
    const [openBal, setOpenBal] = useState('');
    const [order, setOrder] = useAsyncReference('date_created');
    const [minDate, setMinDate] = useAsyncReference('');
    const [maxDate, setMaxDate] = useAsyncReference('');
    const [journalCount, setJournalCount] = useState(0);
    const [selectedBranchesIds, setSelectedBranchesIds] = useAsyncReference([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [msg, setMsg] = useState('Select date range and at least one branch, then click search to view journals.');
    const [currencies, setCurrencies] = useState(null);
    const [staff, setStaff] = useState(null);
    const [staffId, setStaffId] = useState('');
    const [currencyId, setCurrencyId] = useState(null);
    const [currencyIso, setCurrencyIso] = useState(null);
    const pageNum = useRef(1);

    useEffect(() => {
        fetchCurrencies();
        fetchStaff();
        fetchAccounts();
    }, []);


    useEffect(() => {
        setJournals([]);
        setAsStatement(false);
        setJournalCount(0);
    }, [staffId, currencyId, accountId]);

    useEffect(() => {
        if (asStatement) {
        setOrder('date_created');
        setJournals([]);
        setJournalCount(0);
        }
    }, [asStatement]);
  
    const onSubmit = async (evt) => {
        evt.preventDefault();
        pageNum.current = 1;
        const data = await getJournals();
        setOpenBal(data.account_opening_balance);
        setCurrencyIso(currencies.filter(currency => currency.id == currencyId)[0].shortname);
        updateUi(data);
    }
  
    const loadMore = async (evt) => {
        evt.preventDefault();
        setLoadingMore(true);
        const data = await getJournals();
        updateUi(data, true);
        setLoadingMore(false);
    }

    const changeOrder = async (evt) => {
        evt.preventDefault();
        setOrder(evt.target.value);
        pageNum.current = 1;
        const data = await getJournals();
        updateUi(data);
    }
  
    async function getJournals() {
        setLoading(true);
        const url = getUrl();
        const response = await makeRequest.get(url, {timeout: 8000});
        if (response.ok) {
            const data = await response.json();
            pageNum.current = data.next_page_num;
            setLoading(false);
            return data
        } else {
            const error = await response.json();
            setLoading(false);
            console.log(error);
        }
    }
  
    async function fetchCurrencies() {
        try {
        const response = await makeRequest.get('/usersapi/list_currencies/', {timeout: 8000});
            if (response.ok) {
                const data = await response.json();
                if (currencyId===null) {
                    const zwlId = data.filter(currency => currency.shortname === 'ZWL')[0].id;
                    setCurrencyId(zwlId);
                }
                return setCurrencies([...data.map(result => ({...result, label: result.shortname, value:result.id}))]);
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    async function fetchAccounts() {
        try {
            const response = await makeRequest.get('/acc-api/accounts-list/', {timeout: 6000});
            if (response.ok) {
                const data = await response.json();
                return setAccounts(data);
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    async function fetchStaff() {
        try {
            const response = await makeRequest.get('/usersapi/staff/', {timeout: 6000});
            if (response.ok) {
                const data = await response.json();
                setStaff(data);
                return
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }
    
  
    const getUrl = () => {
        let url = `/acc-api/journals-list/?page_num=${pageNum.current}&order=${order.current}&currency_id=${currencyId}&format=json`;
        if (maxDate.current !== '') {url += `&max_date=${maxDate.current}`};
        if (minDate.current !== '') {url += `&min_date=${minDate.current}`};
        if (accountId !== '') {url += `&account_id=${accountId}`};
        if (staffId !== '') {url += `&user_id=${staffId}`};
        selectedBranchesIds.current.forEach(id => (url += `&branch_ids=${id}`));
        return url
    }
  
    const updateUi = (newData, extendReport=false) => {
        if (extendReport) {
            setJournals(curr => ([...curr, ...newData.journals]));
        } else {
            setJournals(newData.journals);
            setJournalCount(newData.count);
            if (newData.journals.length === 0) {
                setMsg('No journals could be found in the selected branches or date range.');
            }
        }
    }
  
    if (currencies===null || staff===null) {
        return (
            <MiniLoader />
        )
    }

    console.log(journals)

    return (
        <>
            <DateRange 
                minDate={minDate.current}
                maxDate={maxDate.current}
                currencies={currencies}
                currencyId={currencyId}
                setCurrencyId={setCurrencyId}
                disableFetch={selectedBranchesIds.current.length === 0}
                onSubmit={onSubmit}
                loading={loading}
                setMaxDate={setMaxDate}
                setMinDate={setMinDate}
                setJournals={setJournals}
                staff={staff}
                staffId={staffId}
                setStaffId={setStaffId}
                updateSelectedBranchesId={setSelectedBranchesIds}
                accounts={accounts}
                accountId={accountId}
                setAccountId={setAccountId}
            />
            <Header 
                key={accountId}
                changeOrder={changeOrder}
                order={order.current}
                disableSelect={journals.length === 0}
                journalCount={journalCount}
                numberOfJournalsLoaded={journals.length}
                asStatement={asStatement}
                setAsStatement={setAsStatement}
                accountId={accountId}
            />
            <Table 
                accountId={accountId}
                asStatement={asStatement}
                journals={journals}
                openBal={openBal}
                msg={msg}
                nextPageNumber={pageNum.current}
                loadMoreJournals={loadMore}
                loadingMore={loadingMore}
            />
        </>
    );
}

export default Journals;