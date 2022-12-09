import React from 'react';
import { Form, Formik } from 'formik';
import { createTemplateSchema } from './schemas';
import { Modal, CustomInput, NonFieldErrors, ModalSubmit } from '../../../../common';
import { onModalSubmit } from './utils';

const CreateTemplate = ({open, setOpen, setTemplates}) => {
  const initialValues = {id_type: '', issuer: '', template: ''};

  const onSubmit = async (values, actions) => {
    const sideEffect = (jsonResp) => setTemplates(curr => [jsonResp, ...curr]);
    const url = '/clientsapi/add_client_id_template/';
    onModalSubmit(values, 'post', url, actions.resetForm, setOpen, actions.setErrors, sideEffect);
  }

  return (
    <Modal open={open} setOpen={setOpen} title={'Create ID Template'}>
      <Formik initialValues={initialValues} validationSchema={createTemplateSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <CustomInput label='Name' name='id_type' type='text'/>
              <CustomInput label='Issuer' name='issuer' type='text'/>
              <CustomInput label='Format' name='template' type='text'/>
              <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default CreateTemplate;