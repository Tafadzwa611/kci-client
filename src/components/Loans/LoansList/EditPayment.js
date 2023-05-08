import React from 'react';
import { Form, Formik } from 'formik';
import { Modal, ModalSubmit, NonFieldErrors, CustomInput, CustomTextField } from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../utils/utils';

const EditPayment = ({setOpen, selectedPayment, setLoan, setSelectedPayment}) => {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const data = removeEmptyValues(values);
      await axios.patch(`/loansapi/update_payment/${selectedPayment.id}/`, data, CONFIG);
      setLoan(curr => ({...curr, payments: curr.payments.map(payment => {
        if (selectedPayment.id == payment.id) {
          payment.receipt_number = values.receipt_number;
          payment.notes = values.notes;
        }
        return payment
      })}));
      setSelectedPayment(curr => ({...curr, receipt_number: values.receipt_number, notes: values.notes}));
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
    <Modal open={true} setOpen={setOpen} title={'Edit Payment'}>
      <Formik initialValues={{receipt_number: selectedPayment.receipt_number || '', notes: selectedPayment.notes || ''}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='create_modal_container'>
                <div>
                  <CustomInput label='Receipt Number' name='receipt_number'/>
                  <CustomTextField label='Notes' name='notes'/>
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

export default EditPayment;