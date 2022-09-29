import React, { useEffect, useRef, useState } from 'react';
import DateRange from './DateRange';
import Header from './Header';
import Table from './Table';
import Footer from './Footer';
import NoData from '../ClientsReport/NoData';
import { makeRequest } from '../../../utils/utils';
import MiniLoader from '../../Loader/MiniLoader';

const DisbursementReport = () => {
    const [report, setReport] = useState([]);
    const [order, setOrder] = useState('-id');
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [loanCount, setLoanCount] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);
    const [reportLoaded, setReportLoaded] = useState(false);
    const [selectedBranchesIds, setSelectedBranchesIds] = useState([]);
    const [currencies, setCurrencies] = useState(null);
    const [currencyId, setCurrencyId] = useState(null);
    const [currencyIso, setCurrencyIso] = useState(null);
    const [msg, setMsg] = useState('Select date range and at least one branch, then click search to view report.');
    const isFirstRun = useRef(true);
    const pageNum = useRef(1);
  
    useEffect(() => {
        fetchCurrencies();
    }, []);
  
    useEffect(() => {
        pageNum.current = 1;
        setReport([]);
    }, [minDate, maxDate, selectedBranchesIds]);
  
    useEffect(() => {
        getReportData();
    }, [order]);

    const getReportData = async () => {
        if (!isFirstRun.current) {
            pageNum.current = 1;
            const data = await getReport();
            updateUi(data);
        }
    }
  
    const onSubmit = async (evt) => {
        evt.preventDefault();
        pageNum.current = 1;
        const data = await getReport();
        updateUi(data);
    }
  
    const changeOrder = async (evt) => {
        evt.preventDefault();
        isFirstRun.current = false;
        setOrder(evt.target.value);
    }

    const loadMore = async (evt) => {
        evt.preventDefault();
        setLoadingMore(true);
        const data = await getReport();
        updateUi(data, true);
        setLoadingMore(false);
    }
  
    const updateUi = (newData, extendReport=false) => {
        setCurrencyIso(currencies.filter(currency => currency.id == currencyId)[0].shortname);
        if (extendReport) {
            setReport(curr => ([...curr, ...newData.report]));
        } else {
            setLoanCount(newData.total_count);
            setReport(newData.report);
        }
        if (!reportLoaded){setReportLoaded(true)};
    }
  
    async function getReport() {
        const url = getUrl();
        const response = await makeRequest.get(url, {timeout: 8000});
        if (response.ok) {
            const data = await response.json();
            pageNum.current = data.next_page_num;
            return data
        } else {
            const error = await response.json();
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
  
    const getUrl = () => {
        let url = `/reportsapi/disbursement-report/?page_num=${pageNum.current}&order=${order}&currency_id=${currencyId}`;
        if (maxDate !== '') {url += `&max_date=${maxDate}`};
        if (minDate !== '') {url += `&min_date=${minDate}`};
        selectedBranchesIds.forEach(id => (url += `&branch_ids=${id}`));
        return url
    }
  
    if (currencies===null) {
        return <MiniLoader />
    }

    return (
        <>
            <DateRange 
                currencies={currencies}
                currencyId={currencyId}
                setCurrencyId={setCurrencyId}
                minDate={minDate}
                maxDate={maxDate}
                disableFetch={selectedBranchesIds.length === 0}
                onSubmit={onSubmit}
                setMaxDate={setMaxDate}
                setMinDate={setMinDate}
                updateSelectedBranchesId={setSelectedBranchesIds}
            />
            <Header 
                changeOrder={changeOrder} 
                order={order} 
                disableSelect={report.length === 0} 
                loanCount={loanCount} 
                numberOfLoansLoaded={report.length} 
            />
            {reportLoaded && report.length > 0 ?
            <>
                <Table report={report} currencyIso={currencyIso} />
                <Footer nextPageNumber={pageNum} loadMoreLoans={loadMore} loadingMore={loadingMore} />
            </> :
            <NoData msg={msg} />}
        </>
    );
}

export default DisbursementReport;