import React, { useEffect } from 'react';

function ExpenseDetails({expenseDetails}) {

  useEffect(() => {
    const element = document.getElementById('loan-details');
    element.scrollIntoView({ behavior: 'instant' });
  }, []);


  return (
    <div id='loan-details'>
      <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <div style={{width:"30%"}}>
            <ul>
                <li>Expense Name: {expenseDetails.expense_name}</li>
                <li>Expense Type: {expenseDetails.exp_type}</li>
                <li>Expense Amount: {expenseDetails.currency_code} {expenseDetails.expense_amount}</li>
            </ul>
          </div>
          <div style={{width:"30%", display:"flex", alignItems:"start", justifyContent:"center"}}>
            <ul>
                <li>Reference: {expenseDetails.reference}</li>
                <li>Date Created: {expenseDetails.db_date_created}</li>
                <li>Created By: {expenseDetails.created_by_username}</li>
            </ul>
          </div>
          <div style={{width:"30%", display:"flex", alignItems:"start", justifyContent:"end"}}>
            <ul>
                <li>Expense Date: {expenseDetails.db_expense_date}</li>
                <li>Description: {expenseDetails.description}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpenseDetails;