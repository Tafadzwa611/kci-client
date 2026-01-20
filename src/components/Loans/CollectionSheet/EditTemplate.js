import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { 
  NonFieldErrors, 
  CustomInput, 
  SubmitButton,
  CustomMultiSelect,
  CustomSortableSelect
} from '../../../common';
import { COLUMNS, SWAPPED_COLUMNS } from './CollectionTable';
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
        {...values, columns: values.order.map(column => SWAPPED_COLUMNS[column])},
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
    columns: template.columns.map(column => ({label: COLUMNS[column], value: column})),
    order: template.columns.map(column => COLUMNS[column])
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
              setFieldValue={(name, columns) => {
                setFieldValue(name, columns);
                let newOrder = values.order;
                columns.forEach(column => {
                  if (!newOrder.includes(column.label)) {
                    newOrder.push(column.label);
                  }
                });
                newOrder = newOrder.filter(item => columns.find(column => column.label === item));
                setFieldValue('order', newOrder);
              }}
              options={columns.map(column => ({label: COLUMNS[column], value: column}))}
            />
            <CustomSortableSelect
              label='Column Order'
              setFieldValue={(name, items) => setFieldValue(name, items)}
              name='order'
              options={values.order}
            />
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

export default EditTemplate;