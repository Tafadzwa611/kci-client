import React from 'react';
import { Formik } from 'formik';
import FormStepper from './FormStepper';
import { createClientSchema } from './schemas';
import ClientInformation from './ClientInformation';
import CustomForm from './CustomForm';

function AddClientForm({customForms, clientTypes}) {
  const initialValues = {
    client_type_id: '',
    first_name: '',
    last_name: '',
    gender: '',
    date_of_birth: '',
    registration_date: '',
    mobile_number: '',
    phone_number_secondary: '',
    home_phone: '',
    whatsapp_number: '',
    email: '',
  };

  // add custom fields to initialValues object.
  customForms.forEach(form => {
    form.fields.forEach(field => {
      initialValues[`custom_${field.id}`] = '';
    })
  });

  const onSubmit = (values, actions) => {
    const data = processValues(values, customForms);
    console.log(data);
    actions.setSubmitting(false);
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting, errors, values, setFieldValue }) => (
        <FormStepper isSubmitting={isSubmitting} errors={errors} customForms={customForms} client_type_id={values.client_type_id}>
          <ClientInformation clientTypes={clientTypes} setFieldValue={setFieldValue}/>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          {customForms.map(form => {
            if (form.client_type_id == values.client_type_id) {
              return (
                <React.Fragment key={form.id}>
                  <CustomForm form={form}/>
                </React.Fragment>
              )
            }
          })}
          <div>Overview</div>
        </FormStepper>
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
  return {...values, custom_data}
}

export default AddClientForm;
