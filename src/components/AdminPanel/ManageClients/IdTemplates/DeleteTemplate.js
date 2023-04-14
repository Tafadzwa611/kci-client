import React from 'react';
import { Form, Formik } from 'formik';
import { makeRequest } from '../../../../utils';
import { NonFieldErrors, ActionModal, ActionModalDialog } from '../../../../common';

const DeleteTemplate = ({setOpen, template, setTemplates}) => {
  const onSubmit = async (_, actions) => {
    try {
      const response = await makeRequest.delete(`/clientsapi/delete_client_id_template/${template.id}/`);
      if (response.ok) {
        setTemplates(curr => curr.filter(t => t.id != template.id));
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
    <ActionModal setOpen={setOpen} title={'Delete Template'}>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({isSubmitting, errors}) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <ActionModalDialog 
                isSubmitting={isSubmitting} 
                msg={`Delete ${template.id_type}.`} 
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

export default DeleteTemplate;