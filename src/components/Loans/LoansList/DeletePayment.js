import React from 'react';
import { Form, Formik } from 'formik';
import { ActionModal, ActionModalDialog, NonFieldErrors } from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';

const DeletePayment = ({setOpen, paymentId, setLoan}) => {
  const onSubmit = async (_, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.delete(`/loansapi/delete_payment/${paymentId}/`, CONFIG);
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

  return (
    <ActionModal open={true} setOpen={setOpen} title={'Reverse Payment'}>
      <Formik initialValues={{expected_disbursement_date: ''}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <ActionModalDialog 
                isSubmitting={isSubmitting} 
                msg={'Are you sure you want to reverse this payment.'} 
                setOpen={setOpen}
                act={'Reverse'}
              />
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

export default DeletePayment;