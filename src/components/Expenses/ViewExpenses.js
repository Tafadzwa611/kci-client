import React, { useState, useEffect, useRef } from 'react';
import ExpenseList from './ExpenseList';
import Filter from './Filter';
import ExpenseFooter from './ExpenseFooter';
import { makeRequest } from '../../utils/utils';
import DisbursementReportSkeleton from '../Skeletons/Charts/DisbursementReportSkeleton';
import { async } from 'regenerator-runtime';


const ViewExpenses = () => {

    const [expenses, setExpenses] = useState([])
    const [nextPageNumber, setNextPageNumber] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [expName, setExpName] = useState('');
    const [currency, setCurrency] = useState(null);
    const [currencyId, setCurrencyId] = useState(null);
    const [minDateCreated, setMinDateCreated] = useState('');
    const [maxDateCreated, setMaxDateCreated] = useState('');
    const [loadingMore, setLoadingMore] = useState(false);
    const [open, setOpen] = useState(false);
    const [searching, setSearching] = useState(false);


    const pageNum = useRef(1);

    useEffect(() => {
        if (currencyId !== null){
            getExpenses();
        }
    }, [currencyId]);

    useEffect(() => {
        getCurrency();
    }, [])

    const getExpenses = async () => {
        window.scrollTo(0, 0);
        document.title = 'Expenses';
        const data = await fetchExpenses();
        setExpenses(data.expenses);
        setTotalCount(data.count);
    };

    async function fetchExpenses() {
        try {
            const url = getUrl();
            const response = await makeRequest.get(url, {timeout: 8000});
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

    function getUrl() {

        let url = `/expensesapi/expenseslist/?page_num=${pageNum.current}&currency_id=${currencyId}`;

        if (expName !== '') {
          url += `&exp_name=${expName}`;
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
        const data = await fetchExpenses();
        setExpenses(curr => [...curr,...data.expenses]);
    }
    
    const onSubmit = async (evt) => {
        evt.preventDefault();
        setSearching(true);
        pageNum.current = 1;
        const data = await fetchExpenses();
        console.log(data)
        setTotalCount(data.count);
        setExpenses(data.expenses);
    }

    if (currency === null) {
        return <DisbursementReportSkeleton />
    }

    return (
        <div className="font-12">
            <div className="card">
                <Filter
                    expName={expName}
                    setExpName={setExpName}
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
                    setExpenses={setExpenses}
                    changeCurrency={changeCurrency}
                    searching={searching}
                    setSearching={setSearching}
                />
            </div>
            {expenses != "" &&
                <div className="card">
                    <ExpenseList 
                        expenses={expenses} 
                        setExpenses={setExpenses}
                        totalCount={totalCount}
                    />
                    <ExpenseFooter 
                        expenses={expenses} 
                        totalCount={totalCount} 
                        nextPageNumber={nextPageNumber}
                        loadMoreClients={loadMore}
                        loadingMore={loadingMore}
                    />
                </div>
            }
            {expenses == "" &&
                <div className="card">
                    <div className="table-footer-container card-body clients_table">

                        <div className="all-data-loaded">
                            <i className="uil uil-exclamation-triangle"></i> 
                            <span>No expenses at the moment</span>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
}

export default ViewExpenses;