import React from 'react';
import { Form, Formik } from 'formik';
import {
  Modal,
  ModalSubmit,
  NonFieldErrors,
  CustomDatePicker
} from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';

const DeletePayment = ({setOpen, paymentId, setLoan, setPayId}) => {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post(`/loansapi/delete_payment/${paymentId}/`, values, CONFIG);
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
    <Modal open={true} setOpen={setOpen} title={'Reverse Payment'}>
      <Formik initialValues={{value_date: ''}} onSubmit={onSubmit}>
        {({ errors, isSubmitting, setFieldValue }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='create_modal_container'>
                <div>
                  <CustomDatePicker label='Reversal Date' name='value_date' setFieldValue={setFieldValue} required/>
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

export default DeletePayment;

// <ActionModal open={true} setOpen={setOpen} title={'Reverse Payment'}>
    //   <Formik initialValues={{expected_disbursement_date: ''}} onSubmit={onSubmit}>
    //     {({ errors, isSubmitting }) => (
    //       <Form>
    //         <NonFieldErrors errors={errors}>
    //           <ActionModalDialog 
    //             isSubmitting={isSubmitting} 
    //             msg={'Are you sure you want to reverse this payment.'} 
    //             setOpen={setOpen}
    //             act={'Reverse'}
    //           />
    //         </NonFieldErrors>
    //       </Form>
    //     )}
    //   </Formik>
    // </ActionModal>