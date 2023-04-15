import React from 'react';
import { makeRequest } from '../../../utils/utils';
import { Form, Formik } from 'formik';
import {ActionModal, ActionModalDialog, NonFieldErrors} from '../../../common';

const DeleteField = ({setOpen, field, setFields}) => {
  const onSubmit = async (_, actions) => {
    try {
      const response = await makeRequest.delete(`/usersapi/delete_field/${field.id}/`, {timeout: 8000});
      if (response.ok) {
        setFields(curr => curr.filter(f => f.id != field.id));
        setOpen(false);
      }else {
        const jsonResp = await response.json();
        actions.setErrors({responseStatus: response.status, ...jsonResp});
      }
    }catch(error) {
      actions.setErrors({clientError: error});
    }
  }

  return (
    <ActionModal>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({isSubmitting, errors}) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <ActionModalDialog 
                isSubmitting={isSubmitting} 
                msg={`Delete ${field.name} field.`} 
                setOpen={setOpen}
                act={'Delete'}
              />
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

export default DeleteField;