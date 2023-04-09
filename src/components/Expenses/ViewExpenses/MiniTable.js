import React from 'react';

function MiniTable({expenseData, handleClick, selectedExpenseId}) {
  const {expenses, count} = expenseData;

  return (
    <>
      <div className='table-header'>
        <div>
          Showing {expenses.length} of {count} expenses.
        </div>
      </div>
      <div style={{display:'block'}}>
        <div style={{padding:'0', border:'none'}}>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div className='table__height'>
              <table className='table' id='loans'>
                <thead>
                  <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                    <th>Expense_Type</th>
                    <th>Expense_Name</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map(expense => {
                    return (
                      <tr className='tr-class' key={expense.id}>
                        <td>
                          {(selectedExpenseId==expense.id) ?
                            <span onClick={handleClick} id={expense.id} style={{fontSize:'0.75rem', cursor:'pointer', color: 'red'}} className='link'>{expense.expense_name}</span>:
                            <span onClick={handleClick} id={expense.id} style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>{expense.expense_name}</span>
                          }
                        </td>
                        <td>
                            {expense.expense_type}
                        </td>
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

export default MiniTable;