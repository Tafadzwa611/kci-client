import React from 'react';
import Expense from './Expense';

const ExpenseList = () => {

    var expenses = [
        {expense_type:'Administration expenses',  expense_name:'GTEL PHONE',expense_date:'07/12/21', date_added:'07/12/21', expense_amount:'ZWL 1000', reference:'None', id:'1'},
        {expense_type:'Administration expenses',  expense_name:'nokia handsets',expense_date:'07/12/21', date_added:'07/12/21', expense_amount:'ZWL 1000', reference:'None', id:'2'},
        {expense_type:'Travel',  expense_name:'PRINTER',expense_date:'07/12/21', date_added:'07/12/21', expense_amount:'ZWL 1000', reference:'None', id:'3'},
        {expense_type:'Travel',  expense_name:'COMPUTER',expense_date:'07/12/21', date_added:'07/12/21', expense_amount:'ZWL 1000', reference:'None', id:'4'},
        {expense_type:'Administration expenses',  expense_name:'COMPUTER',expense_date:'07/12/21', date_added:'07/12/21', expense_amount:'ZWL 1000', reference:'None', id:'5'},
        {expense_type:'Administration expenses',  expense_name:'COMPUTER',expense_date:'07/12/21', date_added:'07/12/21', expense_amount:'ZWL 1000', reference:'None', id:'6'},
        {expense_type:'Travel',  expense_name:'COMPUTER', expense_date:'07/12/21', date_added:'07/12/21', expense_amount:'ZWL 1000', reference:'None', id:'7'},
        {expense_type:'Travel',  expense_name:'COMPUTER', expense_date:'07/12/21', date_added:'07/12/21', expense_amount:'ZWL 1000', reference:'None', id:'8'},
        {expense_type:'Travel',  expense_name:'COMPUTER', expense_date:'07/12/21', date_added:'07/12/21', expense_amount:'ZWL 1000', reference:'None', id:'9'},
        {expense_type:'Travel',  expense_name:'COMPUTER', expense_date:'07/12/21', date_added:'07/12/21', expense_amount:'ZWL 1000', reference:'None', id:'10'}
    ];

    return (
        <div className='table-responsive font-12'>
            <table className='table table-centered table-hover'>
                <thead className="thead-light">
                    <tr>
                        <th style={{textAlign:"start"}}>Expense_Type</th>
                        <th style={{textAlign:"start"}}>Expense_Name</th>
                        <th style={{textAlign:"start"}}>Expense_Date</th>
                        <th style={{textAlign:"start"}}>Date_Created</th>
                        <th style={{textAlign:"start"}}>Expense_Amount</th>
                        <th style={{textAlign:"start"}}>Reference</th>
                        <th style={{textAlign:"start"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => (
                        <Expense 
                            key={expense.id} 
                            expense_type={expense.expense_type}
                            expense_name={expense.expense_name}
                            expense_date={expense.expense_date} 
                            date_added={expense.date_added} 
                            expense_amount={expense.expense_amount}
                            reference={expense.reference}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ExpenseList;