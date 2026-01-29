import React from 'react';

function ExpenseDetails({expenseDetails}) {
  React.useEffect(() => {
    const element = document.getElementById('loan-details');
    element.scrollIntoView({ behavior: 'instant' });
  }, []);

  return (
    <div id='loan-details'>
      <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
        <div className='row' style={{marginBottom:'1.5rem', marginTop:'0'}}>
          <div className='col-12' style={{display:'flex', justifyContent:'space-between'}}>
            <div style={{display:'flex', columnGap: '5px'}}>
              {expenseDetails.status == 1 ? (
                <button className='btn btn-olive' onClick={() => console.log('pay')}>
                  Reverse Payment
                </button>
                ) : (
                <button className='btn btn-olive' onClick={() => console.log('pay')}>
                  Pay
                </button>
              )}
            </div>
          </div>
        </div>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <div style={{width:"30%"}}>
            <ul>
              {expenseDetails.status == 1 ? (
                <li>
                  Status: <span className="badge badge-success">Paid</span>
                </li>
                ) : (
                <li>
                  Status: <span className="badge badge-danger">Unpaid</span>
                </li>
              )}
              <li>Expense Name: {expenseDetails.expense_name}</li>
              <li>Expense Type: {expenseDetails.exp_type}</li>
              <li>Expense Amount: {expenseDetails.currency_code} {expenseDetails.expense_amount}</li>
              <li>
                Expense Account: {expenseDetails.expense_account.general_ledger_code} {expenseDetails.expense_account.general_ledger_name}
              </li>
              {expenseDetails.fund_account && (
                <li>
                  Fund Account: {expenseDetails.fund_account.general_ledger_code} {expenseDetails.fund_account.general_ledger_name}
                </li>
              )}
              {expenseDetails.payable_account && (
                <li>
                  Fund Account: {expenseDetails.payable_account.general_ledger_code} {expenseDetails.payable_account.general_ledger_name}
                </li>
              )}
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