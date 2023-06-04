import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
} from '../../../common';
import {
  CustomInputFilter,
  CustomDatePickerFilter,
  CustomSelectFilter,
  CustomMultiSelectFilter,
  SubmitButtonFilter
} from '../../../common';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { useBranches } from '../../../contexts/BranchesContext';
import { statusValues } from './data';
import axios from 'axios';
import { removeEmptyValues } from '../../../utils/utils';

const Filter = ({products, setLoanData, setLoanId, setParams, setLoanDetails}) => {
  const initialValues = {
    branch_ids: [],
    status: [],
    page_num: 1,
    min_loan_added_on: '',
    max_loan_added_on: '',
    min_principal_amount_due: '',
    max_principal_amount_due: '',
    min_total_amount_paid: '',
    max_total_amount_paid: '',
    client: '',
    group: '',
    loan_product_id: '',
    client_type: ''
  };
  const {currencies} = useCurrencies();
  const {branches} = useBranches();

  const changeClientType = (evt, setFieldValue) => {
    const {value} = evt.target;
    setLoanId(null);
    setLoanDetails(null);
    // setLoanData({count: 0, next_page_num: 0, loans: []});
    setFieldValue('client_type', value);
  }

  const getParams = (values) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(values)) {
      if (Array.isArray(value)) {
        value.forEach(el => params.append(key, el));
      }else {
        params.append(key, value);
      }
    }
    return params
  }

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);
      setParams(params);
      const response = await axios.get('/loansapi/loan_list/', {params: params});
      setLoanData(response.data);
    } catch (error) {
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
                  <div style={{display:'flex', justifyContent:'space-between', width:'32%', columnGap:'1rem'}}>
                    <CustomDatePickerFilter label='Min Disbursement Date' name='min_loan_added_on' setFieldValue={setFieldValue}/>
                    <CustomDatePickerFilter label='Max Disbursement Date' name='max_loan_added_on' setFieldValue={setFieldValue}/>
                  </div>
                  <div style={{display:'flex', justifyContent:'space-between', width:'32%', columnGap:'1rem'}}>
                    <CustomInputFilter label='Min Principal Outstanding' name='min_principal_amount_due' type='number'/>
                    <CustomInputFilter label='Max Principal Outstanding' name='max_principal_amount_due' type='number'/>
                  </div>
                  <div style={{display:'flex', justifyContent:'space-between', width:'32%', columnGap:'1rem'}}>
                    <CustomInputFilter label='Min Amount Paid' name='min_total_amount_paid' type='number'/>
                    <CustomInputFilter label='Max Amount Paid' name='max_total_amount_paid' type='number'/>
                  </div>
                </div>
                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomSelectFilter label='Loan Product' name='loan_product_id'>
                      <option value=''>------</option>
                      {products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomInputFilter label='Client Name' name='client'/>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomSelectFilter label='Currency' name='currency_id' required>
                      <option value=''>------</option>
                      {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomSelectFilter
                      label='Client Type'
                      name='client_type'
                      onChange={(evt) => changeClientType(evt, setFieldValue)}
                    >
                      <option value=''>-----</option>
                      <option value='Clients'>Client</option>
                      <option value='Groups'>Group</option>
                      <option value='Groups (solidarity)'>Groups (solidarity)</option>
                    </CustomSelectFilter>
                  </div>
                </div>
                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                  <div style={{width:'60%'}}>
                    <CustomMultiSelectFilter
                      label='Branches'
                      name='branch_ids'
                      options={branches.map(br => ({label: br.name, value:br.id}))}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomInputFilter label='Group Name' name='group'/>
                  </div>
                </div>
                <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
                  <div style={{width:'85%'}}>
                    <CustomMultiSelectFilter
                      label='Status'
                      name='status'
                      options={statusValues.map(val => ({label: val, value: val}))}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <SubmitButtonFilter isSubmitting={isSubmitting}/>
                </div>
              </NonFieldErrors>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Filter;