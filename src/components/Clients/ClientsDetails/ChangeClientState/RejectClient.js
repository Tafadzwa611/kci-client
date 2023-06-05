import React from 'react';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ModalActionSubmit, NonFieldErrors, ActionModal } from '../../../../common';

function RejectClient({setOpen, setClient, clientId}) {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.patch(`/clientsapi/reject_client/${clientId}/`, values, CONFIG);
      setClient(curr => ({...curr, status: 'Rejected'}));
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
    <ActionModal>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='title' style={{fontSize: '0.875rem'}}>
                Are you sure you want to reject this client.
              </div>
              <ModalActionSubmit isSubmitting={isSubmitting} setOpen={setOpen} act={'Reject'} />
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

export default RejectClient;