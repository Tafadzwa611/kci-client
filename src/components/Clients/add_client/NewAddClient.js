import React from 'react';
import { Formik } from 'formik';
import FormStepper from './FormStepper';
import { createClientSchema } from './schemas';
import { Fetcher } from '../../../common';
import NewClient from './NewClient';
import ClientInformation from './ClientInformation';

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
const NewAddClient = () => {
  const onSubmit = () => {
    console.log('onSubmit');
  }

  return (
    <Fetcher urls={['/usersapi/list_field_sets/?entity_type=CLIENT', '/clientsapi/client_types/']}>
      {({data}) => (
        <Formik initialValues={initialValues} validationSchema={createClientSchema} onSubmit={onSubmit}>
          {({ isSubmitting, errors }) => (
            <FormStepper isSubmitting={isSubmitting} errors={errors} customForms={data[0]}>
              <ClientInformation clientTypes={data[1]}/>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              {/* {data[0].map(form => <div key={form.id}>{form.name}</div>)} */}
              <div>5</div>
            </FormStepper>
          )}
        </Formik>
      )}
    </Fetcher>
  )
}

export default NewAddClient;