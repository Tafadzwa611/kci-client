import React from 'react';
import { Form, Formik } from 'formik';
import { Modal, CustomInput, CustomCheckbox, CustomSelect, NonFieldErrors, ModalSubmit } from '../../../../common';
import {controlSchema} from './schemas';
import axios from 'axios';
import Cookies from 'js-cookie';

const DUPLICATE_CHECKS = {'Do Not Check': '', 'Warning': 'Warning', 'Reject': 'Reject'};

const getPayload = (values) => {
  return {
    client_initial_status: values.client_initial_status,
    id_duplicate_level_type: values.id_duplicate_level_type == '' ? null : values.id_duplicate_level_type,
    pry_phone_duplicate_level_type: values.pry_phone_duplicate_level_type == '' ? null : values.pry_phone_duplicate_level_type,
    sec_phone_duplicate_level_type: values.sec_phone_duplicate_level_type == '' ? null : values.sec_phone_duplicate_level_type,
    home_phone_duplicate_level_type: values.home_phone_duplicate_level_type == '' ? null : values.home_phone_duplicate_level_type,
    whatsapp_duplicate_level_type: values.whatsapp_duplicate_level_type == '' ? null : values.whatsapp_duplicate_level_type,
    email_duplicate_level_type: values.email_duplicate_level_type == '' ? null : values.email_duplicate_level_type,
    fullname_duplicate_level_type: values.fullname_duplicate_level_type == '' ? null : values.fullname_duplicate_level_type,
    min_client_age: values.min_client_age == '' ? null : values.min_client_age,
    maximum_group_size: values.maximum_group_size == '' ? null : values.maximum_group_size,
    minimum_group_size: values.minimum_group_size == '' ? null : values.minimum_group_size,
    allow_clients_without_id: values.allow_clients_without_id,
    client_officer_required: values.client_officer_required,
    group_officer_required: values.group_officer_required,
    allow_multi_groups_per_client: values.allow_multi_groups_per_client,
    client_id_format: values.client_id_format,
    use_client_units: values.use_client_units,
  };
}

const UpdateClientControls = ({open, setOpen, clientControls, setClientControls}) => {
  const initialValues = {
    client_initial_status: clientControls.client_initial_status,
    id_duplicate_level_type: clientControls.id_duplicate_level_type ?? '',
    pry_phone_duplicate_level_type: clientControls.pry_phone_duplicate_level_type ?? '',
    sec_phone_duplicate_level_type: clientControls.sec_phone_duplicate_level_type ?? '',
    home_phone_duplicate_level_type: clientControls.home_phone_duplicate_level_type ?? '',
    whatsapp_duplicate_level_type: clientControls.whatsapp_duplicate_level_type ?? '',
    email_duplicate_level_type: clientControls.email_duplicate_level_type ?? '',
    fullname_duplicate_level_type: clientControls.fullname_duplicate_level_type ?? '',
    min_client_age: clientControls.min_client_age ?? '',
    maximum_group_size: clientControls.maximum_group_size ?? '',
    minimum_group_size: clientControls.minimum_group_size ?? '',
    allow_clients_without_id: clientControls.allow_clients_without_id,
    client_officer_required: clientControls.client_officer_required,
    group_officer_required: clientControls.group_officer_required,
    allow_multi_groups_per_client: clientControls.allow_multi_groups_per_client,
    client_id_format: clientControls.client_id_format,
    use_client_units: clientControls.use_client_units,
  };

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const data = getPayload(values);
      await axios.put('/clientsapi/update_client_control/', data, CONFIG);
      setClientControls(values);
      setOpen(false);
      actions.resetForm();
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
    <Modal open={open} setOpen={setOpen} title={'Update Client / Group Controls'}>
      <Formik initialValues={initialValues} validationSchema={controlSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className="create_modal_container">
                <div>
                  <CustomSelect label='New Client / Group Initial Status' name='client_initial_status'>
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
                  <CustomSelect label='Whatsapp Duplicate Check Level' name='whatsapp_duplicate_level_type'>
                    {Object.keys(DUPLICATE_CHECKS).map(key => <option key={key} value={DUPLICATE_CHECKS[key]}>{key}</option>)}
                  </CustomSelect>
                  <CustomSelect label='Email Duplicate Check Level' name='email_duplicate_level_type'>
                    {Object.keys(DUPLICATE_CHECKS).map(key => <option key={key} value={DUPLICATE_CHECKS[key]}>{key}</option>)}
                  </CustomSelect>
                  <CustomSelect label='Fullname Duplicate Check Level' name='fullname_duplicate_level_type'>
                    {Object.keys(DUPLICATE_CHECKS).map(key => <option key={key} value={DUPLICATE_CHECKS[key]}>{key}</option>)}
                  </CustomSelect>
                  <CustomInput label='Minimum Client Age In Years' name='min_client_age' step='1' type='number'/>
                  <CustomInput label='Maximum group size' name='maximum_group_size' step='1' type='number'/>
                  <CustomInput label='Minimum group size' name='minimum_group_size' step='1' type='number'/>
                  {/* <CustomCheckbox label='Allow Clients Without Identification' name='allow_clients_without_id'/> */}
                  <CustomCheckbox label='Client Officer Required' name='client_officer_required'/>
                  <CustomCheckbox label='Group Officer Required' name='group_officer_required'/>
                  <CustomCheckbox label='Allow multi groups per client' name='allow_multi_groups_per_client'/>
                  <CustomCheckbox label='Use Client Units' name='use_client_units'/>
                  <CustomSelect label='Client Number Format' name='client_id_format'>
                    <option value='CNCC'>BRANCH CLIENT COUNT</option>
                    <option value='BR-DT-RN'>BRANCH-DATE-RANDOM</option>
                    <option value='MAN'>MANUAL</option>
                  </CustomSelect>
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

export default UpdateClientControls;