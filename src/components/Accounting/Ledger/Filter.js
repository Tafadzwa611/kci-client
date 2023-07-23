import React from 'react';
import { Form, Formik } from 'formik';
import {
  CustomSelectRemoteFilter,
  CustomDatePickerFilter,
  CustomSelectFilter,
  SubmitButtonFilter,
  NonFieldErrors
} from '../../../common';
import { getParams } from '../../../utils/utils';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import axios from 'axios';

const Filter = ({setTxns, setParams, setQueue}) => {
  const initialValues = {page_num: 1, min_date: '', max_date: '', account: '', mode: 'html'};
  const {currencies} = useCurrencies();

  const onSubmit = async (values, actions) => {
    try {
      const data = {page_num: 1, min_date: values.min_date, max_date: values.max_date, account_id: values.account.id};
      if (values.mode === 'html') {
        const params = getParams(data);
        setParams(params);
        const response = await axios.get('/acc-api/ledger/', {params: params});
        setTxns(response.data);
      }else {
        data.file_format = values.mode;
        await axios.get('/acc-api/ledger_export/', {params: getParams(data)});
        setQueue(curr => ['Your request has been added to queue, you will receive a notification once its processed.', ...curr]);
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
      {({isSubmitting, setFieldValue, errors, values}) => (
        <div className='search_background'>
          <div className='row-containers' style={{border:'none'}}>
            <Form>
              <NonFieldErrors errors={errors}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <div className='row-payments-container' style={{width:'32%'}}>
                    <CustomSelectFilter label='Currency' name='currency_id' required>
                      <option value=''>------</option>
                      {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'32%'}}>
                    <CustomDatePickerFilter label='Start Value Date' name='min_date' setFieldValue={setFieldValue} required/>
                  </div>
                  <div className='row-payments-container' style={{width:'32%'}}>
                    <CustomDatePickerFilter label='End Value Date' name='max_date' setFieldValue={setFieldValue} required/>
                  </div>
                </div>
                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                  <div className='row-payments-container' style={{width:'32%'}}>
                    <CustomSelectFilter label='Mode' name='mode' required>
                      <option value='html'>Screen (HTML)</option>
                      <option value='xlsx'>Excel</option>
                      <option value='csv'>CSV</option>
                    </CustomSelectFilter>
                  </div>
                  {values.currency_id ? <div className='row-payments-container' style={{width:'32%'}}>
                    <CustomSelectRemoteFilter
                      label='Account'
                      url='/acc-api/search_account/'
                      selected={values.account}
                      params={[{key: 'currency_id', value: values.currency_id}]}
                      setFieldValue={setFieldValue}
                      queryParamName='query'
                      placeholder='Search Account'
                      name='account'
                      required
                    />
                  </div> : null}
                </div>
                <div style={{display:'flex', justifyContent:'space-between'}}>
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
