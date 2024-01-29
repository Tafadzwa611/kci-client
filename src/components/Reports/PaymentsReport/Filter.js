import React, {useState} from 'react';
import { Form, Formik } from 'formik';
import {
  CustomDatePickerFilter,
  CustomSelectFilter,
  SubmitButtonFilter,
  NonFieldErrors,
  CustomInputFilter
} from '../../../common';
import { removeEmptyValues, getParams } from '../../../utils/utils';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import axios from 'axios';

const Filter = ({setReport, accounts, setParams, branches}) => {
  const initialValues = {
    page_num: 1,
    loan_branch_id: '',
    min_date: '',
    max_date: '',
    payment_branch_id: '',
    loan_number: '',
    payment_fund_account_id: '',
    loan_fund_account_id: '',
    mode: 'html'
  };
  const {currencies} = useCurrencies();
  const [currencyId, seCurrencyId] = useState('');

  const onChange = (setFieldValue, newValue) => {
    setFieldValue('currency_id', newValue);
    seCurrencyId(newValue);
  }

  const newaccounts = accounts.accounts.filter(acc => acc.currency_id == currencyId);

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      if (values.mode === 'html') {
        const params = getParams(data);
        setParams(params);
        const response = await axios.get('/reportsapi/payments-report/', {params: params});
        setReport(response.data);
      }else {
        data.file_format = values.mode;
        await axios.get('/reportsapi/payments-report-export/', {params: getParams(data)});
      }
    } catch (error) {
      console.log(error);
      if (error.message === 'Network Error') {
        actions.setErrors({responseStatus: 'Network Error'});
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({responseStatus: error.response.status, ...error.response.data});
      } else {
        actions.setErrors({responseStatus: error.response.status});
      }
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({isSubmitting, setFieldValue, errors}) => (
        <div className='search_background'>
          <div className='row-containers' style={{border:'none'}}>
            <Form>
              <NonFieldErrors errors={errors}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomSelectFilter label='Currency' name='currency_id' onChange={evt => onChange(setFieldValue, evt.target.value)} required>
                      <option value=''>------</option>
                      {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomDatePickerFilter label='Start Value Date' name='min_date' setFieldValue={setFieldValue} required/>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomDatePickerFilter label='End Value Date' name='max_date' setFieldValue={setFieldValue} required/>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomInputFilter label='Loan Number' name='loan_number' type='text'/>
                  </div>
                </div>
                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomSelectFilter label='Payment Branch' name='payment_branch_id'>
                      <option value=''>------</option>
                      {branches.map(branch => (<option key={branch.id} value={branch.id}>{branch.name}</option>))}
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomSelectFilter label='Loan Branch' name='loan_branch_id'>
                      <option value=''>------</option>
                      {branches.map(branch => (<option key={branch.id} value={branch.id}>{branch.name}</option>))}
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomSelectFilter label='Payment Fund Account' name='payment_fund_account_id'>
                      <option value=''>------</option>
                      {newaccounts.map(acc => <option key={acc.id} value={acc.id}>{acc.general_ledger_code} {acc.general_ledger_name}</option>)}
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomSelectFilter label='Loan Fund Account' name='loan_fund_account_id'>
                      <option value=''>------</option>
                      {newaccounts.map(acc => <option key={acc.id} value={acc.id}>{acc.general_ledger_code} {acc.general_ledger_name}</option>)}
                    </CustomSelectFilter>
                  </div>
                </div>
                <div className='row row-payments row-loans' style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomSelectFilter label='Mode' name='mode' required>
                      <option value='html'>Screen (HTML)</option>
                      <option value='xlsx'>Excel</option>
                      <option value='csv'>CSV</option>
                    </CustomSelectFilter>
                  </div>
                  <SubmitButtonFilter isSubmitting={isSubmitting}/>
                </div>
              </NonFieldErrors>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default Filter;
