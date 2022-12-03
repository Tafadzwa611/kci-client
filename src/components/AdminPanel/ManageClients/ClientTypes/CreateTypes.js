import React from 'react';
import { Form, Formik } from 'formik';
import { onModalSubmit } from './utils';
import { addTypeSchema } from './schemas';
import { Modal, NonFieldErrors, CustomInput, CustomCheckbox, SubmitButton } from '../../../../common';

const CreateTypes = ({open, setOpen, setTypes}) => {
  const initialValues = {name: '', allow_opening_loan_accounts: false, allow_as_guarantor: false};

  const onSubmit = async (values, actions) => {
    const sideEffect = (jsonResp) => setTypes(curr => [jsonResp, ...curr]);
    const url = '/clientsapi/add_client_type/';
    onModalSubmit(values, 'post', url, actions.resetForm, setOpen, actions.setErrors, sideEffect);
  }

  return (
    <Modal open={open} setOpen={setOpen} title={'Create ID Template'}>
      <Formik initialValues={initialValues} validationSchema={addTypeSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <CustomInput label='Name' name='name' type='text'/>
              <CustomCheckbox label='Allow opening accounts' name='allow_opening_loan_accounts'/>
              <CustomCheckbox label='Allow as guarantor' name='allow_as_guarantor'/>
              <SubmitButton isSubmitting={isSubmitting}/>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default CreateTypes;