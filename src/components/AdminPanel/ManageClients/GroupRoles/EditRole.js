import React from 'react';
import { Form, Formik } from 'formik';
import { onModalSubmit } from './utils';
import { editRoleSchema } from './schemas';
import { Modal, NonFieldErrors, CustomInput, CustomCheckbox, ModalSubmit } from '../../../../common';

const EditRole = ({open, setOpen, role, setRoles}) => {
  const onSubmit = async (values, actions) => {
    const sideEffect = (jsonResp) => setRoles(curr => {
      return curr.map(role => {
        if (role.id==jsonResp.id) {
          return jsonResp
        }
        return role
      })
    });
    const url = `/clientsapi/update_group_role/${role.id}/`;
    onModalSubmit(values, 'patch', url, actions.resetForm, setOpen, actions.setErrors, sideEffect);
  }

  return (
    <Modal open={open} setOpen={setOpen} title={'Update Group Role'}>
      <Formik initialValues={role} validationSchema={editRoleSchema} onSubmit={onSubmit}>
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

export default EditRole;