import React from 'react';
import { Form, Formik } from 'formik';
import { Modal, ModalSubmit, NonFieldErrors } from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';


const RejectLoan = ({setOpen, url, setLoanDetails}) => {
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
    <Modal open={true} setOpen={setOpen} title={'Reject Loan'}>
      <Formik initialValues={{expected_disbursement_date: ''}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='create_modal_container'>
                <div>
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

export default RejectLoan;