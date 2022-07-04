import React from 'react';
import Expense from './Expense';

const ExpenseList = (props) => {
    return (
        <div>
            <div style={{display:"flex", flexDirection:"row", padding:"1.5rem", width:"100%"}}>
                <div style={{textAlign:"center", width:"16.66%"}}>Expense_Type</div>
                <div style={{textAlign:"center", width:"16.66%"}}>Expense_Name</div>
                <div style={{textAlign:"center", width:"16.67%"}}>Expense_Date</div>
                <div style={{textAlign:"center", width:"16.67%"}}>Date_Created</div>
                <div style={{textAlign:"center", width:"16.67%"}}>Expense_Amount</div>
                <div style={{textAlign:"center", width:"16.67%"}}>Action</div>
            </div>
            <div>
                {props.expenses.map((expense) => (
                    <Expense expense={expense} key={expense.id} setExpenses={props.setExpenses}/>
                ))}
            </div>
        </div>
    );
}

export default ExpenseList;