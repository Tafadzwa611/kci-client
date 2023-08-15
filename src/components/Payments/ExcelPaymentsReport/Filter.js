import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomSelectFilter,
  SubmitButtonFilter
} from '../../../common';
import axios from 'axios';
import { getParams } from '../../../utils/utils';

const Filter = ({setPayments, setParams, reportId}) => {
  const initialValues = {status: '', page_num: 1, report_pk: reportId};

  const onSubmit = async (values, actions) => {
    try {
      const params = getParams(values);
      setParams(params);
      const response = await axios.get('/loansapi/excel_payments_list/', {params: params});
      setPayments(response.data);
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
      {({isSubmitting, errors}) => (
        <div className='search_background'>
          <div className='row-containers' style={{border:'none'}}>
            <Form>
              <NonFieldErrors errors={errors}>
                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                  <div style={{width:'70%'}}>
                    <CustomSelectFilter label='Status' name='status' required>
                      <option value=''>------</option>
                      <option value='Failed'>Failed</option>
                      <option value='Paid'>Paid</option>
                      <option value='Over Paid'>Over Paid</option>
                    </CustomSelectFilter>
                    <input value={initialValues.report_pk} type='hidden' />
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

