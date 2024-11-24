import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  SubmitButton
} from '../../../common';
import Cookies from 'js-cookie';

const DeleteTemplate = () => {
  const navigate = useNavigate();
  const {templateId} = useParams();

  const onSubmit = async (_, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.delete(`/usersapi/delete_report_template/${templateId}/`, CONFIG);
      navigate({pathname: '/loans/viewloans/collection_sheet/templates'});
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
  )
}

export default DeleteTemplate;