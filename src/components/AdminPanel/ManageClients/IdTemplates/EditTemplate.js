import React from 'react';
import { Form, Formik } from 'formik';
import { onModalSubmit } from './utils';
import { editTemplateSchema } from './schemas';
import { Modal, CustomInput, CustomCheckbox, ModalSubmit, NonFieldErrors } from '../../../../common';

const EditTemplate = ({open, setOpen, template, setTemplates}) => {
  const onSubmit = async (values, actions) => {
    const sideEffect = (jsonResp) => setTemplates(curr => [jsonResp, ...curr.filter(f => f.id != jsonResp.id)]);
    const url = `/clientsapi/update_client_id_template/${template.id}/`;
    onModalSubmit(values, 'patch', url, actions.resetForm, setOpen, actions.setErrors, sideEffect);
  }

  return (
    <Modal open={open} setOpen={setOpen} title={'Update Custom Field'}>
      <Formik initialValues={template} validationSchema={editTemplateSchema} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <CustomInput label='Name' name='id_type' type='text'/>
              <CustomInput label='Issuer' name='issuer' type='text'/>
              <CustomCheckbox label='Is Active' name='is_active'/>
              <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default EditTemplate;