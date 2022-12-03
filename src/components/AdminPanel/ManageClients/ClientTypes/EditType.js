import React from 'react';
import { Form, Formik } from 'formik';
import { onModalSubmit } from './utils';
import { editTypeSchema } from './schemas';
import { Modal, NonFieldErrors, CustomInput, CustomCheckbox, SubmitButton } from '../../../../common';

const EditType = ({open, setOpen, type, setTypes}) => {
  const onSubmit = async (values, actions) => {
    const sideEffect = (jsonResp) => setTypes(curr => {
      return curr.map(type => {
        if (type.id==jsonResp.id) {
          return jsonResp
        }
        return type
      })
    });
    const url = `/clientsapi/update_client_type/${type.id}/`;
    onModalSubmit(values, 'patch', url, actions.resetForm, setOpen, actions.setErrors, sideEffect);
  }

  return (
    <Modal open={open} setOpen={setOpen} title={'Update Client Type'}>
      <Formik initialValues={type} validationSchema={editTypeSchema} onSubmit={onSubmit}>
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

export default EditType;