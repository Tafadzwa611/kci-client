import React from 'react';
import { makeRequest } from '../../../utils/utils';
import { Form, Formik } from 'formik';
import {
  ActionModal,
  ActionModalDialog,
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
    <ActionModal>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({isSubmitting, errors}) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <ActionModalDialog 
                isSubmitting={isSubmitting} 
                msg='Delete Form' 
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

export default DeleteFieldSet;