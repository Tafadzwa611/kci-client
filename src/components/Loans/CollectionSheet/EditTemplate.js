import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { 
  NonFieldErrors, 
  CustomInput, 
  SubmitButton,
  CustomMultiSelect
} from '../../../common';
import { COLUMNS } from './CollectionTable';
import Cookies from 'js-cookie';

const EditTemplate = ({data}) => {
  const [columns] = data;
  const navigate = useNavigate();
  const {templateId} = useParams();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`/usersapi/report_template/${templateId}/`);
        setTemplate(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetch()
  }, []);

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.put(
        `/usersapi/edit_report_template/${templateId}/`,
        {...values, columns: values.columns.map(column => column.value)},
        CONFIG
      );
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

  if (!template) {
    return <div>Loading...</div>
  }

  const initialValues = {
    report_name: template.report_name,
    columns: template.columns.map(column => ({label: COLUMNS[column], value: column}))
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, isSubmitting, setFieldValue, errors }) => (
        <Form>
          <NonFieldErrors errors={errors}>
            <div className='divider divider-info'>
              <span>Template Information</span>
            </div>
            <CustomInput label='Template Name' name='report_name' type='text' required/>
            <CustomMultiSelect
              label='Columns'
              name='columns'
              initVals={values.columns}
              setFieldValue={setFieldValue}
              options={columns.map(column => ({label: COLUMNS[column], value: column}))}
            />
            <SubmitButton isSubmitting={isSubmitting}/>
          </NonFieldErrors>
        </Form>
      )}
    </Formik>
  )
}

export default EditTemplate;