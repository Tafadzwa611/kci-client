import React from 'react'
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomDatePickerFilter,
  CustomSelectFilter,
  SubmitButtonFilter
} from '../../../common';
import { getParams, removeEmptyValues } from '../../../utils/utils';
import axios from 'axios';

function Filter({setTrail, setParams}) {
  const initialValues = {
    page_num: '1',
    page_size: '100',
    min_date: '',
    max_date: '',
    content_type_id: '',
    action: '',
    file_format: 'html'
  };

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);
      setParams(params);
      if (values.file_format === 'html') {
        const response = await axios.get('/reportsapi/audit-trail/', {params: params});
        setTrail(response.data);
      }else {
        await axios.get('/reportsapi/audit-trail-export/', {params: params});
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
      {({isSubmitting, errors, setFieldValue}) => (
        <div  className='search_background'>
          <div className='row-containers' style={{border:'none'}}>
            <Form>
              <NonFieldErrors errors={errors}>
                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomDatePickerFilter label='Min Date' name='min_date' setFieldValue={setFieldValue} required/>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomDatePickerFilter label='Max Date' name='max_date' setFieldValue={setFieldValue} required/>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}} required>
                    <CustomSelectFilter label='Page Size' name='page_size'>
                      <option value='10'>10</option>
                      <option value='25'>25</option>
                      <option value='50'>50</option>
                      <option value='100'>100</option>
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomSelectFilter label='Mode' name='file_format' required>
                      <option value='html'>Screen (HTML)</option>
                      <option value='xlsx'>Excel</option>
                      <option value='csv'>CSV</option>
                    </CustomSelectFilter>
                  </div>
                </div>
                <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
                  <div className='row-payments-container' style={{width:'40%'}}>
                    <CustomSelectFilter label='Entity Type' name='content_type_id'>
                      <option value=''>-----</option>
                      <option value='7'>Client</option>
                      <option value='11'>Loan</option>
                      <option value='12'>Loan Product</option>
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'40%'}}>
                    <CustomSelectFilter label='Action' name='action'>
                      <option value=''>-----</option>
                      <option value='0'>Create</option>
                      <option value='1'>Update</option>
                      <option value='2'>Delete</option>
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

export default Filter