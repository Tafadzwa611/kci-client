import React from 'react';
import { Form, Formik } from 'formik';
import {
  Modal,
  ModalSubmit,
  NonFieldErrors
} from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../utils/utils';


const DeletePayment = ({setOpen, payment, setLoan, setPayId}) => {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.post(
        `/loansapi/delete_payment/${payment.id}/`,
        removeEmptyValues(values),
        CONFIG
      );
      setLoan(response.data);
      setOpen(false);
      setPayId(null);
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
    <Modal open={true} setOpen={setOpen} title='Reverse Payment'>
      <Formik initialValues={{value_date: ''}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <div className='create_modal_container'>
              <div>
                Are you sure you want to reverse this payment?<br />
                <b>
                  Amount: {payment.amount_paid}<br />
                  Requested By: {payment.user_name}<br />
                  Collection Date: {payment.cdate_created}<br />
                  Receipt Number: {payment.receipt_number}<br />
                </b>
              </div>
              <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
            </div>
            <NonFieldErrors errors={errors}/>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default DeletePayment;
