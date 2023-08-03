import React from 'react';
import { Form, Formik } from 'formik';
import {
  CustomSelectFilter,
  NonFieldErrors,
  CustomDatePickerFilter,
  SubmitButtonFilter
} from '../../../common';
import axios from 'axios';
import { getParams } from '../../../utils/utils';

const DateRange = ({setReport, products}) => {
  const initialValues = {loan_product_id: '', min_date: '', max_date: ''};

  const onSubmit = async (values, actions) => {
    try {
      const params = getParams(values);
      const response = await axios.get('/reportsapi/loan-product-report/', {params: params});
      setReport(response.data);
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
                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                  <div className='row-payments-container' style={{width:'30%'}}>
                    <CustomDatePickerFilter label='Min Date' name='min_date' setFieldValue={setFieldValue} required/>
                  </div>
                  <div className='row-payments-container' style={{width:'30%'}}>
                    <CustomDatePickerFilter label='Max Date' name='max_date' setFieldValue={setFieldValue} required/>
                  </div>
                  <div className='row-payments-container' style={{width:'20%'}}>
                    <CustomSelectFilter label='Loan Product' name='loan_product_id' required>
                      <option value=''>------</option>
                      {products.map(product => <option key={product.id} value={product.id}>{product.name} - {product.currency}</option>)}
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

export default DateRange;

