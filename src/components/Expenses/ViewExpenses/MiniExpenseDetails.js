import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MiniExpenseDetails({expenseDetails, extra}) {
  const {setExpenseDetails} = extra;
  const navigate = useNavigate();

  useEffect(() => {
    setExpenseDetails(expenseDetails);
  }, []);

  return (
    <div>
      {expenseDetails.id}
      <button className='btn btn-olive' onClick={() => navigate({pathname: '/expenses/viewexpenses', search: `?expense_id=${expenseDetails.id}`})}>
        Max
      </button>
    </div>
  )
}

export default MiniExpenseDetails;