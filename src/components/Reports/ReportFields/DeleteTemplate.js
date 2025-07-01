import React from 'react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { NonFieldErrors, SubmitButton } from '../../../common';
import Cookies from 'js-cookie';

const DeleteTemplate = ({templateId, setView, setTemplateIdDelete, setTemplates}) => {
    const onSubmit = async (_, actions) => {
        try {
            const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
            await axios.delete(`/usersapi/delete_report_template/${templateId}/`, CONFIG);
            setTemplates(curr => curr.filter(template => template.id !== templateId));
            setTemplateIdDelete(null);
            setView('list');
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

    const back = () => {
        setTemplateIdDelete(null);
        setView('list');
    }

    return (
        <>
            <button>
                <a onClick={back} className="btn btn-default client__details" style={{borderRadius:"0"}}>
                    Back
                </a>
            </button>
            <Formik initialValues={{}} onSubmit={onSubmit}>
                {({ isSubmitting, errors }) => (
                    <Form>
                        <NonFieldErrors errors={errors}>
                            <div>Are you sure you want delete this template?</div>
                            <div style={{paddingTop: '1rem'}}></div>
                            <div style={{display:'flex', justifyContent: 'flex-end'}}>
                                <SubmitButton isSubmitting={isSubmitting}/>
                            </div>
                        </NonFieldErrors>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default DeleteTemplate;