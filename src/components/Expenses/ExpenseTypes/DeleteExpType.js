import React from 'react';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import { DeleteModal, DeleteModalDialog, NonFieldErrors } from '../../../common';

function DeleteExpType({setOpenModal, setExpenseTypeData, expTypeId, setShowDetails}) {
  const onSubmit = async (_, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.delete(`/expensesapi/delete_expense_type/${expTypeId}/`, CONFIG);
      setShowDetails(false);
      setOpenModal(false);
      setExpenseTypeData(curr => curr.filter(exptype => exptype.id != expTypeId));

    } catch (error) {
      console.log(error)
      if (error.message === "Network Error") {
        actions.setErrors({responseStatus: "Network Error"});
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({responseStatus: error.response.status, ...error.response.data});
      } else {
        actions.setErrors({responseStatus: error.response.status});
      }
    }
  }

  return (
    <DeleteModal>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({isSubmitting, errors}) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <DeleteModalDialog isSubmitting={isSubmitting} msg={'Are you sure you want to delete this expense type.'} setOpen={setOpenModal}/>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </DeleteModal>
  )
}

export default DeleteExpType;