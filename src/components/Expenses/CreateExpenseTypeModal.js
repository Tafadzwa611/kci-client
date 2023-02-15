import React from 'react';
import { Form, Formik } from 'formik';
import { onModalSubmit } from './utils';
import { addExpenseTypeSchema } from './schemas';
import { Modal, NonFieldErrors, CustomInput, CustomSelect, ModalSubmit, CustomDatePicker } from '../../common';

const CreateExpenseTypeModal = ({open, setOpen, currencies, setExpenseTypes}) => {
    const initialValues = {name: '', date_of_account: '', currency_id: ''};

    const onSubmit = async (values, actions) => {
        const sideEffect = (jsonResp) => setExpenseTypes(curr => [jsonResp, ...curr]);
        const url = '/expensesapi/add_expense_type/';
        onModalSubmit(values, 'post', url, actions.resetForm, setOpen, actions.setErrors, sideEffect);
    }

    return (
        <Modal open={open} setOpen={setOpen} title={'Add Expense Type'}>
            <Formik initialValues={initialValues} validationSchema={addExpenseTypeSchema} onSubmit={onSubmit}>
                {({ isSubmitting, errors, setFieldValue}) => (
                <Form>
                    <NonFieldErrors errors={errors}>
                        <div className="create_modal_container">
                            <div>
                                <CustomInput label='Name' name='name' type='text'/>
                                <CustomDatePicker label='Date of Account' setFieldValue={setFieldValue} name='date_of_account' type='date'/>
                                <CustomSelect label='Currency' name='currency_id'>
                                    <option value=''>------</option>
                                    {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                                </CustomSelect>
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

export default CreateExpenseTypeModal;