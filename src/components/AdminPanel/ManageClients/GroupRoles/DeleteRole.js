import React from 'react';
import { Form, Formik } from 'formik';
import { makeRequest } from '../../../../utils';
import { ActionModal, NonFieldErrors, ActionModalDialog } from '../../../../common';

const DeleteRole = ({setOpen, role, setRoles}) => {
  const onSubmit = async (_, actions) => {
    try {
      const response = await makeRequest.delete(`/clientsapi/delete_group_role/${role.id}/`);
      if (response.ok) {
        setRoles(curr => curr.filter(t => t.id != role.id));
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
                msg={`Delete ${role.name}.`} 
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

export default DeleteRole;