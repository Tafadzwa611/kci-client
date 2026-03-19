import React from 'react';
import { Form, Formik } from 'formik';
import { removeEmptyValues, getParams } from '../../../utils/utils';
import axios from 'axios';
import {
  NonFieldErrors,
  CustomInputFilter,
  SubmitButtonFilter,
  CustomCheckBoxfilter
} from '../../../common';

function Filter({ setProducts }) {
  const initialValues = {
    active: true,
    name: ''
  };

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);
      const response = await axios.get('/deposits/products/list/', { params: params });
      setProducts(response.data);
    } catch (error) {
      console.log(error);
      if (error.message === 'Network Error') {
        actions.setErrors({ responseStatus: 'Network Error' });
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else {
        actions.setErrors({ responseStatus: error.response.status });
      }
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting, errors }) => (
        <div className='search_background'>
          <div className='row-containers sf-shellwrap'>
            <Form>
              <NonFieldErrors errors={errors}>
                <div className='row row-payments row-loans sf-card'>
                  <div className='sf-row sf-row-2'>
                    <div className='row-payments-container sf-w-49'>
                      <CustomInputFilter label='Name' name='name' />
                    </div>

                    <div className='row-payments-container sf-w-49' style={{ marginTop: '25px' }}>
                      <CustomCheckBoxfilter label='Active' name='active' />
                    </div>
                  </div>
                </div>

                <div className='sf-submit'>
                  <SubmitButtonFilter isSubmitting={isSubmitting} />
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