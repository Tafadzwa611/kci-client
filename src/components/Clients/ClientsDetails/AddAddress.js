import React from 'react';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ModalSubmit, NonFieldErrors, Modal, CustomSelect, CustomInput } from '../../../common';

function AddAddress({setOpen, setClient, clientId}) {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post(`/clientsapi/add_address/`, values, CONFIG);
      setClient(curr => ({...curr, address_list: [...curr.address_list, response.data]}));
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

  const initialValues = {
    client_id: clientId,
    ownership: '',
    address: '',
    city: '',
    country: ''
  };

  return (
    <Modal open={true} setOpen={setOpen} title='Add Address' text='add'>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='create_modal_container'>
                <div>
                  <CustomSelect label='Ownership' name='ownership' required>
                    <option value=''>------</option>
                    <option value='OWNER'>OWNER</option>
                    <option value='RENTING'>RENTING</option>
                  </CustomSelect>
                  <CustomInput label='Address' name='address' type='text' required/>
                  <CustomInput label='City' name='city' type='text' required/>
                  <CustomInput label='Country' name='country' type='text' required/>
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

export default AddAddress;