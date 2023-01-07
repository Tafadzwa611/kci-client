import React from 'react';
import { Form, Formik } from 'formik';
import { updateFieldSchema } from './schemas';
import { onModalSubmit } from './utils';
import {
  Modal,
  CustomInput,
  CustomCheckbox,
  CustomTypeAndAdd,
  ModalSubmit,
  NonFieldErrors
} from '../../../common';

const EditField = ({open, setOpen, field, setFields}) => {
  const initialValues = {
    name: field.name,
    data_type: field.data_type,
    text_format: field.text_format ?? '',
    select_opts: field.select_opts ?? [],
    is_required: field.is_required
  };

  const getPayload = (values) => {
    return {
      name: values.name,
      is_required: values.is_required,
      ...(values.text_format != '') && {text_format: values.text_format},
      ...(values.select_opts.length > 0) && {select_opts: values.select_opts}
    };
  }

  const onSubmit = async (values, actions) => {
    const sideEffect = (jsonResp) => setFields(curr => [jsonResp, ...curr.filter(f => f.id != jsonResp.id)]);
    const data = getPayload(values);
    const url = `/usersapi/update_field/${field.id}/`;
    onModalSubmit(data, 'patch', url, actions.resetForm, setOpen, actions.setErrors, sideEffect);
  }

  return (
    <Modal open={open} setOpen={setOpen} title={'Update Custom Field'}>
      <Formik initialValues={initialValues} validationSchema={updateFieldSchema} onSubmit={onSubmit}>
        {({ errors, values, isSubmitting, setFieldValue }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <CustomInput label='Name' name='name' type='text'/>
              <CustomCheckbox label='Is Mandatory' name='is_required'/>
              {values.data_type === 'free_text' && <CustomInput label='Text Format' name='text_format' type='text'/>}
              {values.data_type === 'select' &&
                <CustomTypeAndAdd
                  name='select_opts'
                  values={values.select_opts}
                  setFieldValue={setFieldValue}
                  label='Select Options'/>}
              <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default EditField;