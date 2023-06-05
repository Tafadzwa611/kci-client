import React from 'react';
import { ModalActionSubmit, NonFieldErrors, ActionModal } from '../../../../common';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';


function UndoClientApproval({setOpen, setClient, clientId}) {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.patch(`/clientsapi/undo_client_approval/${clientId}/`, values, CONFIG);
      setClient(curr => ({...curr, status: 'Pending Approval'}));
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
                Are you sure you want to reverse client approval.
              </div>
              <ModalActionSubmit isSubmitting={isSubmitting} setOpen={setOpen} act={'Reverse'} />
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

export default UndoClientApproval;