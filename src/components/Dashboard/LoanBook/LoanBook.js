import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { removeEmptyValues, getParams } from '../../../utils/utils';
import Loader from '../../Loader/loader';
import { useCurrencies } from '../../../contexts/CurrenciesContext';

function LoanBook({currencyId, branchIds}) {
  const [loanBook, setLoanBook] = useState(null);
  const [err, setErr] = useState(false);
  const {currencies} = useCurrencies();
  const currency = currencies.find(currency => currency.id === currencyId);

  useEffect(() => {
    getData();
  }, [currencyId, branchIds]);

  const getData = async () => {
    try {
      const data = removeEmptyValues({currency_id: currencyId, branch_ids: branchIds});
      const params = getParams(data);
      const response = await axios.get('/dashboardapi/dashboard-loan-book/', {params: params});
      setLoanBook(response.data);
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  }

  if (!loanBook) {
    return (
      <div className='card'>
        <div className='card-body'>
          <div className='book-value-section'>
            <Loader/>
          </div>
        </div>
      </div>
    )
  }

  if (err) {
    return (
      <div className='card'>
        <div className='card-body'>
          <div className='book-value-section'>
            Error Please Try Again.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='book-value-section'>
          <div className='book-value-update-section'>
            <div className='book-value-info-box'>
              <p className='dashboard-section-title'>Loan Book Value</p>
              <p className='dashboard-section-amount-or-number'>{currency.shortname} {loanBook.principal_balance} (P)</p>
              <p className='dashboard-section-amount-or-number'>{currency.shortname} {loanBook.principal_interest_balance} (P+I)</p>
            </div>
            <div className='book-value-info-box'>
              <p className='dashboard-section-title'>Loan Book Value Categories (P)</p>
              <p className='dashboard-section-amount-or-number'>{currency.shortname} {loanBook.principal_balance_of_open_loans} (Open)</p>
              <p className='dashboard-section-amount-or-number'>{currency.shortname} {loanBook.principal_balance_of_arrears_loans} (Arrears)</p>
            </div>
            <div className='book-value-info-box'>
              <p className='dashboard-section-title'>Loan Book Value Categories (P+I)</p>
              <p className='dashboard-section-amount-or-number'>{currency.shortname} {loanBook.principal_interest_balance_of_open_loans} (Open)</p>
              <p className='dashboard-section-amount-or-number'>{currency.shortname} {loanBook.principal_interest_balance_of_arrears_loans} (Arrears)</p>
            </div>
            <div className='book-value-info-box'>
              <p className='dashboard-section-title'>Loan Book Categories Count</p>
              <p className='dashboard-section-amount-or-number'>{loanBook.num_of_open_loans} (Open)</p>
              <p className='dashboard-section-amount-or-number'>{loanBook.num_of_arrears_loans} (Arrears)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoanBook;