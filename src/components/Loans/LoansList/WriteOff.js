import React from 'react';
import {
  Modal,
  CustomTextField,
  ModalSubmit,
  NonFieldErrors
} from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Formik } from 'formik';

function WriteOff({loanId, setOpen, setLoan, updateLoanList, setLoanData}) {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post(`/loansapi/write_off/${loanId}/`, values, CONFIG);
      const newLoan = response.data;
      setLoan(newLoan);
      setOpen(false);
      if (setLoanData && updateLoanList) {
        updateLoanList(newLoan, setLoanData);
      }
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
    <Modal open={true} setOpen={setOpen} title='Write-Off Loan'>
      <Formik initialValues={{write_off_reason: ''}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <div className='create_modal_container'>
              <div>
                <CustomTextField label='Write Off Reason' name='write_off_reason' type='text' required/>
                <NonFieldErrors errors={errors}/>
              </div>
              <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default WriteOff;