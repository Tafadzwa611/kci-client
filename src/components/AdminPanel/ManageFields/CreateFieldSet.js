import React, {useState} from 'react';
import { Form, Formik } from 'formik';
import { makeRequest } from '../../../utils/utils';
import { createFieldSetSchema } from './schemas';
import {
  Modal,
  CustomInput,
  CustomSelect,
  CustomTextField,
  SubmitButton,
  NonFieldErrors
} from '../../../common';

const initialValues = {name: '', entity_type: '', field_set_type: '', description: ''};
function CreateFieldSet({open, setOpen, setFieldSets}) {
  const [responseStatus, setResponseStatus] = useState();
  const [clientError, setClientError] = useState();

  const onSubmit = async (values, actions) => {
    try {
      const data = Object.fromEntries(Object.entries(values).filter(([_, v]) => v != ''));
      const response = await makeRequest.post('/usersapi/create_field_set/', data, {timeout: 8000});
      setResponseStatus(response.status);
      const jsonResp = await response.json();
      if (response.ok) {
        setFieldSets(curr => [jsonResp, ...curr]);
        actions.resetForm();
        setOpen(false);
      }else {
        actions.setErrors(jsonResp);
      }
    }catch(error) {
      setClientError(error);
    }
  }

  return (
    <Modal open={open} setOpen={setOpen} title={'Create Custom Form '}>
      <Formik initialValues={initialValues} validationSchema={createFieldSetSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <NonFieldErrors clientError={clientError} responseStatus={responseStatus}>
              <CustomInput label='Name' name='name' type='text'/>
              <CustomSelect label='Associated with' name='entity_type'>
                <option value=''>------</option>
                <option value='CLIENT'>Client</option>
              </CustomSelect>
              <CustomSelect label='Type' name='field_set_type'>
                <option value=''>------</option>
                <option value='SINGLE'>Single</option>
                <option value='MULTIPLE'>Multiple</option>
              </CustomSelect>
              <CustomTextField label='Description' name='description'/>
              <SubmitButton isSubmitting={isSubmitting}/>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default CreateFieldSet;