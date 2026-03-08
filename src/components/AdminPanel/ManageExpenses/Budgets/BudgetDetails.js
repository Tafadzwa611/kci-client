import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function BudgetDetails() {
  const params = useParams();
  const [budget, setBudget] = React.useState(null);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`/expensesapi/get_budget/${params.bdId}`);
      setBudget(response.data);
    }
    fetch();
  }, []);

  if (!budget) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className='search_background' style={{padding:'20px'}}>
        <div>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <>
              <button className='btn btn-olive'>
                <Link to={`/users/admin/manageexps/edit-budget/${budget.id}`}>
                  Edit
                </Link>
              </button>
              <button className='btn btn-olive'>
                <Link to={`/users/admin/manageexps/delete-budget/${budget.id}`}>
                  Delete
                </Link>
              </button>
            </>
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', marginTop:'1.5rem'}}>
          <div>
            <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
              <li>Month: {budget.month}</li>
              <li>Limit: {budget.currency.name} {budget.limit}</li>
              <li>Branch: {budget.branch.name}</li>
              <li>Date Created: {budget.date_created}</li>
              <li>Created By: {budget.created_by}</li>
              <li>
                Expense Account: {budget.expense_account.general_ledger_code} {budget.expense_account.general_ledger_name}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BudgetDetails;