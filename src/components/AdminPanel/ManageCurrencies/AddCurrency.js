import React from 'react';
import { Link } from 'react-router-dom';
import {
  NonFieldErrors,
  CustomInput,
  CustomDatePicker,
  SubmitButton
} from '../../../common';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function AddCurrency() {
  const initialValues = {fullname: '', shortname: '', date_created: ''};
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.post('/usersapi/add_currency/', values, CONFIG);
      navigate({pathname: '/users/admin'});
      window.location.reload();
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
    <>
      <div>
          <button type='button' className='btn btn-default max'>
            <Link to='/users/admin'>Back</Link>
          </button>
      </div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, setFieldValue, errors }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='divider divider-info'>
                <span>Currency Information</span>
              </div>
              <CustomInput label='Fullname' name='fullname' type='text' required/>
              <CustomInput label='Shortname' name='shortname' type='text'/>
              <CustomDatePicker label='Currency Date' name='date_created' setFieldValue={setFieldValue} required/>
              <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
              <div style={{display:'flex', justifyContent: 'flex-end'}}> 
                <SubmitButton isSubmitting={isSubmitting}/>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default AddCurrency;