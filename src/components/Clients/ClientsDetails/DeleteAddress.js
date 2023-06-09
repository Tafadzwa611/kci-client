import React from 'react';
import { ModalActionSubmit, NonFieldErrors, ActionModal } from '../../../common';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';

function DeleteAddress({setClient, setOpen, addrId}) {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.delete(`/clientsapi/delete_address/${addrId}/`, CONFIG);
      setClient(curr => ({...curr, address_list: curr.address_list.filter(addr => addr.id !== addrId)}));
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
                Are you sure you want to remove this address.
              </div>
              <ModalActionSubmit isSubmitting={isSubmitting} setOpen={setOpen} act='Remove'/>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

export default DeleteAddress;