import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import Table from './Table';
import Footer from './Footer';
import Filter from './Filter';
import NoData from '../ClientsReport/NoData';
import { makeRequest } from '../../../utils/utils';

const TopBorrowers = () => {
    const [month, setMonth] = useState('');
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [selectedBranchesIds, setSelectedBranchesIds] = useState([]);
    const [order, setOrder] = useState('-id');
    const [report, setReport] = useState([]);
    const pageNum = useRef(1);
    const isFirstRun = useRef(true);
    const [loading, setLoading] = useState(false);
    const [currencies, setCurrencies] = useState(null);
    const [currencyId, setCurrencyId] = useState(null);
    const [currencyIso, setCurrencyIso] = useState(null);
    const [msg, setMsg] = useState('Select date range and at least one branch, then click search to view the report.');
  
    useEffect(() => {
        fetchCurrencies();
    }, []);
  
    async function getReport() {
        const url = getUrl();
        const response = await makeRequest.get(url, {timeout: 8000});
        if (response.ok) {
            const data = await response.json();
            pageNum.current = data.next_page_num;
            if (data.report.length === 0) {
                setMsg('No data could be found in the selected branches or month.');
            }
            setLoading(false);
            return data.report
        }
        const error = await response.json();
        setMsg(Object.values(error)[0]);
        console.log(Object.values(error));
        return []
    }
  
    useEffect(() => {
        pageNum.current = 1;
        setReport([]);
    }, [month, selectedBranchesIds]);
  
    useEffect(() => {
        getReportData();
    }, [order]);

    const getReportData = async () => {
        if (!isFirstRun.current) {
            pageNum.current = 1;
            const report = await getReport();
            setReport(report);
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
  
    const getUrl = () => {
        let url = `/reportsapi/top-borrowers-report/?order=${order}&page_num=${pageNum.current}&currency_id=${currencyId}`;
        if (minDate !== '') {url += `&min_date=${minDate}`};
        if (maxDate !== '') {url += `&max_date=${maxDate}`};
        selectedBranchesIds.forEach(id => (url += `&branch_ids=${id}`));
        return url
    }
  
    const onSubmit = async (evt) => {
        evt.preventDefault();
        pageNum.current = 1;
        const report = await getReport();
        setCurrencyIso(currencies.filter(currency => currency.id == currencyId)[0].shortname);
        setReport(report);
    }
  
    const changeOrder = async (evt) => {
        evt.preventDefault();
        isFirstRun.current = false;
        setOrder(evt.target.value);
    }
  
    const loadMore = async (evt) => {
        evt.preventDefault();
        setLoading(true);
        const report = await getReport();
        setReport(curr => [...curr, ...report]);
    }
  
    if (currencies===null) {
        return <div>loading...</div>
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
                month={month}
                setMonth={setMonth}
                disableFetch={selectedBranchesIds.length === 0}
                onSubmit={onSubmit}
                updateSelectedBranchesId={setSelectedBranchesIds}
            />
            <Header changeOrder={changeOrder} order={order} disableSelect={report.length === 0} />
            {report.length > 0 ?
                <>
                    <Table />
                    <Footer />
                </>:
                <NoData msg={msg} />
            }
        </>
    );
}

export default TopBorrowers;