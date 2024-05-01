import React from 'react';
import { Form, Formik } from 'formik';
import {
  Modal,
  ModalSubmit,
  NonFieldErrors,
  CustomInput
} from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';

function Reject({setOpen, app, setApp}) {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.patch(`/clientsapi/reject_online_application/${app.id}/`, values, CONFIG);
      setOpen(null);
      setApp(curr => ({...curr, rejection_reason: values.reason, status: 'Rejected'}));
    } catch (error) {
      console.log(error);
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
    <Modal open={true} setOpen={setOpen} title={'Reject Client Application'}>
      <Formik initialValues={{reason: ''}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='create_modal_container'>
                <div>
                  <CustomInput label='Reason' name='reason' required/>
                </div>
                <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default Reject;