import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteExpense from './DeleteExpense';
import PayExpense from './PayExpense';
import axios from 'axios';


function MiniExpenseDetails({expenseId, setExpenseId, setExpenseData}) {
  const [deleteExpense, setDeleteExpense] = React.useState(false);
  const [payExpense, setPayExpense] = React.useState(false);
  const [expenseDetails, setExpenseDetails] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchExpense() {
      try {
        const response = await axios.get(`/expensesapi/get_expense/${expenseId}/`);
        setExpenseDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchExpense();
  }, []);

  if (!expenseDetails) {
    return <div>Loading...</div>
  }

  return (
    <div style={{position:"sticky", top:"0", width:"100%"}}>
      {deleteExpense && (
        <DeleteExpense
          setOpen={setDeleteExpense}
          expense={expenseDetails}
          setExpenseId={setExpenseId}
          setExpenseData={setExpenseData}
        />
      )}
      {payExpense && (
        <PayExpense
          expense={expenseDetails}
          setExpense={setExpenseDetails}
          setOpen={setPayExpense}
        />
      )}
      <div style={{display: "flex", flexDirection: "column", padding: "1.5rem"}} className="j-details-container">
        <div className="row" style={{marginBottom: "1rem", marginTop: "0"}}>
          <div className="col-12" style={{display: "flex", justifyContent: "space-between"}}>
            <button><a onClick={() => setExpenseId(null)} className="btn btn-default client__details" style={{borderRadius:"0"}}>Close</a></button>
            <button className='btn btn-default client__details' onClick={() => navigate({pathname: '/expenses/viewexpenses', search: `?expense_id=${expenseDetails.id}`})}>
              Max
            </button>
          </div>
        </div>
        <div className="row" style={{marginBottom: "1rem", marginTop: "0", display: "flex", justifyContent: "flex-end"}}>
          <button className="btn btn-olive" onClick={() => setDeleteExpense(true)}>Delete</button>
        </div>
        {expenseDetails.status === 2 && (
          <div className="row" style={{marginBottom:"1rem", marginTop:"0", display:"flex", justifyContent:"flex-end"}}>
            <button className="btn btn-olive" onClick={() => setPayExpense(true)}>Pay</button>
          </div>
        )}
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <div style={{width:"30%"}}>
            <ul>
                <li>Branch: {expenseDetails.branch_name}</li>
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