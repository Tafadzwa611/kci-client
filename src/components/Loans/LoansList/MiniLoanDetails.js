import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MiniLoanDetails({loanDetails, extra}) {
  const {setLoanDetails} = extra;
  const navigate = useNavigate();

  useEffect(() => {
    setLoanDetails(loanDetails);
  }, []);

  return (
    <div>
      {loanDetails.loan.loan_id}
      <button className='btn btn-olive' onClick={() => navigate({pathname: '/loans/viewloans', search: `?loan_id=${loanDetails.loan.id}`})}>
        Max
      </button>
    </div>
  )
}

export default MiniLoanDetails;