import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MiniSolidarity({loanDetails, extra}) {
  const {setLoanDetails} = extra;
  const navigate = useNavigate();

  useEffect(() => {
    setLoanDetails(loanDetails);
  }, []);

  return (
    <div>
      {loanDetails.group_name}
      <button className='btn btn-olive' onClick={() => navigate({pathname: '/loans/viewloans', search: `?loan_id=${loanDetails.id}&loan_type=sol`})}>
        Max
      </button>
    </div>
  )
}

export default MiniSolidarity;