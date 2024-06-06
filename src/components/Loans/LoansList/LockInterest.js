import React from 'react';
import {
  ActionModal,
  ActionModalDialog,
  NonFieldErrors
} from '../../../common';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';

function LockInterest({loanId, setOpen, setLoanDetails}) {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.patch(`/loansapi/lock_int/${loanId}/`, values, CONFIG);
      setLoanDetails(curr => ({...curr, lock_interest: true}));
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
    <ActionModal open={true} setOpen={setOpen} title='Lock Interest'>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <ActionModalDialog isSubmitting={isSubmitting} msg='Are you sure you want to lock interest?' setOpen={setOpen} act='Lock'/>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

export default LockInterest;