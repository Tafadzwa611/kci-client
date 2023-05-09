import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomTextField,
  SubmitButton,
  Modal
} from '../../../common';

function AddComment({setLoan, setOpen, loanId}) {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post(`/loansapi/add_loan_comment/${loanId}/`, values, CONFIG);
      setLoan(curr => ({...curr, comments: [response.data, ...curr.comments]}));
      setOpen(false);
      actions.resetForm();
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
      <Modal open={true} setOpen={setOpen} title={'Add Comment'}>
        <Formik initialValues={{comment: ''}} onSubmit={onSubmit}>
          {({ errors, isSubmitting }) => (
            <Form>
              <NonFieldErrors errors={errors}>
              <div className='create_modal_container'>
                <CustomTextField label='Comment' name='comment' type='text' required/>
                <div style={{display:'flex', justifyContent: 'flex-end'}}> 
                  <SubmitButton isSubmitting={isSubmitting}/>
                </div>
              </div>
            </NonFieldErrors>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )
}

export default AddComment;