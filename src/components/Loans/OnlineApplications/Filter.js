import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomInputFilter,
  CustomDatePickerFilter,
  CustomSelectFilter,
  SubmitButtonFilter
} from '../../../common';
import axios from 'axios';
import { removeEmptyValues, getParams } from '../../../utils/utils';

function Filter({products, setApplications, setParams}) {
  const initialValues = {
    page_num: 1,
    page_size: 10,
    min_date: '',
    max_date: '',
    min_amount: '',
    max_amount: '',
    loan_product_id: '',
    client_name: '',
    status: '',
  };

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);
      setParams(params);
      const response = await axios.get('/loansapi/applications/', {params: params});
      setApplications(response.data);
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
                  <div style={{display:'flex', justifyContent:'space-between', width:'32%'}}>
                    <div style={{width: '49%'}}>
                      <CustomDatePickerFilter label='Min Application Date' name='min_date' setFieldValue={setFieldValue}/>
                    </div>
                    <div style={{width: '49%'}}>
                      <CustomDatePickerFilter label='Max Application Date' name='max_date' setFieldValue={setFieldValue}/>
                    </div>
                  </div>
                  <div style={{display:'flex', justifyContent:'space-between', width:'32%'}}>
                    <div style={{width: '49%'}}>
                      <CustomInputFilter label='Min Applied Amount' name='min_amount' type='number'/>
                    </div>
                    <div style={{width: '49%'}}>
                      <CustomInputFilter label='Max Applied Amount' name='max_amount' type='number'/>
                    </div>
                  </div>
                  <div style={{display:'flex', justifyContent:'space-between', width:'32%'}}>
                    <div style={{width: '49%'}}>
                      <CustomInputFilter label='Client Name' name='client_name' type='text'/>
                    </div>
                    <div style={{width: '49%'}}>
                      <CustomSelectFilter label='Loan Product' name='loan_product_id'>
                        <option value=''>------</option>
                        {products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
                      </CustomSelectFilter>
                    </div>
                  </div>
                </div>
                <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
                  <div style={{display:'flex', justifyContent:'space-between', width:'32%'}}>
                    <div style={{width: '49%'}}>
                      <CustomSelectFilter label='Status' name='status'>
                        <option value=''>Select Status</option>
                        <option value='Processed'>Processed</option>
                        <option value='Rejected'>Rejected</option>
                        <option value='Pending'>Pending</option>
                      </CustomSelectFilter>
                    </div>
                    <div style={{width: '49%'}}>
                      <CustomSelectFilter label='Page Size' name='page_size' required>
                        <option value='10'>10</option>
                        <option value='25'>25</option>
                        <option value='50'>50</option>
                        <option value='75'>75</option>
                        <option value='100'>100</option>
                      </CustomSelectFilter>
                    </div>
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