import React from 'react';
import { Form, Formik } from 'formik';
import {ModalActionSubmit, NonFieldErrors, ActionModal } from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';


const DeleteExpense = ({setOpen, expenseID, setEpenseData, setExpenseId}) => {
  const onSubmit = async (_, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.delete(`/expensesapi/delete_expense/${expenseID}/`, CONFIG);
      setEpenseData(curr => {
        return {
          count: curr.count - 1,
          next_page_num: curr.next_page_num,
          expenses: curr.expenses.filter(expense => expense.id !== expenseID)
        }
      });
      setExpenseId(null);
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
    <ActionModal>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className="title" style={{fontSize: "0.875rem"}}>
                Are you sure you want to delete expense.
              </div>
              <ModalActionSubmit isSubmitting={isSubmitting} setOpen={setOpen} act={'Continue'} />
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

export default DeleteExpense;