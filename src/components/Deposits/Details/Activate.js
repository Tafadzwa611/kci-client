import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Formik } from 'formik';
import {
    Modal,
    ModalSubmit,
    NonFieldErrors,
    CustomDatePicker
} from '../../../common';

function Activate({deposit, setDeposit, setModal}) {
    const onSubmit = async (values, actions) => {
        try {
            const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
            const response = await axios.patch(`/deposits/${deposit.id}/activate/`, values, CONFIG);
            setDeposit(curr => ({...curr, status: response.data.status, account_date: response.data.account_date}));
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

    return (
        <Modal open={true} setOpen={setModal} title={'Activate Deposit Account'}>
            <Formik initialValues={{account_date: ''}} onSubmit={onSubmit}>
                {({ errors, isSubmitting, setFieldValue }) => (
                    <Form>
                        <NonFieldErrors errors={errors}>
                            <div className='create_modal_container'>
                                <div>
                                    <CustomDatePicker
                                        label='Account Activation Date'
                                        name='account_date'
                                        setFieldValue={setFieldValue}
                                        required
                                    />
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

export default Activate;