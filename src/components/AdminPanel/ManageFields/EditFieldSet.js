import React, {useState} from 'react';
import { makeRequest } from '../../../utils/utils';
import { Form, Formik } from 'formik';
import { updateFieldSetSchema } from './schemas';
import {
  Modal,
  CustomInput,
  CustomCheckbox,
  CustomTextField,
  SubmitButton,
  NonFieldErrors
} from '../../../common';

function EditFieldSet({open, setOpen, fieldSet, setFieldSets}) {
  const [responseStatus, setResponseStatus] = useState();
  const [clientError, setClientError] = useState();

  const onSubmit = async (values, actions) => {
    try {
      const data = Object.fromEntries(Object.entries(values).filter(([_, v]) => ![null, ''].includes(v)));
      const response = await makeRequest.patch(`/usersapi/update_field_set/${fieldSet.id}/`, data, {timeout: 8000});
      setResponseStatus(response.status);
      const jsonResp = await response.json();
      if (response.ok) {
        setFieldSets(curr =>  [...curr.filter(fs => fs.id != fieldSet.id), jsonResp]);
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
    <Modal open={open} setOpen={setOpen} title={'Update Custom Form '}>
      <Formik initialValues={fieldSet} validationSchema={updateFieldSetSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <NonFieldErrors clientError={clientError} responseStatus={responseStatus}>
              <CustomInput label='Name' name='name' type='text'/>
              <CustomTextField label='Description' name='description'/>
              <CustomCheckbox label='Active' name='active'/>
              <SubmitButton isSubmitting={isSubmitting}/>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default EditFieldSet;