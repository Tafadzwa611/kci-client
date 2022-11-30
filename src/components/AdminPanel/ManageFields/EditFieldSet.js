import React from 'react';
import { onModalSubmit } from './utils';
import { Form, Formik } from 'formik';
import { updateFieldSetSchema } from './schemas';
import { Modal, CustomInput, CustomCheckbox, CustomTextField, SubmitButton, NonFieldErrors} from '../../../common';

function EditFieldSet({open, setOpen, fieldSet, setFieldSets}) {
  const initialValues = {name: fieldSet.name, active: fieldSet.active, description: fieldSet.description ?? ''};

  const getPayload = (values) => {
    return {name: values.name, active: values.active, ...(values.description != '') && {description: values.description}};
  }

  const onSubmit = async (values, actions) => {
    const sideEffect = (jsonResp) => setFieldSets(curr => [...curr.filter(fs => fs.id != fieldSet.id), jsonResp]);
    const data = getPayload(values);
    const url = `/usersapi/update_field_set/${fieldSet.id}/`;
    onModalSubmit(data, 'patch', url, actions.resetForm, setOpen, actions.setErrors, sideEffect);
  }

  return (
    <Modal open={open} setOpen={setOpen} title={'Update Custom Form'}>
      <Formik initialValues={initialValues} validationSchema={updateFieldSetSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form>
            <NonFieldErrors errors={errors}>
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