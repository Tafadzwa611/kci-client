import React from 'react';
import { Form, Formik } from 'formik';
import { Modal, ModalSubmit, NonFieldErrors, CustomDatePicker } from '../../../common';
import * as yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';

export const approveLoanSchema = yup.object().shape({
  expected_disbursement_date: yup.string().required('Required')
});

const ApproveLoan = ({setOpen, url, setLoanDetails}) => {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.patch(url, values, CONFIG);
      setLoanDetails(response.data);
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
    <Modal open={true} setOpen={setOpen} title={'Approve Loan'}>
      <Formik initialValues={{expected_disbursement_date: ''}} validationSchema={approveLoanSchema} onSubmit={onSubmit}>
        {({ errors, isSubmitting, setFieldValue }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='create_modal_container'>
                <div>
                  <CustomDatePicker
                    label='Expected Disbursement Date'
                    name='expected_disbursement_date'
                    setFieldValue={setFieldValue}
                    required
                  />
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

export default ApproveLoan;