import React from 'react';
import { Form, Formik } from 'formik';
import { onModalSubmit } from './utils';
import { createFieldSetSchema } from './schemas';
import {Modal, CustomInput, CustomSelect, CustomTextField, SubmitButton, NonFieldErrors} from '../../../common';

function CreateFieldSet({open, setOpen, setFieldSets, entityType}) {
  const initialValues = {name: '', entity_type: entityType, field_set_type: '', description: ''};

  const getPayload = (values) => {
    return {
      name: values.name,
      entity_type: values.entity_type,
      field_set_type: values.field_set_type,
      ...(values.description != '') && {description: values.description}
    };
  }

  const onSubmit = async (values, actions) => {
    const sideEffect = (jsonResp) => setFieldSets(curr => [jsonResp, ...curr]);
    const data = getPayload(values);
    const url = '/usersapi/create_field_set/';
    onModalSubmit(data, 'post', url, actions.resetForm, setOpen, actions.setErrors, sideEffect);
  }

  return (
    <Modal open={open} setOpen={setOpen} title={'Create Custom Form '}>
      <Formik initialValues={initialValues} validationSchema={createFieldSetSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <CustomSelect label='Associated with' name='entity_type' disabled={true}>
                <option value=''>------</option>
                <option value='CLIENT'>Clients</option>
                <option value='LOAN'>Loans</option>
              </CustomSelect>
              <CustomInput label='Form Name' name='name' type='text'/>
              <CustomSelect label='Form Type' name='field_set_type'>
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