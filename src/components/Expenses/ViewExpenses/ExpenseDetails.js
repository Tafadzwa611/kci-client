import React from 'react';
import PayExpense from './PayExpense';
import axios from 'axios';
import DeleteExpense from './DeleteExpense';


function ExpenseDetails({expenseId}) {
  const [deleteExpense, setDeleteExpense] = React.useState(false);
  const [payExpense, setPayExpense] = React.useState(false);
  const [expense, setExpense] = React.useState(null);

  React.useEffect(() => {
    async function fetchExpense() {
      try {
        const response = await axios.get(`/expensesapi/get_expense/${expenseId}/`);
        setExpense(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchExpense();
  }, []);

  if (!expense) {
    return <div>Loading...</div>
  }

  return (
    <div id='loan-details'>
      {payExpense && (
        <PayExpense
          expense={expense}
          setExpense={setExpense}
          setOpen={setPayExpense}
        />
      )}
      {deleteExpense && (
        <DeleteExpense
          setOpen={setDeleteExpense}
          expense={expense}
        />
      )}
      <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
        <div className='row' style={{marginBottom:'1.5rem', marginTop:'0'}}>
          <div className='col-12' style={{display:'flex', justifyContent:'space-between'}}>
            <div className='row' style={{marginBottom: '1rem', marginTop: '0', display: 'flex', justifyContent: 'flex-end', columnGap: '5px'}}>
              <button className='btn btn-olive' onClick={() => setDeleteExpense(true)}>Delete</button>
              {expense.status === 2 && (
                <button className='btn btn-olive' onClick={() => setPayExpense(true)}>
                  Pay
                </button>
              )}
            </div>
          </div>
        </div>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <div style={{width:'30%'}}>
            <ul>
              <li>Branch: {expense.branch_name}</li>
              {expense.status === 1 ? (
                <li>
                  Status: <span className="badge badge-success">Paid</span>
                </li>
                ) : (
                <li>
                  Status: <span className="badge badge-danger">Unpaid</span>
                </li>
              )}
              <li>Expense Name: {expense.expense_name}</li>
              <li>Expense Type: {expense.exp_type}</li>
              <li>Expense Amount: {expense.currency_code} {expense.expense_amount}</li>
              <li>
                Expense Account: {expense.expense_account.general_ledger_code} {expense.expense_account.general_ledger_name}
              </li>
              {expense.fund_account && (
                <li>
                  Fund Account: {expense.fund_account.general_ledger_code} {expense.fund_account.general_ledger_name}
                </li>
              )}
              {expense.payable_account && (
                <li>
                  Fund Account: {expense.payable_account.general_ledger_code} {expense.payable_account.general_ledger_name}
                </li>
              )}
            </ul>
          </div>
          <div style={{width:"30%", display:"flex", alignItems:"start", justifyContent:"center"}}>
            <ul>
              <li>Reference: {expense.reference}</li>
              <li>Date Created: {expense.db_date_created}</li>
              <li>Created By: {expense.created_by_username}</li>
            </ul>
          </div>
          <div style={{width:"30%", display:"flex", alignItems:"start", justifyContent:"end"}}>
            <ul>
              <li>Expense Date: {expense.db_expense_date}</li>
              <li>Description: {expense.description}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpenseDetails;