import React, {useState, useRef, useCallback, useEffect} from 'react';
import LoansReportHeader from './LoansReportHeader';
import LoansReportTable from './LoansReportTable';
import LoansReportFooter from './LoansReportFooter';
import Filter from './Filter';
import { makeRequest } from '../../../utils/utils';
import NoData from '../ClientsReport/NoData';
import { debounceFunction, useAsyncReference } from './utils';
import MiniLoader from '../../Loader/MiniLoader';

const LoansReport = () => {
    const [selectedBranchesIds, setSelectedBranchesIds] = useAsyncReference([]);
    const [loans, setLoans] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [loanCount, setLoanCount] = useState(0);
    const [order, setOrder] = useAsyncReference('-id');
    const [minDate, setMinDate] = useAsyncReference('');
    const [maxDate, setMaxDate] = useAsyncReference('');
    const [searchString, setSearchString] = useAsyncReference('');
    const [loadingMore, setLoadingMore] = useState(false);
    const [currencies, setCurrencies] = useAsyncReference(null);
    const [currencyId, setCurrencyId] = useAsyncReference(null);
    const [currencyIso, setCurrencyIso] = useAsyncReference(null);
    const [selectedBranches, setSelectedBranches] = useState([]);
    const [msg, setMsg] = useState('Select date range and at least one branch, then click search to view report.');
    const pageNum = useRef(1);
    const disableFetch = minDate.current === '' || maxDate.current === '' || selectedBranchesIds.current.length === 0;

    useEffect(() => {
        fetchCurrencies();
    }, [])

    async function getData() {
        const url = getUrl();
        const response = await makeRequest.get(url, {timeout: 8000});
        if (response.ok) {
            const data = await response.json();
            pageNum.current = data.next_page_num;
            setLoadingMore(false);
            setLoaded(true);
            setLoanCount(data.count);
            setCurrencyIso(currencies.current.filter(currency => currency.id == currencyId.current)[0].shortname);
            if (data.loans.length === 0) {
                setMsg(`No ${currencyIso.current} loans could be found in the selected date range or branches.`);
            }
            return data.loans
        }else {
            const error = await response.json();
            console.log(error);
        }
    }
  
    const getUrl = () => {
        let url = `/reportsapi/loans-report/?page_num=${pageNum.current}&min_date=${minDate.current}&max_date=${maxDate.current}&order=${order.current}&currency_id=${currencyId.current}`;
        selectedBranchesIds.current.forEach(id => (url = url + `&branch_ids=${id}`));
        if (searchString.current != '') {
            url = url + `&client_str=${searchString.current}`;
        }
        return url
    }

    async function fetchCurrencies() {
        try {
            const response = await makeRequest.get('/usersapi/list_currencies/', {timeout: 8000});
            if (response.ok) {
                const data = await response.json();
                if (currencyId.current===null) {
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
  
    const debounceSubmit = useCallback(debounceFunction(async () => {
        pageNum.current = 1;
        const loans = await getData();
        setLoans(loans);
    }, 200), []);
  
    const onSubmit = (evt) => {
        evt.preventDefault();
        debounceSubmit();
    }
  
    const loadMore = async (evt) => {
        evt.preventDefault();
        setLoadingMore(true);
        const loans = await getData();
        setLoans(curr => ([...curr, ...loans]));
    }
  
    const changeOrder = async (evt) => {
        evt.preventDefault();
        setOrder(evt.target.value);
        pageNum.current = 1;
        const loans = await getData();
        setLoans(loans);
    }
  
    const searchClient = evt => {
        evt.preventDefault();
        setSearchString(evt.target.value);
        if (!disableFetch && loaded) {
            debounceSubmit();
        }
    }
  
    if (currencies.current===null) {
        return <MiniLoader />
    }
    
    return (
        <>
            <Filter 
                currencies={currencies.current}
                currencyId={currencyId.current}
                setCurrencyId={setCurrencyId}
                minDate={minDate.current}
                maxDate={maxDate.current}
                disableFetch={disableFetch}
                searchString={searchString.current}
                onSubmit={onSubmit}
                setMaxDate={setMaxDate}
                setMinDate={setMinDate}
                searchClient={searchClient}
                updateSelectedBranchesId={setSelectedBranchesIds}
                setSelectedBranches={setSelectedBranches}
            />
            <LoansReportHeader 
                changeOrder={changeOrder} 
                order={order.current} 
                disableSelect={loans.length === 0} 
                loanCount={loanCount} 
                numberOfLoansLoaded={loans.length}  
            />
            {loaded && loans.length > 0 ?
                <>
                    <LoansReportTable 
                        currencyIso={currencyIso.current} 
                        loans={loans} 
                        pageNum={pageNum} 
                        loadMore={loadMore} 
                        loadingMore={loadingMore} 
                        minDate={minDate}
                        maxDate={maxDate}
                        selectedBranches={selectedBranches}
                    />
                    <LoansReportFooter 
                        nextPageNumber={pageNum} 
                        loadMoreAccounts={loadMore} 
                        loadingMore={loadingMore} 
                    />
                </>:
                    <NoData msg={msg} />
            }
        </>
    );
}

export default LoansReport;