import React from 'react';
import { Form, Formik } from 'formik';
import {
    NonFieldErrors,
    CustomInput,
    CustomDatePicker,
    ModalSubmit,
    Modal
} from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';


function WaiveInterest({loanId, setLoan, setOpen}) {
    const onSubmit = async (values, actions) => {
        try {
            const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
            const response = await axios.post(`/loansapi/waive_interest/${loanId}/`, values, CONFIG);
            const updates = response.data;
            setLoan(curr => ({...curr, ...updates}));
            setOpen(false);
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

    return (
        <Modal open={true} setOpen={setOpen} title='Waive Interest'>
            <Formik initialValues={{amount_waived: '', payment_date: ''}} onSubmit={onSubmit}>
                {({ errors, isSubmitting, setFieldValue }) => (
                    <Form>
                        <NonFieldErrors errors={errors}>
                            <div className='create_modal_container'>
                                <div>
                                    <CustomInput label='Amount Reversed' name='amount_waived' type='number' required/>
                                    <CustomDatePicker label='Reversal Date' name='value_date' setFieldValue={setFieldValue} required/>
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

export default WaiveInterest