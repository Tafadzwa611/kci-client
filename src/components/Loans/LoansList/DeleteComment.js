import React from 'react';
import { Form, Formik } from 'formik';
import { ActionModal, ActionModalDialog, NonFieldErrors } from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';

const DeleteComment = ({setOpen, commentId, setLoan}) => {
  const onSubmit = async (_, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.delete(`/loansapi/delete_loan_comment/${commentId}/`, CONFIG);
      setLoan(curr => ({...curr, comments: curr.comments.filter(comment => comment.id != commentId)}));
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
    <ActionModal open={true} setOpen={setOpen} title={'Remove Comment'}>
      <Formik initialValues={{expected_disbursement_date: ''}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <ActionModalDialog 
                isSubmitting={isSubmitting} 
                msg={'Are you sure you want to remove this comment.'} 
                setOpen={setOpen}
                act={'Remove'}
              />
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

export default DeleteComment;