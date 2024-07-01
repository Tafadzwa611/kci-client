import React from 'react';
import { Form, Formik } from 'formik';
import {
  Modal,
  ModalSubmit,
  NonFieldErrors,
  CustomDatePicker,
  CustomSelect,
  Fetcher
} from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../utils/utils';
import { useNavigate } from 'react-router-dom';
import CustomForm from '../add_client/CustomForm';

function Approve({loanOfficers, clientControls, clientTypes, fieldSets, setOpen, app}) {
  const navigate = useNavigate();

  const customValues = {};
  const customData = [];
  const fieldSetIds = {};

  fieldSets.forEach(fs => {
    const customFieldSet = {'field_set_id': fs.id, data: []};
    customData.push(customFieldSet);
    const data = app.custom_data.find(data => data.field_set_id == fs.id);
    fs.fields.forEach(field => {
      fieldSetIds[`custom_${field.id}`] = fs.id;
      const value = data.values.find(value => value.id == field.id);
      customValues[`custom_${field.id}`] = value ? value.data : '';
    });
  });

  const initialValues = {
    approval_date: '',
    client_manager_id: '',
    ignore_warnings: false,
    ...customValues
  };

  const onSubmit = async (values, actions) => {
    Object.keys(values).filter(key => key.includes('custom')).forEach(key => {
      const field_id = key.split('_')[1];
      const fieldSetId = fieldSetIds[key];
      const fieldSet = fieldSets.find(fs => fs.id == fieldSetId);
      const data_type = fieldSet.fields.find(field => field.id == field_id).data_type;
      const customDataObj = customData.find(cdo => cdo.field_set_id == fieldSetId);
      if (values[key]) {
        customDataObj.data.push({field_id, [data_type]: values[key]});
      }
    });
    const filteredData = customData.filter(cd => cd.data.length > 0);
    try {
      const data = removeEmptyValues(values);
      data.custom_data = filteredData;
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.patch(`/clientsapi/approve_online_application/${app.id}/`, data, CONFIG);
      navigate({pathname: `/clients/viewclients/clientdetails/${response.data.client_id}`});
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
    <Modal open={true} setOpen={setOpen} title={'Approve Client Application'}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, isSubmitting, values, setFieldValue }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='create_modal_container'>
                <div>
                  <CustomDatePicker label='Approval Date' name='approval_date' setFieldValue={setFieldValue} required/>
                  <CustomSelect label='Client Manager' name='client_manager_id' required={clientControls.client_officer_required}>
                    <option value=''>------</option>
                    {loanOfficers.map(user => <option key={user.id} value={user.id}>{`${user.first_name} ${user.last_name} - ${user.branch__name}`}</option>)}
                  </CustomSelect>
                  <CustomSelect label='Client Type' name='client_type_id' required>
                    <option value=''>------</option>
                    {clientTypes.map(ct => <option key={ct.id} value={ct.id}>{ct.name}</option>)}
                  </CustomSelect>
                  {fieldSets.filter(form => form.client_type_id == values.client_type_id).map(form => (
                    <React.Fragment key={form.id}>
                      <CustomForm form={form} setFieldValue={setFieldValue}/>
                    </React.Fragment>
                  ))}
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

export default Approve;