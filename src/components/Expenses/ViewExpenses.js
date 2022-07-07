import React, { useState, useEffect, useRef } from 'react';
import ExpenseList from './ExpenseList';
import Filter from './Filter';
import ExpenseFooter from './ExpenseFooter';
import { makeRequest } from '../../utils/utils';
import { async } from 'regenerator-runtime';


const ViewExpenses = () => {

    const [expenses, setExpenses] = useState([])
    const [nextPageNumber, setNextPageNumber] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [expName, setExpName] = useState('');
    const [minDateCreated, setMinDateCreated] = useState('');
    const [maxDateCreated, setMaxDateCreated] = useState('');
    const [loadingMore, setLoadingMore] = useState(false);
    const [open, setOpen] = useState(false);


    const pageNum = useRef(1);

    useEffect(() => {
        getExpenses()
    }, []);

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
                return json_res;
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    function getUrl() {
        let url = `/expensesapi/expenseslist/?page_num=${pageNum.current}`;
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
        pageNum.current += 1;
        const data = await fetchExpenses();
        setExpenses(curr => [...curr,...data.expenses]);
    }
    
    const onSubmit = async (evt) => {
        evt.preventDefault();
        pageNum.current = 1;
        const data = await fetchExpenses();
        console.log(data)
        setTotalCount(data.count);
        setExpenses(data.expenses);
    }

    return (
        <div className="font-12">
            <div className="card">
                <Filter
                    expName={expName}
                    setExpName={setExpName}
                    minDateCreated={minDateCreated}
                    setMinDateCreated={setMinDateCreated}
                    maxDateCreated={maxDateCreated}
                    setMaxDateCreated={setMaxDateCreated}
                    onSubmit={onSubmit}
                    open ={open}
                    setOpen={setOpen}
                    setExpenses={setExpenses}
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
                    />
                </div>
            }
            {expenses == "" &&
                <div className="card">
                    <div className="table-footer-container card-body clients_table">

                        <div className="all-data-loaded">
                            <i class="uil uil-exclamation-triangle"></i> 
                            <span>No expenses at the moment</span>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
}

export default ViewExpenses;