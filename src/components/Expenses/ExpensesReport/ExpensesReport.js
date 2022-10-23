import React, { useEffect, useState } from 'react';
import Tile from './Tile';
import { makeRequest } from '../../../utils/utils';
import AddExpensesReport from './AddExpensesReport';
import MiniLoader from '../../Loader/MiniLoader';

const ExpensesReport = () => {
    const [currencies, setCurrencies] = useState(null);
    const [expensesR, setExpensesR] = useState([]);
    const [branches, setBranches] = useState(null);
    const [openModal, setOpenModal] = useState(false);
  
    useEffect(() => {
        fetchCurrencies();
        fetchBranches();
    }, []);
  
    async function fetchCurrencies() {
        try {
            const response = await makeRequest.get('/usersapi/list_currencies/', {timeout: 8000});
            if (response.ok) {
                const data = await response.json();
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
                const data = await response.json();
                return setBranches([...data.results.map(result => ({...result, label: result.name, value:result.id}))]);
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }
  
    const showModal = (e) => {
        e.preventDefault();
        setOpenModal(true);
    }
  
    if (currencies===null || branches===null) {
        return (
            <MiniLoader />
        )
    }
  
    return (
        <>
            <AddExpensesReport
                open={openModal}
                setOpen={setOpenModal}
                setExpensesR={setExpensesR}
                branches={branches}
                setBranches={setBranches}
                currencies={currencies}
            />
            <>
                <div style={{paddingBottom: '40px'}}>
                    <a href='#' onClick={showModal} className='btn btn-success float-left'>
                    Add New
                    </a>
                </div>
                <div className='row'>
                    {expensesR.map((expenserpt, idx) => <Tile
                    key={idx}
                    total_expenses_count={expenserpt.total_expenses_count}
                    total_expenses_amount={expenserpt.total_expenses_amount}
                    expense_name={expenserpt.expense_name}
                    currencyIso={expenserpt.currencyIso}
                    currencyId={expenserpt.currencyId}
                    branches={branches.filter(branch => expenserpt.selectedBranchesIds.includes(branch.id))}
                    limits={expenserpt.limits}
                    />)}
                </div>
            </>
        </>
    )
}
  

export default ExpensesReport;