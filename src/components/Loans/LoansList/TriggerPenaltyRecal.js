import React from 'react';
import {
    NonFieldErrors,
    ActionModal,
    ActionModalDialog
} from '../../../common';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';

function TriggerPenaltyRecal({loan, setOpen}) {
    const onSubmit = async (_, actions) => {
        try {
            const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
            await axios.get(`/loansapi/trigger_recalculation/${loan.id}/`, CONFIG);
            setOpen(false);
        } catch (error) {
            console.log(error);
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
        <ActionModal open={true} setOpen={setOpen} title='Trigger Penalty Recalculation'>
            <Formik initialValues={{}} onSubmit={onSubmit}>
                {({ errors, isSubmitting }) => (
                    <Form>
                        <NonFieldErrors errors={errors}>
                            <ActionModalDialog
                                isSubmitting={isSubmitting}
                                msg='Are you sure you want to trigger penalty recalculation?'
                                setOpen={setOpen}
                                act='Trigger'
                            />
                        </NonFieldErrors>
                    </Form>
                )}
            </Formik>
        </ActionModal>
    )
}

export default TriggerPenaltyRecal;