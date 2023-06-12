import React from 'react';
import {
  ModalSubmit,
  NonFieldErrors,
  Modal,
  Fetcher,
  CustomSelect,
} from '../../../common';
import { Form, Formik } from 'formik';
import {getElement} from './CustomData';
import axios from 'axios';
import Cookies from 'js-cookie';

function ChangeClientType({client, setOpen, setClient}) {
  return (
    <Modal open={true} setOpen={setOpen} title='Change Client Type' text='add'>
      <Fetcher urls={['/clientsapi/client_types/', '/usersapi/list_field_sets/?entity_type=CLIENT']}>
        {({data}) => (
          <MainForm
            client={client}
            setOpen={setOpen}
            fieldSets={data[1]}
            setClient={setClient}
            clientTypes={data[0]}
          />
        )}
      </Fetcher>
    </Modal>
  )
}

const MainForm = ({client, setClient, setOpen, clientTypes, fieldSets}) => {
  const onSubmit = async (values, actions) => {
    const customData = processValues(values, fieldSets);
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.patch(`/clientsapi/change_client_type/${client.id}/`, {new_client_type_id: values.client_type_id,  custom_data: customData}, CONFIG);
      const clientType = clientTypes.find(ct => ct.id == values.client_type_id).name;
      let newCustomData = customData.map(data => {
        const fieldSet = fieldSets.find(fs => fs.id == data.field_set_id);
        return {
          field_set: fieldSet.name,
          field_set_id: data.field_set_id,
          client_type_id: values.client_type_id,
          values: data.data.map(f => {
            const field = fieldSet.fields.find(field => field.id == f.field_id);
            return {
              ...field,
              data: f[field.data_type]
            }
          })
        }
      });
      setClient(curr => ({
        ...curr,
        client_type: clientType,
        client_type_id: values.client_type_id,
        custom_data: [...curr.custom_data.map(data => {
          const newVals = newCustomData.find(vals => vals.field_set_id === data.field_set_id);
          if (newVals) {
            newCustomData = newCustomData.filter(newData => newData.field_set_id !== newVals.field_set_id);
            return newVals;
          }
          return data;
        }), ...newCustomData],
      }));
      setOpen(null);
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

  const initialValues = {client_type_id: ''};
  fieldSets.forEach(fieldSet => {
    const storedValues = client.custom_data.find(fs => fs.field_set_id == fieldSet.id);
    fieldSet.fields.forEach(field => {
      if (storedValues) {
        const fieldVal = storedValues.values.find(val => val.id === field.id);
        initialValues[field.id] = fieldVal.data || '';
      }else {
        initialValues[field.id] = '';
      }
    });
  });

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, errors, isSubmitting, setFieldValue }) => (
        <Form>
          <NonFieldErrors errors={errors}>
            <div className='create_modal_container'>
              <div>
                <CustomSelect label='New Client Type' name='client_type_id'>
                  <option value=''>------</option>
                  {clientTypes.filter(ct => ct.id != client.client_type_id).map(ct => <option key={ct.id} value={ct.id}>{ct.name}</option>)}
                </CustomSelect>
                {fieldSets.filter(fs => fs.client_type_id == values.client_type_id).map(fs => <CustomForm key={fs.id} fieldSet={fs} setFieldValue={setFieldValue}/>)}
              </div>
              <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
            </div>
          </NonFieldErrors>
        </Form>
      )}
    </Formik>
  )
}

const CustomForm = ({fieldSet, setFieldValue}) => {
  return (
    <div>
      {fieldSet.name}
      <div>
        {fieldSet.fields.map(field => (
          <React.Fragment key={field.id}>
            {getElement(field, setFieldValue)}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

const processValues = (values, customForms) => {
  const applicableForms = customForms.filter(form => form.client_type_id == values.client_type_id);
  const customData = applicableForms.map(form => {
    const data = form.fields.map(field => ({'field_id': field.id, [field.data_type]: values[field.id]}));
    return {'field_set_id': form.id, 'data': data}
  });
  return customData;
}

export default ChangeClientType;