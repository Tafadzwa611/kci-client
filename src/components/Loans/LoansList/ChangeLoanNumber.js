import React from 'react';
import {
  Modal,
  ModalSubmit,
  CustomInput,
  NonFieldErrors,
} from '../../../common';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';

function ChangeLoanNumber({loan, setLoan, setOpen}) {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.patch(`/loansapi/update_loan_number/${loan.id}/`, values, CONFIG);
      setLoan(curr => ({...curr, loan_id: values.loan_num}));
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
    <Modal open={true} title='Change Loan Number' setOpen={setOpen}>
      <Formik initialValues={{loan_num: ''}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='create_modal_container'>
                <div>
                  <CustomInput label='Loan Number' name='loan_num' required/>
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

export default ChangeLoanNumber;