import React from 'react';
import ClientInformation from '../add_client/ClientInformation';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ModalSubmit, NonFieldErrors, Modal } from '../../../common';
import { removeEmptyValues } from '../../../utils/utils';
import * as yup from 'yup';
import { useBranches } from '../../../contexts/BranchesContext';

const validationSchema = yup.object().shape({
  first_name: yup.string().required('Required').max(300),
  last_name: yup.string().required('Required').max(300),
  gender: yup.string().required('Required').oneOf(['MALE', 'FEMALE']),
  date_of_birth: yup.string().required('Required'),
  registration_date: yup.string().required('Required'),
  mobile_number: yup.object().shape({
    countryCode: yup.string().required(),
    phoneNumber: yup.string().required('Required'),
  }),
  email: yup.string().email('Must be a valid email address.'),
});

function UpdatePersonalInfo({setOpen, staff, clientControls, client, setClient}) {
  const {branches} = useBranches();

  const onSubmit = async (values, actions) => {
    let data = processValues(values);
    data = removeEmptyValues(data);
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.put(`/clientsapi/update_client_personal/${client.id}/`, data, CONFIG);
      let client_manager = null;
      const clientManagerObj = staff.find(s => s.id === Number(values.client_manager_id));
      if (clientManagerObj) {
        client_manager = `${clientManagerObj.first_name} ${clientManagerObj.last_name}`;
      }

      const branch = branches.find((br) => br.id == values.branch_id);
      setClient(curr => ({
        ...curr,
        ...data,
        branch: branch.name,
        client_manager: client_manager,
        client_manager_id: values.client_manager_id,
        client_id: values.client_num
      }));
      setOpen(null);
    } catch (error) {
      console.log(error);
      if (error.message === 'Network Error') {
        actions.setErrors({responseStatus: 'Network Error'});
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({responseStatus: error.response.status, detail: processErrors(error.response.data)});
      } else {
        actions.setErrors({responseStatus: error.response.status});
      }
    }
  }

  const initialValues = {
    ...client,
    client_num: client.client_id,
    email: client.email || '',
    client_manager_id: client.client_manager_id || '',
    home_phone: client.home_phone || '',
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
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, isSubmitting, setFieldValue }) => (
          <Form autoComplete='off'>
            <NonFieldErrors errors={errors}>
              <div className='create_modal_container'>
                <div>
                  <ClientInformation staff={staff} clientControls={clientControls} setFieldValue={setFieldValue}/>
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

const processErrors = (errors) => {
  let {detail} = errors;

  const fieldNames = {
    first_name: 'First Name',
    client_id: 'Client Number',
    last_name: 'Last Name',
    full_name: 'Full Name',
    gender: 'Gender',
    date_of_birth: 'Date Of Birth',
    registration_date: 'Registration Date',
    mobile_number: 'Mobile Number',
    phone_number_secondary: 'Secondary Mobile Number',
    home_phone: 'Home Phone',
    whatsapp_number: 'Whatsapp Number',
    email: 'Email',
    id_num: 'Id Number'
  }

  if (typeof detail === 'string') {
    return detail
  }else if (typeof detail === 'object' && !Array.isArray(detail)) {
    return {
      msg: detail.msg,
      field_name: fieldNames[detail.field_name],
      level: detail.level,
    }
  }

  return detail.map(error => ({
    msg: error.msg,
    field_name: fieldNames[error.field_name],
    level: error.level,
  }));
}

export {processErrors};
export default UpdatePersonalInfo