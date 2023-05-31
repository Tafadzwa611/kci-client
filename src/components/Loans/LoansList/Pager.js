import React, { useState } from 'react';
import axios from 'axios';

const Pager = ({
  prevPageNumber,
  nextPageNumber,
  setLoanData,
  params
}) => {
  const [errors, setErrors] = useState(null);

  const onClick = async (evt) => {
    try {
      const pageNum = evt.target.innerText === 'Next' ? nextPageNumber : prevPageNumber;
      params.set('page_num', pageNum);
      const response = await axios.get('/loansapi/loan_list/', {params: params});
      setLoanData(response.data);
    } catch (error) {
      if (error.message === 'Network Error') {
        setErrors({detail: 'Network Error'});
      } else {
        setErrors({detail: 'Server Error'});
      }
    }
  }

  return (
    <div className='footer-container font-12 text-light'>
      {errors && JSON.stringify(errors)}
      {prevPageNumber && <><button onClick={onClick}>Back</button><br/></>}
      {nextPageNumber && <button onClick={onClick}>Next</button>}
    </div>
  )
}

export default Pager;