import React from 'react';
import { MODAL_STATES } from './data';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  ModalSubmit,
  NonFieldErrors,
  Modal,
  CustomSelect,
  CustomInput,
  CustomCheckbox,
  CustomDatePicker
} from '../../../common';

function CustomData({fieldset, client, setClient, setModal, modal}) {

  return (
    <div>
      {modal === MODAL_STATES.editCustom && <CustomDataForm client={client} fieldset={fieldset} setOpen={setModal} setClient={setClient}/>}
      <div style={{margin: '20px 0'}}>
        <button className='btn btn-success' onClick={() => setModal(MODAL_STATES.editCustom)}>
          Edit
        </button>
      </div>
      <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
        {fieldset.values.map(value => <li key={value.id}>{value.name}: {value.data}</li>)}
      </ul>
    </div>
  )
}

const CustomDataForm = ({fieldset, setOpen, setClient, client}) => {
  const onSubmit = async (values, actions) => {
    let data = [];
    fieldset.values.forEach(val => {
      if (values[val.id]) {
        data.push({'field_id': val.id, [val.data_type]: values[val.id]})
      }
    });

    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.patch(`/clientsapi/update_custom_data/${client.id}/${fieldset.field_set_id}/`, {data}, CONFIG);
      setClient(curr => ({
        ...curr,
        custom_data: curr.custom_data.map(fs => {
          if (fs.field_set_id !== fieldset.field_set_id) {
            return fs
          }
          return {...fs, values: fs.values.map(val => ({...val, data: values[val.id]}))}
        })
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

  const initialValues = {};
  fieldset.values.forEach(val => initialValues[val.id] = val.data || '');
  return (
    <Modal open={true} setOpen={setOpen} title={`Update ${fieldset.field_set}`} text='add'>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, isSubmitting, setFieldValue }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='create_modal_container'>
                <div>
                  {fieldset.values.map(val => (
                    <React.Fragment key={val.id}>
                      {getElement(val, setFieldValue)}
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

const getElement = (field, setFieldValue) => {
  const dataTypes = {
    free_text: 'text',
    integer: 'number',
    decimal: 'number',
    date: 'date',
  };

  if (field.data_type === 'select') {
    return (
      <CustomSelect label={field.name} name={field.id} required={field.is_required}>
        <option value=''>------</option>
        {field.select_opts.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </CustomSelect>
    )
  }

  if (field.data_type === 'checkbox') {
    return <CustomCheckbox label={field.name} name={field.id} required={field.is_required}/>
  }

  return {
    free_text: <CustomInput label={field.name} name={field.id} type={dataTypes[field.data_type]} required={field.is_required}/>,
    integer: <CustomInput
      label={field.name}
      name={field.id}
      type={dataTypes[field.data_type]}
      required={field.is_required}
      onKeyDown={e => {if(e.key==='.')e.preventDefault()}}
    />,
    decimal: <CustomInput label={field.name} name={field.id} type={dataTypes[field.data_type]} required={field.is_required}/>,
    date: <CustomDatePicker label={field.name} name={field.id} setFieldValue={setFieldValue} required={field.is_required}/>
  }[field.data_type]
}

export {getElement};
export default CustomData;