import React from 'react';
import ClientInformation from '../add_client/ClientInformation';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ModalSubmit, NonFieldErrors, Modal } from '../../../common';
import { removeEmptyValues } from '../../../utils/utils';

function UpdatePersonalInfo({setOpen, client, setClient}) {
  const onSubmit = async (values, actions) => {
    let data = processValues(values);
    data = removeEmptyValues(data);
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.put(`/clientsapi/update_client_personal/${client.id}/`, data, CONFIG);
      console.log(response.data);
      setClient(curr => ({...curr,...data}));
      setOpen(null);
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

  const initialValues = {
    ...client,
    mobile_number: {countryCode: client.mobile_number.split(' ')[0], phoneNumber: client.mobile_number.split(' ')[1]},
    phone_number_secondary: {
      ...(client.phone_number_secondary && {countryCode: client.phone_number_secondary.split(' ')[0], phoneNumber: client.phone_number_secondary.split(' ')[1]})
    },
    whatsapp_number: {
      ...(client.whatsapp_number && {countryCode: client.whatsapp_number.split(' ')[0], phoneNumber: client.whatsapp_number.split(' ')[1]})
    }
  };

  return (
    <Modal open={true} setOpen={setOpen} title='Update Client Info' text='add'>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, isSubmitting, setFieldValue }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='create_modal_container'>
                <div>
                  <ClientInformation setFieldValue={setFieldValue}/>
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

const processValues = (values) => {
  const phoneNumbers = {mobile_number: '', phone_number_secondary: '', whatsapp_number: ''};
  if (values.mobile_number.phoneNumber) {
    phoneNumbers.mobile_number = `${values.mobile_number.countryCode} ${values.mobile_number.phoneNumber}`;
  }
  if (values.phone_number_secondary.phoneNumber) {
    phoneNumbers.phone_number_secondary = `${values.phone_number_secondary.countryCode} ${values.phone_number_secondary.phoneNumber}`;
  }
  if (values.whatsapp_number.phoneNumber) {
    phoneNumbers.whatsapp_number = `${values.whatsapp_number.countryCode} ${values.whatsapp_number.phoneNumber}`;
  }
  let data = {...values, ...phoneNumbers};
  return data
}

export default UpdatePersonalInfo