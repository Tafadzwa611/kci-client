import React from 'react';
import { makeRequest } from '../../../utils/utils';
import { Form, Formik } from 'formik';
import {Modal, DeleteDialog, NonFieldErrors} from '../../../common';

const DeleteField = ({open, setOpen, field, setFields}) => {
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
    <Modal open={open} setOpen={setOpen} title={'Delete Custom Field'}>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({isSubmitting, errors}) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <DeleteDialog isSubmitting={isSubmitting} msg={`Delete ${field.name} field.`}/>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default DeleteField;