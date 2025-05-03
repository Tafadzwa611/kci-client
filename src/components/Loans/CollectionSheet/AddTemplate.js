import React from 'react';
import Cookies from 'js-cookie';
import { Form, Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { COLUMNS } from './CollectionTable';
import { 
  NonFieldErrors, 
  CustomInput, 
  SubmitButton,
  CustomMultiSelect,
  CustomSortableSelect
} from '../../../common';

const AddTemplate = ({data}) => {
  const [columns] = data;
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.post(
        '/usersapi/add_report_template/',
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

  return (
    <Formik initialValues={{report_type: 'COLLECTION_SHEET', report_name: '', columns: [], order: []}} onSubmit={onSubmit}>
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
              setFieldValue={(name, items) => console.log(items)}
              name='order'
              options={values.order}
            />
            <SubmitButton isSubmitting={isSubmitting}/>
          </NonFieldErrors>
        </Form>
      )}
    </Formik>
  )
}

export default AddTemplate;