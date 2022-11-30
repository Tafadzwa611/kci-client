import React from 'react';
import { Form, Formik } from 'formik';
import { Modal, CustomInput, CustomSelect, SubmitButton, NonFieldErrors } from '../../../../common';
import {controlSchema} from './schemas';
import {onModalSubmit} from './utils';

const DUPLICATE_CHECKS = {'Do Not Check': '', 'Warning': 'Warning', 'Reject': 'Reject'};

const getPayload = (values) => {
  return {
    client_initial_status: values.client_initial_status,
    id_duplicate_level_type: values.id_duplicate_level_type == '' ? null : values.id_duplicate_level_type,
    pry_phone_duplicate_level_type: values.pry_phone_duplicate_level_type == '' ? null : values.pry_phone_duplicate_level_type,
    sec_phone_duplicate_level_type: values.sec_phone_duplicate_level_type == '' ? null : values.sec_phone_duplicate_level_type,
    home_phone_duplicate_level_type: values.home_phone_duplicate_level_type == '' ? null : values.home_phone_duplicate_level_type,
    email_duplicate_level_type: values.email_duplicate_level_type == '' ? null : values.email_duplicate_level_type,
    fullname_duplicate_level_type: values.fullname_duplicate_level_type == '' ? null : values.fullname_duplicate_level_type,
    min_client_age: values.min_client_age == '' ? null : values.min_client_age
  };
}

const UpdateClientControls = ({open, setOpen, clientControls, setClientControls}) => {
  const initialValues = {
    client_initial_status: clientControls.client_initial_status,
    id_duplicate_level_type: clientControls.id_duplicate_level_type ?? '',
    pry_phone_duplicate_level_type: clientControls.pry_phone_duplicate_level_type ?? '',
    sec_phone_duplicate_level_type: clientControls.sec_phone_duplicate_level_type ?? '',
    home_phone_duplicate_level_type: clientControls.home_phone_duplicate_level_type ?? '',
    email_duplicate_level_type: clientControls.email_duplicate_level_type ?? '',
    fullname_duplicate_level_type: clientControls.fullname_duplicate_level_type ?? '',
    min_client_age: clientControls.min_client_age ?? ''
  };

  const onSubmit = async (values, actions) => {
    const sideEffect = () => setClientControls(values);
    const data = getPayload(values);
    const url = '/clientsapi/update_client_control/';
    onModalSubmit(data, 'put', url, actions.resetForm, setOpen, actions.setErrors, sideEffect);
  }

  return (
    <Modal open={open} setOpen={setOpen} title={'Update Client Controls'}>
      <Formik initialValues={initialValues} validationSchema={controlSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <CustomSelect label='New Client Initial Status' name='client_initial_status'>
                <option value='Pending Approval'>Pending Approval</option>
                <option value='Inactive'>Inactive</option>
              </CustomSelect>
              <CustomSelect label='Id Duplicate Check Level' name='id_duplicate_level_type'>
                {Object.keys(DUPLICATE_CHECKS).map(key => <option key={key} value={DUPLICATE_CHECKS[key]}>{key}</option>)}
              </CustomSelect>
              <CustomSelect label='Primary Phone Duplicate Check Level' name='pry_phone_duplicate_level_type'>
                {Object.keys(DUPLICATE_CHECKS).map(key => <option key={key} value={DUPLICATE_CHECKS[key]}>{key}</option>)}
              </CustomSelect>
              <CustomSelect label='Secondary Phone Duplicate Check Level' name='sec_phone_duplicate_level_type'>
                {Object.keys(DUPLICATE_CHECKS).map(key => <option key={key} value={DUPLICATE_CHECKS[key]}>{key}</option>)}
              </CustomSelect>
              <CustomSelect label='Home Phone Duplicate Check Level' name='home_phone_duplicate_level_type'>
                {Object.keys(DUPLICATE_CHECKS).map(key => <option key={key} value={DUPLICATE_CHECKS[key]}>{key}</option>)}
              </CustomSelect>
              <CustomSelect label='Email Duplicate Check Level' name='email_duplicate_level_type'>
                {Object.keys(DUPLICATE_CHECKS).map(key => <option key={key} value={DUPLICATE_CHECKS[key]}>{key}</option>)}
              </CustomSelect>
              <CustomSelect label='Fullname Duplicate Check Level' name='fullname_duplicate_level_type'>
                {Object.keys(DUPLICATE_CHECKS).map(key => <option key={key} value={DUPLICATE_CHECKS[key]}>{key}</option>)}
              </CustomSelect>
              <CustomInput label='Minimum Client Age In Years' name='min_client_age' step='1' type='number'/>
              <SubmitButton isSubmitting={isSubmitting}/>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default UpdateClientControls;