import React from 'react';
import { Form, Formik } from 'formik';
import { dataTypes } from './data';
import { createFieldSchema } from './schemas';
import { onModalSubmit } from './utils';
import {
  Modal,
  CustomInput,
  CustomCheckbox,
  CustomSelect,
  ModalSubmit,
  NonFieldErrors,
  CustomTypeAndAdd
} from '../../../common';

const CreateField = ({open, setOpen, setFields, fieldSetId}) => {
  const initialValues = {name: '', data_type: '', text_format: '', select_opts: [], is_required: false};

  const getPayload = (values) => {
    return {
      name: values.name,
      data_type: values.data_type,
      is_required: values.is_required,
      field_set_id: fieldSetId,
      ...(values.text_format != '') && {text_format: values.text_format},
      ...(values.select_opts.length > 0) && {select_opts: values.select_opts}
    };
  }

  const onSubmit = async (values, actions) => {
    const sideEffect = (jsonResp) => setFields(curr => [jsonResp, ...curr]);
    const data = getPayload(values);
    const url = '/usersapi/create_field/';
    onModalSubmit(data, 'post', url, actions.resetForm, setOpen, actions.setErrors, sideEffect);
  }

  return (
    <Modal open={open} setOpen={setOpen} title={'Create Custom Field'}>
      <Formik initialValues={initialValues} validationSchema={createFieldSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors, values, setFieldValue }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className="create_modal_container">
                <div>
                  <CustomInput label='Name' name='name' type='text'/>
                  <CustomSelect label='Data Type' name='data_type'>
                    <option value=''>------</option>
                    {Object.keys(dataTypes).map(key => <option key={key} value={key}>{dataTypes[key]}</option>)}
                  </CustomSelect>
                  <CustomCheckbox label='Is Mandatory' name='is_required'/>
                  {values.data_type === 'free_text' && <CustomInput label='Text Format' name='text_format' type='text'/>}
                  {values.data_type === 'select' &&
                    <CustomTypeAndAdd
                      name='select_opts'
                      values={values.select_opts}
                      setFieldValue={setFieldValue}
                      label='Select Options'/>}
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

export default CreateField;