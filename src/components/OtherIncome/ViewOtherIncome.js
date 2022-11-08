import React, {useEffect, useRef, useState} from 'react';
import OtherIncomeList from './ViewOtherIncome/OtherIncomeList';
import Filter from './ViewOtherIncome/Filter';
import { makeRequest } from '../../utils/utils';
import OtherIncomeFooter from './ViewOtherIncome/OtherIncomeFooter';
import MiniLoader from '../Loader/MiniLoader';
import CreateOtherIncomeModal from './CreateOtherIncomeModal';
import AdvancedSearchOtherIncome from './ViewOtherIncome/AdvancedSearchOtherIncome/AdvancedSearchOtherIncome';


const ViewOtherIncome = () => {

    const [otherincomes, setOtherIncomes] = useState([])
    const [nextPageNumber, setNextPageNumber] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [othInName, setOthInName] = useState('');
    const [currency, setCurrency] = useState(null);
    const [currencyId, setCurrencyId] = useState(null);
    const [minDateCreated, setMinDateCreated] = useState('');
    const [maxDateCreated, setMaxDateCreated] = useState('');
    const [loadingMore, setLoadingMore] = useState(false);
    const [open, setOpen] = useState(false);
    const [searching, setSearching] = useState(false);
    const [details, setDetails] = useState(false)
    const [selectedIncID, setSelectedIncID] = useState(null)
    const [branches, setBranches] = useState(null);
    const [branchIds, setBranchIds] = useState(null);
    const [searchType, setSearchType] = useState('basic');
    const [advOpts, setAdvOpts] = useState({});


    const pageNum = useRef(1);

    useEffect(() => {
        if (currencyId !== null){
            getOtherIncomes();
        }
    }, [currencyId]);

    useEffect(() => {
        getCurrency();
    }, [])

    useEffect(() => {
        getBranches();
    }, []);

    const getOtherIncomes = async () => {
        window.scrollTo(0, 0);
        document.title = 'Other Income';
    };

    async function fetchOtherIncome() {
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
        window.scrollTo(0, 0);
        const branches = await fetchBranches();
        setBranches(branches);
    };

    async function fetchBranches() {
        try {
            const response = await makeRequest.get('/usersapi/get-branches/', {timeout: 6000});
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

        if (searchType === 'advanced') {
            return '/otherincomeapi/advanced_search_otherincomes/'
        }

        let url = `/otherincomeapi/otherincomelist/?page_num=${pageNum.current}&currency_id=${currencyId}`;
        if (branchIds !== null) {
            branchIds.forEach(id => (url += `&branch_ids=${id}`));
        }

        if (othInName !== '') {
          url += `&oth_name=${othInName}`;
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
        const data = await fetchOtherIncome();
        setOtherIncomes(curr => [...curr,...data.otherincomes]);
    }
    
    const onSubmit = async (evt) => {
        evt.preventDefault();
        setSearching(true);
        pageNum.current = 1;
        const data = await fetchOtherIncome();
        console.log(data)
        setTotalCount(data.count);
        setOtherIncomes(data.otherincomes);
    }

    if (currency === null || branches === null) {
        return (
            <div>
                <MiniLoader />
            </div>
        )
    }

    return (
        <div className="font-12">
            <>
                <CreateOtherIncomeModal open={open} setOpen={setOpen} setOtherIncomes={setOtherIncomes} />
                <div style={{marginBottom:"1.5rem"}}>
                    <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)}>Add Other Income</button>
                </div>
                <div className='row-payments-container' style={{width: '200px', margin: '10px 0'}}>
                    <select className='custom-select-form row-form' onChange={(e) => setSearchType(e.target.value)} value={searchType}>
                        <option value='basic'>Basic Search</option>
                        <option value='advanced'>Advanced Search</option>
                    </select>
                </div>
                {searchType === 'advanced' ? <AdvancedSearchOtherIncome details={details} branches={branches} setAdvOpts={setAdvOpts} onSubmit={onSubmit} /> :
                    <Filter
                        othInName={othInName}
                        setOthInName={setOthInName}
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
                        setOtherIncomes={setOtherIncomes}
                        changeCurrency={changeCurrency}
                        searching={searching}
                        setSearching={setSearching}
                        branches={branches}
                        setBranchIds={setBranchIds}
                        details={details}
                    />
                }
            </>
            {otherincomes != "" &&
                <>
                    <OtherIncomeList 
                        otherincomes={otherincomes} 
                        setOtherIncomes={setOtherIncomes}
                        totalCount={totalCount}
                        details={details}
                        setDetails={setDetails}
                        selectedinc={otherincomes.find(inc => inc.id == selectedIncID)}
                        setSelectedIncID={setSelectedIncID}
                        selectedIncID={selectedIncID}
                    />
                    <OtherIncomeFooter 
                        otherincomes={otherincomes} 
                        totalCount={totalCount} 
                        nextPageNumber={nextPageNumber}
                        loadMoreClients={loadMore}
                        loadingMore={loadingMore}
                    />
                </>
            }
            {otherincomes == "" &&
                <div style={{marginTop:"1.5rem"}}>
                    <div className="table-footer-container clients_table" style={{borderTop:"none"}}>

                        <div className="all-data-loaded">
                            <i className="uil uil-exclamation-triangle"></i> 
                            <span>No other income at the moment</span>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
}

export default ViewOtherIncome;