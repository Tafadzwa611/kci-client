import React, { useEffect, useState } from 'react';

function ExpenseDetails({expenseDetails}) {

  useEffect(() => {
    const element = document.getElementById('loan-details');
    element.scrollIntoView({ behavior: 'instant' });
  }, []);


  return (
    <div id='loan-details'>
      <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
        <div className="row" style={{marginBottom:"1.5rem", marginTop:"0"}}>
          <div className="col-12" style={{display:"flex", justifyContent:"space-between"}}>
            <button><a onClick={console.log('delete')} className="btn btn-default" style={{borderRadius:"0"}}>Back</a></button>
            <button><a className="btn btn-olive" id="delete" value={expenseDetails.id} onClick={console.log('delete')}>Delete</a></button>
          </div>
          </div>
          <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <div style={{width:"30%"}}>
              <ul>
                  <li>Expense Name: {expenseDetails.expense_name}</li>
                  <li>Expense Type: {expenseDetails.expense_type}</li>
                  <li>Expense Amount: {expenseDetails.currency} {expenseDetails.expense_amount}</li>
              </ul>
            </div>
            <div style={{width:"30%", display:"flex", alignItems:"start", justifyContent:"center"}}>
              <ul>
                  <li>Reference: {expenseDetails.reference}</li>
                  <li>Date Created: {expenseDetails.date_created}</li>
                  <li>Created By: {expenseDetails.created_by}</li>
              </ul>
            </div>
            <div style={{width:"30%", display:"flex", alignItems:"start", justifyContent:"end"}}>
              <ul>
                  <li>Expense Date: {expenseDetails.expense_date}</li>
                  <li>Description: {expenseDetails.description}</li>
              </ul>
            </div>
          </div>
      </div>
    </div>
  )
}

export default ExpenseDetails;