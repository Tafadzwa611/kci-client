import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { removeEmptyValues, getParams } from '../../../utils/utils';
import Loader from '../../Loader/MiniLoader';
import { useCurrencies } from '../../../contexts/CurrenciesContext';

function LoanBook({currencyId, branchIds, unitId}) {
  const [loanBook, setLoanBook] = useState(null);
  const [err, setErr] = useState(false);
  const {currencies} = useCurrencies();
  const currency = currencies.find(currency => currency.id === currencyId);

  useEffect(() => {
    getData();
  }, [currencyId, branchIds, unitId]);

  const getData = async () => {
    try {
      const data = removeEmptyValues({currency_id: currencyId, branch_ids: branchIds, unit_id: unitId});
      const params = getParams(data);
      const response = await axios.get('/dashboardapi/dashboard-loan-book/', {params: params});
      setLoanBook(response.data);
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  }

  if (err) {
    return (
      <div className='card-body'>
        <div className='book-value-section'>
          Error Please Try Again.
        </div>
      </div>
    )
  }

  if (!loanBook) {
    return (
      <div className='card-body'>
        <div className='book-value-section'>
          <Loader/>
        </div>
      </div>
    )
  }

  return (
    <div className='card-body'>
      <div className='book-value-section'>
        <div className='book-value-update-section'>
          <div className='book-value-info-box loan__book'>
            <p className='dashboard-section-title'>Loan Book Value</p>
            <p><span className='dashboard__text'>{currency.shortname} {loanBook.principal_balance}</span> (P)</p>
            <p><span className='dashboard__text'>{currency.shortname} {loanBook.principal_interest_balance}</span> (P+I)</p>
            <p><span className='dashboard__text'>{currency.shortname} {loanBook.principal_interest_penalty_balance}</span> (P+I+P)</p>
            <p><span className='dashboard__text'>{currency.shortname} {loanBook.principal_interest_penalty_fees_balance}</span> (P+I+P+F)</p>
          </div>
          <div className='book-value-info-box loan__book'>
            <p className='dashboard-section-title'>Loan Book Value Categories (P)</p>
            <p><span className='dashboard__text'>{currency.shortname} {loanBook.principal_balance_of_open_loans}</span> (Open)</p>
            <p><span className='dashboard__text'>{currency.shortname} {loanBook.principal_balance_of_arrears_loans}</span> (Arrears)</p>
          </div>
          <div className='book-value-info-box loan__book'>
            <p className='dashboard-section-title'>Loan Book Value Categories (P+I)</p>
            <p><span className='dashboard__text'>{currency.shortname} {loanBook.principal_interest_balance_of_open_loans}</span> (Open)</p>
            <p><span className='dashboard__text'>{currency.shortname} {loanBook.principal_interest_balance_of_arrears_loans}</span> (Arrears)</p>
          </div>
          <div className='book-value-info-box loan__book'>
            <p className='dashboard-section-title'>Loan Book Categories Count</p>
            <p><span className='dashboard__text'>{loanBook.num_of_open_loans}</span> (Open)</p>
            <p><span className='dashboard__text'>{loanBook.num_of_arrears_loans}</span> (Arrears)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoanBook;