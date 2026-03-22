import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomSelectFilter,
  CustomInputFilter,
  SubmitButtonFilter 
} from '../../../../common';
import axios from 'axios';
import { removeEmptyValues, getParams } from '../../../../utils/utils';

const DateRange = ({setMainAccounts}) => {
  const initialValues = {acc_type: '', gl_code: '', gl_name: ''};

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);
      const response = await axios.get('/acc-api/main-accounts-list/', {params: params});
      setMainAccounts(response.data);
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
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({isSubmitting, errors}) => (
          <div className='search_background'>
            <div className='row-containers sf-shellwrap'>
              <Form>
                <NonFieldErrors errors={errors}>
                  <div className='row row-payments row-loans sf-card'>
                    <div className='sf-row sf-row-3'>
                      <div className='row-payments-container sf-w-32'>
                        <CustomSelectFilter label='Account Type' name='acc_type'>
                          <option value=''>------</option>
                          <option value={'ASSET'}>ASSET</option>
                          <option value={'LIABILITY'}>LIABILITY</option>
                          <option value={'EQUITY'}>EQUITY</option>
                          <option value={'INCOME'}>INCOME</option>
                          <option value={'EXPENSE'}>EXPENSE</option>
                        </CustomSelectFilter>
                      </div>

                      <div className='row-payments-container sf-w-32'>
                        <CustomInputFilter label='GL Code' name='gl_code'/>
                      </div>

                      <div className='row-payments-container sf-w-32'>
                        <CustomInputFilter label='GL Name' name='gl_name'/>
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
    </>
  );
}

export default DateRange;