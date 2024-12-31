import React from 'react';
import {
  Modal,
  ModalSubmit,
  CustomDatePicker,
  NonFieldErrors,
} from '../../../common';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';

function ChangeLoanNextInstallmentDate({loan, setLoan, setOpen}) {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.patch(`/loansapi/update_loan_next_interest_date/${loan.id}/`, values, CONFIG);
      setLoan(curr => ({...curr, next_interest_date: values.next_interest_date}));
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
    <Modal open={true} title='Change Loan Next Installment Date' setOpen={setOpen}>
      <Formik initialValues={{next_interest_date: loan.next_interest_date}} onSubmit={onSubmit}>
        {({ errors, isSubmitting, setFieldValue }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='create_modal_container'>
                <div>
                  <CustomDatePicker label='Next Interest Date' name='next_interest_date' setFieldValue={setFieldValue} required/>
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

export default ChangeLoanNextInstallmentDate;