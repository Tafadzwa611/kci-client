import React from 'react';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ModalActionSubmit, NonFieldErrors, ActionModal } from '../../../../common';


function ApproveClient({setOpen, setClient, clientId}) {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.patch(`/clientsapi/approve_client/${clientId}/`, values, CONFIG);
      setClient(curr => ({...curr, status: 'Inactive'}));
      setOpen(null);
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
    <ActionModal text='add'>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='title' style={{fontSize: '0.875rem'}}>
                Are you sure you want to approve client.
              </div>
              <ModalActionSubmit text='add' isSubmitting={isSubmitting} setOpen={setOpen} act={'Approve'} />
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

export default ApproveClient;