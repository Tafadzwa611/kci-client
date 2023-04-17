import React from 'react';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ActionModal, ActionModalDialog, NonFieldErrors } from '../../../../common';

function DeleteHoliday({setOpenModal, close, setHolidays, holidayId}) {
  const onSubmit = async (_, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.delete(`/usersapi/delete_branch_holiday/${holidayId}/`, CONFIG);
      close();
      setOpenModal(false);
      setHolidays(curr => curr.filter(h => h.id !== holidayId));
    } catch (error) {
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
    <ActionModal>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({isSubmitting, errors}) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <ActionModalDialog isSubmitting={isSubmitting} act={'Delete'} msg={'Are you sure you want to delete this holiday.'} setOpen={setOpenModal}/>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

export default DeleteHoliday;