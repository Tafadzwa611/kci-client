import React, { useState, useEffect } from 'react';
import { Fetcher } from '../../common';
import { makeRequest } from '../../utils/utils';
import MiniLoader from '../Loader/MiniLoader';
import CreateExpenseTypeModal from './CreateExpenseTypeModal';

const ExpenseTypes = () => {
    return (
        <Fetcher urls={['/expensesapi/expensetypeslist/', '/usersapi/currencieslist/']}>
            {({data}) => <List data={data[0]} currencies={data[1]}/>}
        </Fetcher>
    );
}

export default ExpenseTypes;


function List({data, currencies}) {
    const [open, setOpen] = useState(false);
    const [expenseTypes, setExpenseTypes] = useState(data);
    return (
        <>
            <CreateExpenseTypeModal open={open} setOpen={setOpen} setExpenseTypes={setExpenseTypes} currencies={currencies} />
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
    )
}



