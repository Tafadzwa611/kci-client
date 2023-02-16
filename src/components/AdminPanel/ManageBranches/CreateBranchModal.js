import React from 'react';
import { Form, Formik } from 'formik';
import { onModalSubmit } from './utils';
import { addBranchSchema } from './schemas';
import { Modal, NonFieldErrors, CustomInput, CustomSelect, ModalSubmit, CustomDatePicker } from '../../../common';

const CreateBranchModal = ({open, setOpen, currencies, setBranches}) => {
    const initialValues = {name: '', geographical_location: '', branch_code: '', date_of_opening: ''};

    const onSubmit = async (values, actions) => {
        const sideEffect = (jsonResp) => setBranches(curr => [jsonResp, ...curr]);
        const url = '/usersapi/add_branch/';
        onModalSubmit(values, 'post', url, actions.resetForm, setOpen, actions.setErrors, sideEffect);
    }

    return (
        <Modal open={open} setOpen={setOpen} title={'Add Branch'}>
            <Formik initialValues={initialValues} validationSchema={addBranchSchema} onSubmit={onSubmit}>
                {({ isSubmitting, errors, setFieldValue}) => (
                <Form>
                    <NonFieldErrors errors={errors}>
                        <div className="create_modal_container">
                            <div>
                                <CustomInput label='Name' name='name' type='text'/>
                                <CustomInput label='Geographical Location' name='geographical_location' type='text'/>
                                <CustomInput label='Branch Code' name='branch_code' type='text'/>
                                <CustomDatePicker label='Date of Opening' setFieldValue={setFieldValue} name='date_of_opening' type='date'/>
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

export default CreateBranchModal;