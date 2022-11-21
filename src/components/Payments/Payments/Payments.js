import React, { useState, useEffect, useRef } from 'react';
import PaymentsList from './PaymentsList';
import PaymentsFilter from './PaymentsFilter';
import PaymentsFooter from './PaymentsFooter';
import { makeRequest } from '../../../utils/utils';
import MiniLoader from '../../Loader/MiniLoader';
import AdvancedSearchPayments from '../AdvancedSearchPayments/AdvancedSearchPayments';


const Payments = () => {

    const [payments, setPayments] = useState([])
    const [nextPageNumber, setNextPageNumber] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [clientName, setClientName] = useState('');
    const [currency, setCurrency] = useState(null);
    const [currencyId, setCurrencyId] = useState(null);
    const [minDateCreated, setMinDateCreated] = useState('');
    const [maxDateCreated, setMaxDateCreated] = useState('');
    const [loadingMore, setLoadingMore] = useState(false);
    const [open, setOpen] = useState(false);
    const [searching, setSearching] = useState(false);
    const [details, setDetails] = useState(false)
    const [selectedExpID, setSelectedExpID] = useState(null)
    const [branches, setBranches] = useState(null);
    const [branchIds, setBranchIds] = useState(null);
    const [searchType, setSearchType] = useState('basic');
    const [advOpts, setAdvOpts] = useState({});


    const pageNum = useRef(1);

    useEffect(() => {
        if (currencyId !== null){
            getPayments();
        }
    }, [currencyId]);

    useEffect(() => {
        getCurrency();
    }, [])

    useEffect(() => {
        getBranches();
    }, []);

    const getPayments = async () => {
        window.scrollTo(0, 0);
        document.title = 'Payments';
    };

    async function fetchPayments() {
        try {
            const url = getUrl();
            const response = searchType === 'basic' ? await makeRequest.get(url, {timeout: 8000}) : await makeRequest.post(url, {...advOpts, page_num: pageNum.current}, {timeout: 8000});
            if (response.ok) {
                const json_res = await response.json();
                setNextPageNumber(json_res.next_page_num);
                setLoadingMore(false);
                setSearching(false);
                return json_res;
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }
    
    async function fetchCurrency() {
        try {
          const response = await makeRequest.get('/usersapi/currencieslist/', {timeout: 8000});
          if (response.ok) {
            const data = await response.json();
            if (currencyId===null) {
              const zwlId = data.filter(currency => currency.shortname === 'ZWL')[0].id;
              setCurrencyId(zwlId);
            }
            return setCurrency([...data.map(result => ({...result, label: result.shortname, value:result.id}))]);
          }else {
            const error = await response.json();
            console.log(error);
          }
        }catch(error) {
          console.log(error);
        }
      }
    
    const getCurrency = async () => {
        await fetchCurrency();
    };

    const changeCurrency = (evt) => {
        setCurrencyId(evt.target.value);
        pageNum.current = 1;
    }

    const getBranches = async () => {
        const branches = await fetchBranches();
        setBranches(branches);
    };

    async function fetchBranches() {
        try {
            const response = await makeRequest.get('/usersapi/get-branches/', {timeout: 8000});
            if (response.ok) {
                const json_res = await response.json();
                console.log('json_res')
            return json_res.results;
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    function getUrl() {

        if (searchType === 'advanced') {
            return '/loansapi/advanced_search_payments/';
        }

        let url = `/loansapi/payments_list/?page_num=${pageNum.current}&currency_id=${currencyId}`;
        console.log(branchIds)
        if (branchIds !== null) {
            branchIds.forEach(id => (url += `&branch_ids=${id}`));
        }

        if (clientName !== '') {
          url += `&client_name=${clientName}`;
        }
        if (minDateCreated !== '') {
          url += `&min_date_created=${minDateCreated}`;
        }
        if (maxDateCreated !== '') {
          url += `&max_date_created=${maxDateCreated}`;
        }
        return url
    }

    const loadMore = async (evt) => {
        evt.preventDefault();
        setLoadingMore(true);
        pageNum.current += 1;
        const data = await fetchPayments();
        setPayments(curr => [...curr,...data.payments]);
    }
    
    const onSubmit = async (evt) => {
        evt.preventDefault();
        setSearching(true);
        pageNum.current = 1;
        const data = await fetchPayments();
        console.log(data)
        setTotalCount(data.count);
        setPayments(data.payments);
    }

    if (currency === null || branches === null) {
        return <MiniLoader />
    }

    return (
        <>
            {/* <div className='row-payments-container' style={{width: '200px', margin: '10px 0'}}>
                <select className='custom-select-form row-form' onChange={(e) => setSearchType(e.target.value)} value={searchType}>
                    <option value='basic'>Basic Search</option>
                    <option value='advanced'>Advanced Search</option>
                </select>
            </div> */}
            {searchType === 'advanced' ? <AdvancedSearchPayments details={details} branches={branches} setAdvOpts={setAdvOpts} onSubmit={onSubmit} /> :
                <PaymentsFilter
                    clientName={clientName}
                    setClientName={setClientName}
                    currency={currency}
                    currencyId={currencyId}
                    setCurrencyId={setCurrencyId}
                    minDateCreated={minDateCreated}
                    setMinDateCreated={setMinDateCreated}
                    maxDateCreated={maxDateCreated}
                    setMaxDateCreated={setMaxDateCreated}
                    onSubmit={onSubmit}
                    open ={open}
                    setOpen={setOpen}
                    setPayments={setPayments}
                    changeCurrency={changeCurrency}
                    searching={searching}
                    setSearching={setSearching}
                    branches={branches}
                    setBranchIds={setBranchIds}
                />
            }
            {payments != "" &&
                <>
                    <PaymentsList 
                        payments={payments} 
                        setPayments={setPayments}
                        details={details}
                        setDetails={setDetails}
                        selectedexp={payments.find(exp => exp.id == selectedExpID)}
                        setSelectedExpID={setSelectedExpID}
                        selectedExpID={selectedExpID}
                    />
                    <PaymentsFooter 
                        payments={payments} 
                        totalCount={totalCount} 
                        nextPageNumber={nextPageNumber}
                        loadMoreClients={loadMore}
                        loadingMore={loadingMore}
                    />
                </>
            }
            {payments == "" &&
                <div>
                    <div className="table-footer-container clients_table">

                        <div className="all-data-loaded" style={{marginTop:"1.5rem"}}>
                            <i className="uil uil-exclamation-triangle"></i> 
                            <span>No payments at the moment</span>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Payments;