import React, {useState} from 'react';
import { Form, Formik } from 'formik';
import { dataTypes } from './data';
import { makeRequest } from '../../../utils/utils';
import { createFieldSchema } from './schemas';
import {
  Modal,
  CustomInput,
  CustomCheckbox,
  CustomSelect,
  SubmitButton,
  NonFieldErrors,
  CustomTypeAndAdd
} from '../../../common';

const initialValues = {name: '', data_type: '', text_format: '', select_opts: []};
const CreateField = ({open, setOpen, setFields, fieldSetId}) => {
  const [responseStatus, setResponseStatus] = useState();
  const [clientError, setClientError] = useState();

  const onSubmit = async (values, actions) => {
    const filteredValues = Object.fromEntries(Object.entries(values).filter(([_, v]) => v.length > 0));
    const data = {...filteredValues, field_set_id: fieldSetId};
    try {
      const response = await makeRequest.post('/usersapi/create_field/', data, {timeout: 8000});
      setResponseStatus(response.status);
      const jsonResp = await response.json();
      if (response.ok) {
        setFields(curr => [jsonResp, ...curr]);
        actions.resetForm();
        setOpen(false);
      }else {
        actions.setErrors(jsonResp);
      }
    }catch(error) {
      setClientError(error);
    }
  }

  return (
    <Modal open={open} setOpen={setOpen} title={'Create Custom Field'}>
      <Formik initialValues={initialValues} validationSchema={createFieldSchema} onSubmit={onSubmit}>
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <NonFieldErrors clientError={clientError} responseStatus={responseStatus}>
              <CustomInput label='Name' name='name' type='text'/>
              <CustomSelect label='Data Type' name='data_type'>
                <option value=''>------</option>
                {Object.keys(dataTypes).map(key => <option key={key} value={key}>{dataTypes[key]}</option>)}
              </CustomSelect>
              <CustomCheckbox label='Is Mandatory' name='is_required'/>
              {values.data_type === 'free_text' && <CustomInput label='Text Format' name='text_format' type='text'/>}
              {values.data_type === 'select' &&
                <CustomTypeAndAdd
                  field='select_opts'
                  values={values.select_opts}
                  setFieldValue={setFieldValue}
                  label='Select Options'/>}
              <SubmitButton isSubmitting={isSubmitting}/>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default CreateField;