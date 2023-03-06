import React from 'react';
import { Form, Formik } from 'formik';
import { onModalSubmit } from './utils';
import { addRoleSchema } from './schemas';
import { Modal, NonFieldErrors, CustomInput, CustomCheckbox, ModalSubmit } from '../../../../common';

const CreateRole = ({open, setOpen, setRoles}) => {
  const initialValues = {name: ''};

  const onSubmit = async (values, actions) => {
    const sideEffect = (jsonResp) => setRoles(curr => [jsonResp, ...curr]);
    const url = '/clientsapi/add_group_role/';
    onModalSubmit(values, 'post', url, actions.resetForm, setOpen, actions.setErrors, sideEffect);
  }

  return (
    <Modal open={open} setOpen={setOpen} title={'Create Group Role'}>
      <Formik initialValues={initialValues} validationSchema={addRoleSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className="create_modal_container">
                <div>
                  <CustomInput label='Name' name='name' type='text'/>
                </div>
                <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default CreateRole;