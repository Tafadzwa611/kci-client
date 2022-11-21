import React, {useState} from 'react';
import { makeRequest } from '../../../utils/utils';
import { Form, Formik } from 'formik';
import {
  Modal,
  DeleteDialog,
  NonFieldErrors
} from '../../../common';

function DeleteFieldSet({open, setOpen, fieldSetId, setFieldSets}) {
  const [responseStatus, setResponseStatus] = useState();
  const [clientError, setClientError] = useState();

  const onSubmit = async (_, actions) => {
    try {
      const response = await makeRequest.delete(`/usersapi/delete_field_set/${fieldSetId}/`, {timeout: 8000});
      setResponseStatus(response.status);
      if (response.ok) {
        setFieldSets(curr => curr.filter(fs => fs.id != fieldSetId));
        setOpen(false);
      }else {
        const jsonResp = await response.json();
        actions.setErrors(jsonResp);
      }
    }catch(error) {
      setClientError(error);
    }
  }

  return (
    <Modal open={open} setOpen={setOpen} title={'Delete Custom Form '}>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({isSubmitting, errors}) => (
          <Form>
            <NonFieldErrors clientError={clientError} responseStatus={responseStatus}>
              <DeleteDialog isSubmitting={isSubmitting} msg='Form'/>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default DeleteFieldSet;