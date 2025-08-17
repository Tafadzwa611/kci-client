import React from 'react';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ModalActionSubmit, NonFieldErrors, ActionModal } from '../../../common';

function ToggleActivation({product, setProduct, setOpen}) {
    const onSubmit = async (values, actions) => {
        try {
            const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
            const resp = await axios.patch(`/deposits/${product.id}/active/`, values, CONFIG);
            setProduct(curr => ({...curr, active: resp.data.active}));
            setOpen();
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

    const modalText = product.active ? '' : 'add'; 

    return (
        <ActionModal text={modalText}>
            <Formik initialValues={{active: !product.active}} onSubmit={onSubmit}>
                {({ errors, isSubmitting }) => (
                    <Form>
                        <NonFieldErrors errors={errors}>
                            {product.active ? (
                                <div className='title' style={{fontSize: '0.875rem'}}>
                                    Are you sure you want to deactivate this product.
                                </div>
                            ) : (
                                <div className='title' style={{fontSize: '0.875rem'}}>
                                    Are you sure you want to activate this product.
                                </div>
                            )}
                            <ModalActionSubmit text={modalText} isSubmitting={isSubmitting} setOpen={setOpen} act='Yes'/>
                        </NonFieldErrors>
                    </Form>
                )}
            </Formik>
        </ActionModal>
    )
}

export default ToggleActivation;