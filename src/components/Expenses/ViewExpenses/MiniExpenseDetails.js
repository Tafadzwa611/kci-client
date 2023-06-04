import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteExpense from './DeleteExpense';

function MiniExpenseDetails({expenseDetails, extra}) {
  const [deleteExpense, setDeleteExpense] = useState(false);
  const {setExpenseDetails, setExpenseId, setEpenseData} = extra;
  const navigate = useNavigate();

  useEffect(() => {
    setExpenseDetails(expenseDetails);
  }, []);

  return (
    <div style={{position:"sticky", top:"0", width:"100%"}}>
      {deleteExpense && <DeleteExpense setOpen={setDeleteExpense} expenseID={expenseDetails.id} setEpenseData={setEpenseData} setExpenseId={setExpenseId} />}
      <div style={{display:"flex", flexDirection:"column", padding:"1.5rem"}} className="j-details-container">

        <div className="row" style={{marginBottom:"1rem", marginTop:"0"}}>
            <div className="col-12" style={{display:"flex", justifyContent:"space-between"}}>
              <button><a onClick={e => setExpenseId(null)} className="btn btn-default" style={{borderRadius:"0"}}>Close</a></button>
              <button className='btn btn-default' onClick={() => navigate({pathname: '/expenses/viewexpenses', search: `?expense_id=${expenseDetails.id}`})}>
                Max
              </button>
            </div>
        </div>
        <div className="row" style={{marginBottom:"1rem", marginTop:"0", display:"flex", justifyContent:"flex-end"}}>
          <button className="btn btn-olive" onClick={() => setDeleteExpense(true)}>Delete</button>
        </div>
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

export default MiniExpenseDetails;