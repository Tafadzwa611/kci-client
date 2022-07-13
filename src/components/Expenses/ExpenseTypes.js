import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
import { makeRequest } from '../../utils/utils';
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
        return <BankNamesSkeleton />;
    } 
    else {
        return (
            <div className="card font-12">
                <div className="card-body">
                    
                    <h5 className="table-heading">Expense Types</h5>
                    {/* <div style={{margin:"20px 0"}}>
                        <NavLink className="btn btn-success" to="/app/expenses/addexpensetype">Add Expense Type</NavLink><br/>
                    </div> */}
                    <CreateExpenseTypeModal open={open} setOpen={setOpen} setExpenseTypes={setExpenseTypes} />
                    <div style={{margin:"20px 0"}}>
                        <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)}>Add Expense Type</button>
                    </div>
                    <div className="table-responsive font-12">
                        <table className="table table-hover">
                            <tbody>
                                <tr className="bg-gray">
                                    <th>Name</th>
                                </tr>    
                                {expenseTypes.map((expense_type) => (
                                    <tr className="table-row" key={expense_type.id}>
                                        <td>{expense_type.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        );

    }
}

export default ExpenseTypes;