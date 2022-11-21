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
    const [order, setOrder] = useAsyncReference('-date_created');
    const [minDate, setMinDate] = useAsyncReference('');
    const [maxDate, setMaxDate] = useAsyncReference('');
    const [journalCount, setJournalCount] = useState(0);
    const [selectedBranchesIds, setSelectedBranchesIds] = useAsyncReference([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [searchString, setSearchString] = useAsyncReference('');
    const [msg, setMsg] = useState('Select date range and at least one branch, then click search to view journals.');
    const [currencies, setCurrencies] = useState(null);
    const [currencyId, setCurrencyId] = useState(null);
    const [currencyIso, setCurrencyIso] = useState(null);
    const [user, setUser] = useState(null);
    const [details, setDetails] = useState(false)
    const [selectedjrnlID, setSelectedJrnlID] = useState(null)
    const pageNum = useRef(1);

    useEffect(() => {
        fetchCurrencies();
    }, []);
  
    const onSubmit = async (evt) => {
        evt.preventDefault();
        pageNum.current = 1;
        const data = await getJournals();
        setCurrencyIso(currencies.filter(currency => currency.id == currencyId)[0].shortname);
        // setUser(journals.filter(usr => usr.id == currencyId)[0].shortname);
        updateUi(data);
    }
  
    const debounceSearchAccount = useCallback(debounceFunction(async () => {
        pageNum.current = 1;
        const data = await getJournals();
        updateUi(data);
    }, 400), []);
  
    const searchAccount = evt => {
        evt.preventDefault();
        setSearchString(evt.target.value);
        if (selectedBranchesIds.current.length > 0) {
            debounceSearchAccount();
        }
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
        let url = `/acc-api/journals-list/?page_num=${pageNum.current}&order=${order.current}&currency_id=${currencyId}`;
        if (maxDate.current !== '') {url += `&max_date=${maxDate.current}`};
        if (minDate.current !== '') {url += `&min_date=${minDate.current}`};
        if (searchString.current !== '') {url += `&search_str=${searchString.current}`};
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
  
    if (currencies===null) {
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
                searchString={searchString.current}
                searchAccount={searchAccount}
                disableFetch={selectedBranchesIds.current.length === 0}
                onSubmit={onSubmit}
                setMaxDate={setMaxDate}
                setMinDate={setMinDate}
                setJournals={setJournals}
                updateSelectedBranchesId={setSelectedBranchesIds}
                details={details}
            />
            <Header changeOrder={changeOrder} order={order.current} disableSelect={journals.length === 0} journalCount={journalCount} numberOfJournalsLoaded={journals.length}/>
            {journals.length > 0 ?
            <>
            {/* {details ? <JournalDetails journals={journals} selectedjrnl={journals.find(jrnl => jrnl.id == selectedjrnlID)} />:
            <Table currencyIso={currencyIso} journals={journals} setDetails={setDetails} setSelectedJrnlID={setSelectedJrnlID}/>
            } */}
            <Table 
                currencyIso={currencyIso} 
                journals={journals} 
                setDetails={setDetails} 
                details={details} 
                setSelectedJrnlID={setSelectedJrnlID} 
                selectedjrnlID={selectedjrnlID}
                selectedjrnl={journals.find(jrnl => jrnl.id == selectedjrnlID)}
            />
            <Footer nextPageNumber={pageNum.current} loadMoreJournals={loadMore} loadingMore={loadingMore}/>
            </> :
            <NoData msg={msg} />}
        </>
    );
}

export default Journals;