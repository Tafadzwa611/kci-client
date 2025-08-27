import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Formik } from 'formik';
import {
    Modal,
    ModalSubmit,
    NonFieldErrors,
    CustomInput,
    CustomDatePicker,
    CustomSelect,
    CustomTextField
} from '../../../common';

function Transact({deposit, setDeposit, setModal}) {
    const generateKey = () => (window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random()}`);
    const idemKeyRef = React.useRef(generateKey());

    const onSubmit = async (values, actions) => {
        try {
            const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
            const payload = {
                ...values,
                idempotency_key: idemKeyRef.current,
            };
            const response = await axios.post(`/deposits/${deposit.id}/transact/`, payload, CONFIG);
            setDeposit(curr => ({
                ...curr,
                statement: response.data.statement,
                status: response.data.status,
                balance: response.data.new_balance,
                last_updated: response.data.last_updated
            }));
            setModal(null);
        } catch (error) {
            if (error.message === 'Network Error') {
                actions.setErrors({responseStatus: 'Network Error'});
            } else if (error.response.status >= 400 && error.response.status < 500) {
                actions.setErrors({responseStatus: error.response.status, ...error.response.data});
            } else {
                actions.setErrors({responseStatus: error.response.status});
            }
        }
    }

    const initialValues = {
        transaction_name: '',
        amount: '',
        txn_date: '',
        description: ''
    };

    return (
        <Modal open={true} setOpen={setModal} title='Process Withdrawal'>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ errors, isSubmitting, setFieldValue }) => (
                    <Form>
                        <NonFieldErrors errors={errors}>
                            <div className='create_modal_container'>
                                <div>
                                    <CustomSelect label='Transaction Name' name='transaction_name' required>
                                        <option value=''>------</option>
                                        <option value='Deposit'>Deposit</option>
                                        <option value='Withdrawal'>Withdrawal</option>
                                    </CustomSelect>
                                    <CustomInput label='Transaction Amount' name='amount' type='number' required/>
                                    <CustomDatePicker
                                        label='Transaction Date'
                                        name='txn_date'
                                        setFieldValue={setFieldValue}
                                        required
                                    />
                                    <CustomTextField label='Description' name='description'/>
                                </div>
                                <ModalSubmit isSubmitting={isSubmitting} setOpen={setModal}/>
                            </div>
                        </NonFieldErrors>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}

export default Transact;