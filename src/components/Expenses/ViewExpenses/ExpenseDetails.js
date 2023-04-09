import React, { useEffect } from 'react';

function ExpenseDetails({expenseDetails}) {
  console.log(expenseDetails)

  useEffect(() => {
    const element = document.getElementById('loan-details');
    element.scrollIntoView({ behavior: 'instant' });
  }, []);


  return (
    <div id='loan-details'>
      <div style={{position:'sticky', top:'0', width:'100%'}}>
        <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
          <div style={{display:'flex', alignItems:'center', columnGap:'1rem'}}>
            <span>Expense Details</span>
            <span>{expenseDetails.expense_name}</span>
          </div>
          <div style={{display:'flex', columnGap:'3px'}}>
        <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
          <button className='btn btn-olive' onClick={(e) => console.log(e)}>Delete</button>
        </div>
      </div>
        </div>
      </div>
    </div>
  )
}

export default ExpenseDetails;