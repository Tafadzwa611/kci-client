import React, { useState, useRef, useEffect } from 'react';
import Filter from './Filter';
import { makeRequest } from '../../../utils/utils';
import Header from './Header';
import Table from './Table';
import Footer from './Footer';
import NoData from './NoData';
import MiniLoader from '../../Loader/MiniLoader';

const ClientsReport = () => {
    const [report, setReport] = useState([]);
    const [order, setOrder] = useState('-id');
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [clientCount, setClientCount] = useState(0);
    const [searchString, setSearchString] = useState('');
    const [loadingMore, setLoadingMore] = useState(false);
    const [reportLoaded, setReportLoaded] = useState(false);
    const [selectedBranchesIds, setSelectedBranchesIds] = useState([]);
    const [selectedBranches, setSelectedBranches] = useState([]);
    const [currencies, setCurrencies] = useState(null);
    const [currencyId, setCurrencyId] = useState(null);
    const [currencyIso, setCurrencyIso] = useState(null);
    const [msg, setMsg] = useState('Click the Apply Filters button to view report.');
    const pageNum = useRef(1);
    const isFirstRun = useRef(true);
  
    useEffect(() => {
        getCurrencies();
    }, []);

    const getCurrencies = async () => {
        await fetchCurrencies();
    }

    useEffect(() => {
        pageNum.current = 1;
        setReport([]);
    }, [minDate, maxDate, selectedBranchesIds]);

    useEffect(() => {
        getReportFunction();
    }, [order]);

    const getReportFunction = async () => {
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

    const searchClient = evt => {
        evt.preventDefault();
        setSearchString(evt.target.value);
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
            setReport(curr => ([...curr, ...newData.clients]));
        } else {
            setClientCount(newData.count);
            setReport(newData.clients);
            if (newData.clients.length === 0) {
                setMsg('No clients were added in the selected date range or branches.');
            }
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

    const getUrl = () => {
        let url = `/reportsapi/clients-report/?page_num=${pageNum.current}&order=${order}&currency_id=${currencyId}`;
        if (maxDate !== '') {url += `&max_date=${maxDate}`};
        if (minDate !== '') {url += `&min_date=${minDate}`};
        if (searchString !== '') {url += `&client_str=${searchString}`};
        selectedBranchesIds.forEach(id => (url += `&branch_ids=${id}`));
        return url
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

    if (currencies===null) {
        return <MiniLoader />
    }

    return (
            <>
                <Filter 
                    currencies={currencies}
                    currencyId={currencyId}
                    setCurrencyId={setCurrencyId}
                    minDate={minDate}
                    maxDate={maxDate}
                    disableFetch={false}
                    searchString={searchString}
                    onSubmit={onSubmit}
                    setMaxDate={setMaxDate}
                    setMinDate={setMinDate}
                    searchClient={searchClient}
                    updateSelectedBranchesId={setSelectedBranchesIds}
                    setSelectedBranches={setSelectedBranches}
                />
                <Header 
                    changeOrder={changeOrder} 
                    order={order} 
                    disableSelect={report.length === 0} 
                    clientCount={clientCount} 
                    numberOfClientsLoaded={report.length} 
                />
                {reportLoaded && report.length > 0 ?
                <>
                    <Table 
                        clients={report} 
                        currencyIso={currencyIso}
                        minDate={minDate}
                        maxDate={maxDate}
                        selectedBranches={selectedBranches}
                    />
                    <Footer 
                        nextPageNumber={pageNum} 
                        loadMoreClients={loadMore} 
                        loadingMore={loadingMore} 
                    />
                </>:
                <NoData msg={msg} />
                }
            </>
        );
    }

export default ClientsReport;