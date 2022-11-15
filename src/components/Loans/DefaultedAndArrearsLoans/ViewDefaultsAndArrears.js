import React, {useState, useEffect, useRef} from 'react';
import LoansTable from './LoansTable';
import Filter from './Filter';
import { makeRequest } from '../../../utils/utils';
import MiniLoader from '../../Loader/MiniLoader';


const ViewDefaultsAndArrears = () => {
    const [loans, setLoans] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [branches, setBranches] = useState(null);
    const [branchIds, setBranchIds] = useState(null);
    const [currencyId, setCurrencyId] = useState(null);
    const [currencies, setCurrencies] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [nextPageNumber, setNextPageNumber] = useState(null);
    const [status, setStatus] = useState(null);
    const pageNum = useRef(1);
    const isFirstRun = useRef(true);

    useEffect(() => {
        getBranchesAndCurrencies();
    }, []);

    const getBranchesAndCurrencies = async () => {
        await fetchCurrencies();
        const branches = await fetchBranches();
        setBranches(branches);
    }

    const getLoans = async () => {
        if (currencyId != null && isFirstRun.current) {
            isFirstRun.current = false;
        }
    }
    
    useEffect(() => {
        getLoans();
        setLoans([]);
    }, [currencyId, branchIds, status]);
    
    async function fetchLoans() {
        try {
            const url = getUrl();
            const response = await makeRequest.get(url, {timeout: 8000});
            if (response.ok) {
                const json_res = await response.json();
                setNextPageNumber(json_res.next_page_num);
                setLoading(false);
                setLoadingMore(false);
                return json_res;
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
    
    async function fetchBranches() {
        try {
        const response = await makeRequest.get('/usersapi/get-branches/', {timeout: 8000});
        if (response.ok) {
            const json_res = await response.json();
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
        let url = `/loansapi/defaulted_loans_list/?page_num=${pageNum.current}&currency_id=${currencyId}`
        if (branchIds !== null) {
            branchIds.forEach(id => (url += `&branch_ids=${id}`));
        }
        if (status !== null) {
            status.forEach(item => (url += `&status=${item}`));
        }
        return url
    }
    
    const onSubmit = async (evt) => {
        evt.preventDefault();
        setLoading(true);
        pageNum.current = 1;
        const data = await fetchLoans();
        setLoans(data.loans);
        setTotalCount(data.count);
    }
    
    const loadMore = async (evt) => {
        evt.preventDefault();
        setLoadingMore(true);
        pageNum.current += 1;
        const data = await fetchLoans();
        setLoans(curr => [...curr,...data.loans]);
    }
    
    if (currencies===null || branches===null) {
        return <MiniLoader />
    }

    return (
        <>
            <Filter
                currencies={currencies}
                currencyId={currencyId}
                branches={branches}
                loading={loading}
                setStatus={setStatus}
                setBranchIds={setBranchIds}
                setCurrencyId={setCurrencyId}
                onSubmit={onSubmit}
            />
            {loans.length != 0 &&
                <>
                    <div style={{paddingTop: '2rem'}}></div>
                    <LoansTable loans={loans} totalCount={totalCount} nextPageNumber={nextPageNumber} loadMoreLoans={loadMore} loadingMore={loadingMore}/>        
                </>
            }
            {loans.length == 0 &&
                <div>
                    <div className="table-footer-container card-body clients_table" style={{borderTop:"none"}}>

                        <div className="all-data-loaded">
                            <i className="uil uil-exclamation-triangle"></i> 
                            <span>No loans at the moment</span>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default ViewDefaultsAndArrears;