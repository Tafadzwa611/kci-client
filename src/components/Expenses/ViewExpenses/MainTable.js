import React from 'react';

function MainTable({expenseData, handleClick}) {
  const { expenses } = expenseData;

  return (
    <>
      <div style={{display:'block'}}>
        <div style={{padding:'0', border:'none'}}>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div className='table__height'>
              <table className='table' id='loans'>
                <thead>
                  <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                    <th style={{textAlign:"start"}}>Branch</th>
                    <th style={{textAlign:"start"}}>Expense_Type</th>
                    <th style={{textAlign:"start"}}>Expense_Name</th>
                    <th style={{textAlign:"start"}}>Expense_Date</th>
                    <th style={{textAlign:"start"}}>Date_Captured</th>
                    <th style={{textAlign:"start"}}>Currency</th>
                    <th style={{textAlign:"start"}}>Expense_Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map(expense => {
                    return (
                      <tr key={expense.id}>
                        <td style={{verticalAlign:"middle"}}>{expense.branch_name}</td>
                        <td style={{verticalAlign:"middle"}}>{expense.exp_type}</td>
                        <td style={{verticalAlign:"middle"}}><span onClick={handleClick} id={expense.id} style={{fontSize:"0.75rem", cursor:"pointer"}} className="link">{expense.expense_name}</span></td>
                        <td style={{verticalAlign:"middle"}}>{expense.db_expense_date}</td>
                        <td style={{verticalAlign:"middle"}}>{expense.db_date_created}</td>
                        <td style={{verticalAlign:"middle"}}>{expense.currency_code}</td>
                        <td style={{verticalAlign:"middle"}}>{expense.expense_amount}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainTable;