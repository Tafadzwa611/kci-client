import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomDatePickerFilter,
  CustomSelectFilter,
  CustomSelectRemoteFilter,
  SubmitButtonFilter
} from '../../../common';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import axios from 'axios';
import { getParams } from '../../../utils/utils';

const DateRange = ({setCashFlowData}) => {
  const initialValues = {cash_account: '', min_date: '', max_date: ''};
  const {currencies} = useCurrencies();

  const onSubmit = async (values, actions) => {
    try {
      const data = {min_date: values.min_date, max_date: values.max_date, cash_account_id: values.cash_account.id};
      const params = getParams(data);
      const response = await axios.get('/acc-api/cash-flow-statement/', {params: params});
      setCashFlowData(response.data);
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
      {({isSubmitting, setFieldValue, errors, values}) => (
        <div className='search_background'>
          <div className='row-containers' style={{border:'none'}}>
            <Form>
              <NonFieldErrors errors={errors}>
                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                  <div className='row-payments-container' style={{width:'32%'}}>
                    <CustomDatePickerFilter label='Min Date' name='min_date' setFieldValue={setFieldValue} required/>
                  </div>
                  <div className='row-payments-container' style={{width:'32%'}}>
                    <CustomDatePickerFilter label='Max Date' name='max_date' setFieldValue={setFieldValue} required/>
                  </div>
                  <div className='row-payments-container' style={{width:'32%'}}>
                    <CustomSelectFilter label='Currency' name='currency_id' required>
                      <option value=''>------</option>
                      {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                    </CustomSelectFilter>
                  </div>
                </div>
                <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
                  {values.currency_id ? 
                  <div className='row-payments-container' style={{width:'90%'}}>
                    <CustomSelectRemoteFilter
                      label='Account'
                      url='/acc-api/search_account/'
                      selected={values.account}
                      params={[{key: 'currency_id', value: values.currency_id}]}
                      setFieldValue={setFieldValue}
                      queryParamName='query'
                      placeholder='Search Account'
                      name='cash_account'
                      required
                    />
                  </div> : null}
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

export default DateRange;

