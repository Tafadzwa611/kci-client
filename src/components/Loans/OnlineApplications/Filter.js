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

function Filter({products, setApps, setParams}) {
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
      setApps(response.data);
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
          <div className='row-containers sf-shellwrap'>
            <Form>
              <NonFieldErrors errors={errors}>
                <div className='row row-payments row-loans sf-card'>

                  {/* ROW 1 */}
                  <div className='sf-row sf-row-4'>
                    <div className='row-payments-container sf-w-24'>
                      <CustomDatePickerFilter
                        label='Min Application Date'
                        name='min_date'
                        setFieldValue={setFieldValue}
                      />
                    </div>

                    <div className='row-payments-container sf-w-24'>
                      <CustomDatePickerFilter
                        label='Max Application Date'
                        name='max_date'
                        setFieldValue={setFieldValue}
                      />
                    </div>

                    <div className='row-payments-container sf-w-24'>
                      <CustomInputFilter
                        label='Min Applied Amount'
                        name='min_amount'
                        type='number'
                      />
                    </div>

                    <div className='row-payments-container sf-w-24'>
                      <CustomInputFilter
                        label='Max Applied Amount'
                        name='max_amount'
                        type='number'
                      />
                    </div>
                  </div>

                  {/* ROW 2 */}
                  <div className='sf-row sf-row-4 sf-mt-3'>
                    <div className='row-payments-container sf-w-24'>
                      <CustomInputFilter
                        label='Client Name'
                        name='client_name'
                        type='text'
                      />
                    </div>

                    <div className='row-payments-container sf-w-24'>
                      <CustomSelectFilter label='Loan Product' name='loan_product_id'>
                        <option value=''>------</option>
                        {products.map(product => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </CustomSelectFilter>
                    </div>

                    <div className='row-payments-container sf-w-24'>
                      <CustomSelectFilter label='Status' name='status'>
                        <option value=''>Select Status</option>
                        <option value='Processed'>Processed</option>
                        <option value='Rejected'>Rejected</option>
                        <option value='Pending'>Pending</option>
                      </CustomSelectFilter>
                    </div>

                    <div className='row-payments-container sf-w-24'>
                      <CustomSelectFilter label='Page Size' name='page_size' required>
                        <option value='10'>10</option>
                        <option value='25'>25</option>
                        <option value='50'>50</option>
                        <option value='75'>75</option>
                        <option value='100'>100</option>
                      </CustomSelectFilter>
                    </div>
                  </div>

                </div>

                <div className='sf-submit'>
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