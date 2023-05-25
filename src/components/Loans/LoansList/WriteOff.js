import React from 'react';
import { ActionModal, ActionModalDialog, NonFieldErrors } from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Formik } from 'formik';

function WriteOff({loanId, setOpen, setLoan}) {
  const onSubmit = async (_, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.patch(`/loansapi/write_off/${loanId}/`, {}, CONFIG);
      setLoan(response.data);
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
    <ActionModal open={true} setOpen={setOpen} title={'Write Off Loan'}>
      <Formik initialValues={{expected_disbursement_date: ''}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <ActionModalDialog 
                isSubmitting={isSubmitting}
                msg={'Are you sure you want to write off this loan.'}
                setOpen={setOpen}
                act={'Write Off'}
              />
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

export default WriteOff;