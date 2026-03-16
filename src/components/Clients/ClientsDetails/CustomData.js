import React from 'react';
import { MODAL_STATES } from './data';
import { Form, Formik, useFormikContext } from 'formik';
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
import Dropzone from 'react-dropzone';


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

  const fieldName = field.is_required ? field.name : `${field.name} (Optional)`;

  if (field.data_type === 'select') {
    return (
      <CustomSelect label={fieldName} name={field.id} required={field.is_required}>
        <option value=''>------</option>
        {field.select_opts.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </CustomSelect>
    )
  }

  if (field.data_type === 'checkbox') {
    return <CustomCheckbox label={fieldName} name={field.id} required={field.is_required}/>
  }

  if (field.data_type === 'file') {
    return <CustomFileInput field={field} fieldName={fieldName} setFieldValue={setFieldValue} />
  }

  return {
    free_text: <CustomInput label={fieldName} name={field.id} type={dataTypes[field.data_type]} required={field.is_required}/>,
    integer: <CustomInput
      label={fieldName}
      name={field.id}
      type={dataTypes[field.data_type]}
      required={field.is_required}
      onKeyDown={e => {if(e.key==='.')e.preventDefault()}}
    />,
    decimal: <CustomInput label={fieldName} name={field.id} type={dataTypes[field.data_type]} required={field.is_required}/>,
    date: <CustomDatePicker label={fieldName} name={field.id} setFieldValue={setFieldValue} required={field.is_required}/>
  }[field.data_type]
}


function CustomFileInput({field, fieldName, setFieldValue, onUploadStart, onUploadEnd}) {
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState(null);
  const {errors, touched, submitCount, values, setFieldTouched} = useFormikContext();
  const fieldKey = `custom_${field.id}`;

  const uploadFile = (file, url) => {
    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', url);
      xhr.onload = () => {
        setStatus('Uploaded');
        setProgress(100);
        res();
      }
      xhr.onerror = (evt) => {
        setStatus('Failed');
        rej(evt);
      }
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentage = (event.loaded/event.total)*100;
          setProgress(Math.round(percentage));
        }
      }
      const blob = new Blob([file], { type: file.type || 'application/octet-stream' });
      xhr.send(blob);
    });
  };

  const onDrop = async (acceptedFiles) => {
    const [file] = acceptedFiles;
    if (!file) return;

    setStatus('In Progress');
    setProgress(0);
    if (onUploadStart) onUploadStart();
    setFieldValue(fieldKey, '');
    setFieldTouched(fieldKey, true, false);

    try {
      const response = await axios.get('/usersapi/get_signed_url/?client_method=put_object&bucket=lenda-client-files');
      await uploadFile(file, response.data.url);
      setFieldValue(fieldKey, response.data.filename);
      setFieldTouched(fieldKey, true, false);
    } catch (error) {
      console.log(error);
      setStatus('Failed');
    } finally {
      if (onUploadEnd) onUploadEnd();
    }
  }

  const requiredFileMessage = field.is_required && !values[fieldKey] && submitCount > 0 ? 'Please upload a file' : null;
  const errorMessage = errors[fieldKey] || requiredFileMessage;
  const showError = Boolean(errorMessage) && (touched[fieldKey] || submitCount > 0);

  return (
    <div style={{marginBottom: '1rem'}}>
      <label>{fieldName}</label>
      <Dropzone onDrop={onDrop} multiple={false}>
        {({getRootProps, getInputProps}) => (
          <section className='container'>
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} required={field.is_required} />
              <p className='dropzone__text'>Drag and drop a file here, or click to select a file</p>
            </div>
          </section>
        )}
      </Dropzone>
      {status === 'In Progress' ? (
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '0.75rem'}}>
          <i className='fa fa-spinner fa-spin' style={{fontSize: '2rem'}}></i>
          <div style={{fontWeight: 700, fontSize: '1.15rem'}}>{progress}%</div>
        </div>
      ) : null}
      {status && status !== 'In Progress' ? <small>{status}</small> : null}
      {showError ? <div className='error'>{errorMessage}</div> : null}
    </div>
  );
}

export {getElement};
export default CustomData;