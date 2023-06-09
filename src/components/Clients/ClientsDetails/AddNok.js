import React from 'react';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ModalSubmit, NonFieldErrors, Modal, CustomSelect, CustomInput, CustomPhoneNumber } from '../../../common';

function AddNok({setOpen, clientId, setClient}) {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post(`/clientsapi/add_nok/`, {...values, phone_number: `${values.phone_number.countryCode} ${values.phone_number.phoneNumber}`}, CONFIG);
      setClient(curr => ({...curr, next_of_kin_list: [...curr.next_of_kin_list, response.data]}));
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
    client_id: clientId,
    first_name: '',
    last_name: '',
    gender: '',
    relationship: '',
    phone_number: '',
    address: '',
    city: '',
    country: '',
    ownership: '',
  };
  return (
    <Modal open={true} setOpen={setOpen} title='Add Next Of Kin' text='add'>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, isSubmitting, setFieldValue }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='create_modal_container'>
                <div>
                  <CustomInput label='First Name' name='first_name' type='text' required/>
                  <CustomInput label='Last Name' name='last_name' type='text' required/>
                  <CustomSelect label='Gender' name='gender' required>
                    <option value=''>------</option>
                    <option value='MALE'>MALE</option>
                    <option value='FEMALE'>FEMALE</option>
                  </CustomSelect>
                  <CustomInput label='Relationship' name='relationship' type='text' required/>
                  <CustomPhoneNumber label='Phone Number' name='phone_number' setFieldValue={setFieldValue} required/>
                  <CustomInput label='Address' name='address' type='text' required/>
                  <CustomInput label='City' name='city' type='text' required/>
                  <CustomInput label='Country' name='country' type='text' required/>
                  <CustomSelect label='Ownership' name='ownership' required>
                    <option value=''>------</option>
                    <option value='OWNER'>OWNER</option>
                    <option value='RENTING'>RENTING</option>
                  </CustomSelect>
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

export default AddNok;