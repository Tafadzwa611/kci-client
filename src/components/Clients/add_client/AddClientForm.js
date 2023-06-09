import React from 'react';
import { Formik, Form } from 'formik';
import { NonFieldErrors } from '../../../common';
import FormStepper from './FormStepper';
import ClientInformation from './ClientInformation';
import CustomForm from './CustomForm';
import Addresses from './Addresses';
import NextOfKin from './NextOfKin';
import ClientId from './ClientId';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../utils/utils';
import { useNavigate } from 'react-router-dom';

function AddClientForm({customForms, clientTypes, idTemplates}) {
  const initialValues = {
    client_type_id: '',
    first_name: '',
    last_name: '',
    gender: '',
    date_of_birth: '',
    registration_date: '',
    mobile_number: {},
    phone_number_secondary: {},
    home_phone: '',
    whatsapp_number: {},
    email: '',
    address_list: [],
    next_of_kin_list: [],
    id_nums: [],
  };

  customForms.forEach(form => {
    form.fields.forEach(field => {
      initialValues[`custom_${field.id}`] = '';
    })
  });

  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    const data = processValues(values, customForms);
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post('/clientsapi/add_client/', data, CONFIG);
      console.log(response.data);
      navigate({pathname: `/clients/viewclients/clientdetails/${response.data.client_id}`});
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
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting, errors, values, setFieldValue }) => (
        <Form>
          <NonFieldErrors errors={errors}>
            <FormStepper isSubmitting={isSubmitting} errors={errors} customForms={customForms} client_type_id={values.client_type_id}>
              <ClientInformation clientTypes={clientTypes} setFieldValue={setFieldValue}/>
              <Addresses address_list={values.address_list} setFieldValue={setFieldValue}/>
              <NextOfKin next_of_kin_list={values.next_of_kin_list} setFieldValue={setFieldValue}/>
              <ClientId id_nums={values.id_nums} setFieldValue={setFieldValue} idTemplates={idTemplates}/>
              {customForms.map(form => {
                if (form.client_type_id == values.client_type_id) {
                  return (
                    <React.Fragment key={form.id}>
                      <CustomForm form={form} setFieldValue={setFieldValue}/>
                    </React.Fragment>
                  )
                }
              })}
              <div>Overview</div>
            </FormStepper>
          </NonFieldErrors>
        </Form>
      )}
    </Formik>
  )
}

const processValues = (values, customForms) => {
  const applicableForms = customForms.filter(form => form.client_type_id == values.client_type_id);
  const custom_data = applicableForms.map(form => {
    const data = form.fields.map(field => ({'field_id': field.id, [field.data_type]: values[`custom_${field.id}`]}));
    return {'field_set_id': form.id, 'data': data}
  });
  values.next_of_kin_list = values.next_of_kin_list.map(nok => ({...nok, phone_number: `${nok.phone_number.countryCode} ${nok.phone_number.phoneNumber}`}));
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
  let data = {...values, ...phoneNumbers, custom_data};
  data = removeEmptyValues(data);
  return data
}

export default AddClientForm;
