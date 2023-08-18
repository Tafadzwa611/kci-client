import React from 'react';
import { Form, Formik } from 'formik';
import { onModalSubmit } from './utils';
import { createFieldSetSchema } from './schemas';
import {Modal, CustomInput, CustomSelect, CustomTextField, ModalSubmit, NonFieldErrors} from '../../../common';

function CreateFieldSet({open, setOpen, setFieldSets, entityType, clientTypes}) {
  const initialValues = {name: '', entity_type: entityType, field_set_type: 'SINGLE', description: '', client_type_id: ''};

  const getPayload = (values) => {
    return {
      name: values.name,
      entity_type: values.entity_type,
      field_set_type: values.field_set_type,
      ...(values.description != '') && {description: values.description},
      ...(values.entity_type === 'CLIENT') && {client_type_id: values.client_type_id}
    };
  }

  const onSubmit = async (values, actions) => {
    const sideEffect = (jsonResp) => setFieldSets(curr => [jsonResp, ...curr]);
    const data = getPayload(values);
    const url = '/usersapi/create_field_set/';
    onModalSubmit(data, 'post', url, actions.resetForm, setOpen, actions.setErrors, sideEffect);
  }

  return (
    <Modal open={open} setOpen={setOpen} title={'Create Custom Form '}>
      <Formik initialValues={initialValues} validationSchema={createFieldSetSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors, values }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className="create_modal_container">
                <div>
                  <CustomSelect label='Associated with' name='entity_type' disabled={true}>
                    <option value=''>------</option>
                    <option value='CLIENT'>Clients</option>
                    <option value='LOAN'>Loans</option>
                  </CustomSelect>
                  {values.entity_type === 'CLIENT' ?
                  <CustomSelect label='Client type' name='client_type_id'>
                    <option value=''>------</option>
                    {clientTypes.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
                  </CustomSelect> : null}
                  <CustomInput label='Form Name' name='name' type='text'/>
                  <CustomTextField label='Description' name='description'/>
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

export default CreateFieldSet;