import React from 'react';
import { Form, Formik } from 'formik';
import { makeRequest } from '../../../../utils';
import { ActionModal, NonFieldErrors, ActionModalDialog } from '../../../../common';

const DeleteType = ({setOpen, type, setTypes}) => {
  const onSubmit = async (_, actions) => {
    try {
      const response = await makeRequest.delete(`/clientsapi/delete_client_type/${type.id}/`);
      if (response.ok) {
        setTypes(curr => curr.filter(t => t.id != type.id));
        setOpen(false);
      }else {
        if (response.status >= 500) {
          actions.setErrors({responseStatus: response.status});
        }else {
          const jsonErr = await response.json();
          actions.setErrors({responseStatus: response.status, ...jsonErr});
        }
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
                msg={`Delete ${type.name}.`} 
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

export default DeleteType;