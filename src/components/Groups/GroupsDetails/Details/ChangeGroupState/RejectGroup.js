import React from 'react';
import { Form, Formik } from 'formik';
import {ModalActionSubmit, ModalSubmit, NonFieldErrors, ActionModal } from '../../../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';


const RejectGroup = ({setOpen, url, setGroupDetails}) => {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.patch(url, values, CONFIG);
      console.log(response)
      setGroupDetails(response.data);
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
      <Formik initialValues={{status: ''}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className="title" style={{fontSize: "0.875rem"}}>
                Are you sure you want to reject.
              </div>
              <ModalActionSubmit isSubmitting={isSubmitting} setOpen={setOpen} act={'Continue'} />
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

export default RejectGroup;