import React from 'react';
import {
  NonFieldErrors,
  ActionModal,
  ActionModalDialog
} from '../../../common';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';

function UndoDisbursement({url, setOpen, setLoanDetails, updateLoanList, setLoanData}) {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.patch(url, values, CONFIG);
      const newLoan = response.data;
      setLoanDetails(newLoan);
      setOpen(false);
      if (setLoanData && updateLoanList) {
        updateLoanList(newLoan, setLoanData);
      }
    } catch (error) {
      console.log(error);
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
    <ActionModal open={true} setOpen={setOpen} title={'Undo Disbursement'}>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <ActionModalDialog
                isSubmitting={isSubmitting}
                msg='Are you sure you want to undo the loan disbursement?'
                setOpen={setOpen}
                act='Undo'
              />
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

export default UndoDisbursement;