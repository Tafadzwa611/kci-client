import React from 'react';
import { makeRequest } from '../../../utils/utils';
import { Form, Formik } from 'formik';
import {
  DeleteModal,
  DeleteModalDialog,
  NonFieldErrors
} from '../../../common';

function DeleteFieldSet({setOpen, fieldSetId, setFieldSets}) {
  const onSubmit = async (_, actions) => {
    try {
      const response = await makeRequest.delete(`/usersapi/delete_field_set/${fieldSetId}/`, {timeout: 8000});
      if (response.ok) {
        setFieldSets(curr => curr.filter(fs => fs.id != fieldSetId));
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
    <DeleteModal>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({isSubmitting, errors}) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <DeleteModalDialog isSubmitting={isSubmitting} msg='Delete Form' setOpen={setOpen}/>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </DeleteModal>
  )
}

export default DeleteFieldSet;