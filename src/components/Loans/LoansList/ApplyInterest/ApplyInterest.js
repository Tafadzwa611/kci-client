import React from 'react';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  NonFieldErrors,
  CustomDatePicker,
  CustomInput,
  ModalSubmit,
  Modal
} from '../../../../common';

function ApplyInterest({setOpen, setLoan, loan}) {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post(`/loansapi/apply_interest/${loan.id}/`, values, CONFIG);
      setLoan(response.data);
      setOpen(false);
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

  const initialValues = {
    interest_date: '',
    interest_due_date: '',
    interest_amount: ''
  };

  return (
    <Modal open={true} title='Add Interest' setOpen={setOpen}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, isSubmitting, setFieldValue }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='create_modal_container'>
                <div>
                  <CustomInput label='Interest Amount' name='interest_amount' type='number' required/>
                  <CustomDatePicker label='Interest Date' name='interest_date' setFieldValue={setFieldValue} allowKeyDown required/>
                  <CustomDatePicker label='Interest Due Date' name='interest_due_date' setFieldValue={setFieldValue} allowKeyDown required/>
                </div>
                <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default ApplyInterest;