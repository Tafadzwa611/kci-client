import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
import { makeRequest } from '../../utils/utils';
import MiniLoader from '../Loader/MiniLoader';
import BankNamesSkeleton from '../Skeletons/Charts/BankNamesSkeleton';
import CreateExpenseTypeModal from './CreateExpenseTypeModal';

const ExpenseTypes = () => {

    const [expenseTypes, setExpenseTypes] = useState([])
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getExpenseTypes()
    }, []);

    const getExpenseTypes = async () => {
        window.scrollTo(0, 0);
        document.title = 'Expense Types';
        const data = await fetchExpenseTypes();
        setExpenseTypes(data);
    };

    async function fetchExpenseTypes() {
        try {
            const response = await makeRequest.get(`/expensesapi/expensetypeslist/`, {timeout: 8000});
            if (response.ok) {
                const expense_types = await response.json();
                return expense_types;
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    if (expenseTypes == null) {
        return <MiniLoader />;
    } 
    else {
        return (
            <>
                <CreateExpenseTypeModal open={open} setOpen={setOpen} setExpenseTypes={setExpenseTypes} />
                <div style={{margin:"20px 0"}}>
                    <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)}>Add Expense Type</button>
                </div>
                <div className="table-responsive font-12">
                    <table className="table">
                        <tbody>
                            <tr className="journal-details header">
                                <th>Name</th>
                            </tr>    
                            {expenseTypes.map((expense_type) => (
                                <tr className="table-row" key={expense_type.id}>
                                    <td>{expense_type.name}</td>
                                </tr>
                            ))}
                            {expenseTypes == "" && 
                                <tr style={{display:"flex", justifyContent:"center"}}>
                                    <td>No data available.</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </>
        );

    }
}

export default ExpenseTypes;