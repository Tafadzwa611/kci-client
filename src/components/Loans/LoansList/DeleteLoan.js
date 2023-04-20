import React from 'react';
import { Form, Formik } from 'formik';
import { ActionModal, ActionModalDialog, NonFieldErrors } from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const DeleteLoan = ({
  setOpen,
  url,
  setLoanDetails,
  setLoanId,
  loanId,
  setLoanData
}) => {
  const navigate = useNavigate();
  const onSubmit = async (_, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.delete(url, CONFIG);
      setOpen(false);
      if (setLoanId) {
        setLoanDetails(null);
        setLoanId(null);
        setLoanData(curr => {
          return {
            count: curr.count - 1,
            next_page_num: curr.next_page_num,
            loans: curr.loans.filter(loan => loan.id !== loanId)
          }
        });
      }
      navigate({pathname: '/loans/viewloans'});
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
    <ActionModal open={true} setOpen={setOpen} title={'Delete Loan'}>
      <Formik initialValues={{expected_disbursement_date: ''}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <ActionModalDialog 
                isSubmitting={isSubmitting} 
                msg={'Are you sure you want to delete this loan.'} 
                setOpen={setOpen}
                act={'Delete'}
              />
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

export default DeleteLoan;