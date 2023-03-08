import React from 'react';
import { Form, Formik } from 'formik';
import { onModalSubmit } from './utils';
import { addRoleSchema } from './schemas';
import { Modal, NonFieldErrors, CustomInput, CustomSelect, ModalSubmit, CustomDatePicker } from '../../../../../common';

const CreateStaffRoleModal = ({open, setOpen, setRoles}) => {
    const initialValues = {role: ''};

    const onSubmit = async (values, actions) => {
        const sideEffect = (jsonResp) => setRoles(curr => [jsonResp, ...curr]);
        const url = '/usersapi/add_staff_role/';
        onModalSubmit(values, 'post', url, actions.resetForm, setOpen, actions.setErrors, sideEffect);
    }

    return (
        <Modal open={open} setOpen={setOpen} title={'Add Staff Role'}>
            <Formik initialValues={initialValues} validationSchema={addRoleSchema} onSubmit={onSubmit}>
                {({ isSubmitting, errors}) => (
                <Form>
                    <NonFieldErrors errors={errors}>
                        <div className="create_modal_container">
                            <div>
                                <CustomInput label='Role' name='role' type='text'/>
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

export default CreateStaffRoleModal;