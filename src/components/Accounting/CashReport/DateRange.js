import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomDatePickerFilter,
  CustomSelectFilter,
  SubmitButtonFilter
} from '../../../common';
import axios from 'axios';
import { getParams } from '../../../utils/utils';

const DateRange = ({setStatement, accounts}) => {
  const onSubmit = async (values, actions) => {
    try {
      const params = getParams(values);
      const response = await axios.get('/acc-api/cash-report/', {params: params});
      setStatement(response.data);
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
    <Formik initialValues={{account_id: '', report_date: ''}} onSubmit={onSubmit}>
      {({isSubmitting, setFieldValue, errors}) => (
        <div className='search_background'>
          <div className='row-containers' style={{border:'none'}}>
            <Form>
              <NonFieldErrors errors={errors}>
                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                  <div className='row-payments-container' style={{width:'45%'}}>
                    <CustomDatePickerFilter label='Report Date' name='report_date' setFieldValue={setFieldValue} required/>
                  </div>
                  <div className='row-payments-container' style={{width:'45%'}}>
                    <CustomSelectFilter label='Account' name='account_id' required>
                      <option value=''>------</option>
                      {accounts.map(account => <option key={account.id} value={account.id}>{account.currency} {account.label} {account.branch}</option>)}
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
  );
}

export default DateRange;

