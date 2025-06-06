import React from 'react';
import { Modal, CustomInput, NonFieldErrors, ModalSubmit } from '../../../common';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';

function Restructure({loan, setOpen, setLoan}) {
    const onSubmit = async (values, actions) => {
        try {
            const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
            const response = await axios.post(`/loansapi/restructure/${loan.id}/`, values, CONFIG);
            const newLoan = response.data;
            setLoan(newLoan);
            setOpen(false);
        } catch (error) {
            console.error('Error during restructuring:', error);
            if (error.message === 'Network Error') {
                actions.setErrors({responseStatus: 'Network Error'});
            } else if (error.response && error.response.status >= 400 && error.response.status < 500) {
                actions.setErrors({responseStatus: error.response.status, ...error.response.data});
            } else {
                actions.setErrors({responseStatus: error.response ? error.response.status : 'Unknown Error'});
            }
            return;
        }
    }

    return (
        <Modal open={true} setOpen={setOpen} title='Move Ahead'>
            <Formik initialValues={{number_of_days: ''}} onSubmit={onSubmit}>
                {({ errors, isSubmitting }) => (
                    <Form>
                        <NonFieldErrors errors={errors}>
                            <div className='create_modal_container'>
                                <div>
                                    <CustomInput
                                        label='Number Of Days'
                                        name='number_of_days'
                                        type='number'
                                        min='1'
                                        step='1'
                                        required
                                    />
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

export default Restructure;