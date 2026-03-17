import React, { useState } from 'react';
import { Formik, Form, useFormikContext } from 'formik';
import {
  NonFieldErrors,
  CustomSelect,
  SubmitButton,
  CustomCheckbox
} from '../../../common';
import ClientInformation from './ClientInformation';
import CustomForm from './CustomForm';
import Addresses from './Addresses';
import NextOfKin from './NextOfKin';
import ClientId from './ClientId';
import * as yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { uuidv4 } from '../../../utils';
import { useBranches } from '../../../contexts/BranchesContext';
import Dropzone from 'react-dropzone';


const initValidationSchema = yup.object().shape({
  client_type_id: yup.number().required('Required'),
  first_name: yup.string().required('Required').max(300),
  last_name: yup.string().required('Required').max(300),
  gender: yup.string().required('Required').oneOf(['MALE', 'FEMALE']),
  date_of_birth: yup.string().required('Required'),
  registration_date: yup.string().required('Required'),
  mobile_number: yup.object().shape({
    countryCode: yup.string().required(),
    phoneNumber: yup.string().required('Required'),
  }),
  email: yup.string().email(),
  next_of_kin_list: yup.array().of(yup.object().shape({
    first_name: yup.string().required('Required'),
    last_name: yup.string().required('Required'),
    gender: yup.string().required('Required').oneOf(['MALE', 'FEMALE']),
    relationship: yup.string().required('Required'),
    phoneNumber: yup.object().shape({
      countryCode: yup.string().required(),
      phoneNumber: yup.string().required('Required'),
    }),
    address: yup.string().required('Required'),
    city: yup.string().required('Required'),
    country: yup.string().required('Required'),
    ownership: yup.string().required('Required').oneOf(['OWNER', 'RENTING']),
  })),
  address_list: yup.array().of(yup.object().shape({
    address: yup.string().required('Required'),
    city: yup.string().required('Required'),
    country: yup.string().required('Required'),
    ownership: yup.string().required('Required').oneOf(['OWNER', 'RENTING']),
  })),
  id_nums: yup.array().of(yup.object().shape({
    id_template_id: yup.string().required('Required'),
    id_number: yup.string().required('Required'),
  }))
});

function AddClientForm({customForms, clientTypes, idTemplates, clientControls, staff, units}) {
  const [validationSchema, setValidationSchema] = useState(initValidationSchema);
  const [showIgnore, setShowIgnore] = useState(false);
  const [customFileUploadsInProgress, setCustomFileUploadsInProgress] = useState(0);

  const onCustomFileUploadStart = () => setCustomFileUploadsInProgress(curr => curr + 1);
  const onCustomFileUploadEnd = () => setCustomFileUploadsInProgress(curr => (curr > 0 ? curr - 1 : 0));

  const handleClientTypeChange = (evt) => {
    const {name, value} = evt.target;
    if (name !== 'client_type_id')return;
    let newSchema = initValidationSchema;
    customForms.filter(form => form.client_type_id == value).forEach(form => {
      form.fields.forEach(field => {
        let schema;
        if (field.data_type === 'free_text' || field.data_type === 'date' || field.data_type === 'file') {
          schema = yup.string();
        }else if (field.data_type === 'select') {
          schema = yup.string().oneOf(field.select_opts);
        }
        if (field.is_required && field.data_type === 'file') {
          schema = schema.required('Please upload a file');
        } else {
          schema = field.is_required ? schema.required('Required') : schema;
        }
        newSchema = newSchema.concat(yup.object().shape({
          [`custom_${field.id}`]: schema
        }));
      });
    });
    setValidationSchema(newSchema);
  }

  const {branches} = useBranches();
  const userBranch = branches.find((br) => br.is_user_branch);

  const initialValues = {
    client_type_id: '',
    client_num: '',
    client_manager_id: '',
    whatsapp_banking_active: false,
    first_name: '',
    last_name: '',
    gender: '',
    date_of_birth: '',
    registration_date: '',
    mobile_number: {},
    phone_number_secondary: {},
    home_phone: '',
    whatsapp_number: {},
    email: '',
    address_list: [],
    next_of_kin_list: [],
    ignore_warnings: false,
    branch_id: userBranch.id,
    unit_id: '',
    id_nums: [{id: uuidv4(), id_number: '', id_template_id: ''}],
  };

  customForms.forEach(form => {
    form.fields.forEach(field => {
      initialValues[`custom_${field.id}`] = '';
    })
  });

  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    const data = processValues(values, customForms);
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post('/clientsapi/add_client/', data, CONFIG);
      navigate({pathname: `/clients/viewclients/clientdetails/${response.data.client_id}`});
    } catch (error) {
      console.log(error);
      if (error.message === 'Network Error') {
        actions.setErrors({responseStatus: 'Network Error'});
      } else if (error.response.status >= 400 && error.response.status < 500) {
        setShowIgnore(true);
        actions.setErrors({responseStatus: error.response.status, detail: processErrors(error.response.data, customForms)});
      } else {
        actions.setErrors({responseStatus: error.response.status});
      }
    }
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, errors, values, setFieldValue }) => (
        <Form autoComplete='off' onChange={handleClientTypeChange}>
          <NonFieldErrors errors={errors}>
            <div className='divider divider-info'>
              <span>Client Information</span>
            </div>
            <CustomSelect label='Client Type' name='client_type_id' required>
              <option value=''>------</option>
              {clientTypes.map(ct => <option key={ct.id} value={ct.id}>{ct.name}</option>)}
            </CustomSelect>
            <ClientInformation setFieldValue={setFieldValue} clientControls={clientControls} staff={staff} units={units}/>
            <div className='divider divider-info'>Identification</div>
            <ClientId id_nums={values.id_nums} setFieldValue={setFieldValue} idTemplates={idTemplates}/>
            <div className='divider divider-info'>Address</div>
            <Addresses address_list={values.address_list} setFieldValue={setFieldValue}/>
            <div className='divider divider-info'>Next Of Kin</div>
            <NextOfKin next_of_kin_list={values.next_of_kin_list} setFieldValue={setFieldValue}/>
            <div className='divider divider-info'>Client Photo</div>
            <CustomFileInput 
              setFieldValue={setFieldValue}
              values={values}
              onUploadStart={onCustomFileUploadStart}
              onUploadEnd={onCustomFileUploadEnd}
            />
            {customForms.filter(form => form.client_type_id == values.client_type_id).map(form => (
              <React.Fragment key={form.id}>
                <div className='divider divider-info'>{form.name}</div>
                <CustomForm
                  form={form}
                  setFieldValue={setFieldValue}
                  onUploadStart={onCustomFileUploadStart}
                  onUploadEnd={onCustomFileUploadEnd}
                />
              </React.Fragment>
            ))}
            {showIgnore ? <CustomCheckbox label='Ignore Warnings' name='ignore_warnings'/>: null}
            <div style={{display:'flex', justifyContent: 'flex-end'}}>
              <SubmitButton isSubmitting={isSubmitting || customFileUploadsInProgress > 0}/>
            </div>
          </NonFieldErrors>
        </Form>
      )}
    </Formik>
  )
}

const processValues = (values, customForms) => {
  const applicableForms = customForms.filter(form => form.client_type_id == values.client_type_id);
  const custom_data = applicableForms.map(form => {
    const data = [];
    form.fields.forEach(field => {
      if (values[`custom_${field.id}`]) {
        data.push({'field_id': field.id, [field.data_type]: values[`custom_${field.id}`]});
      }
    });
    return {'field_set_id': form.id, 'data': data}
  });
  values.next_of_kin_list = values.next_of_kin_list.map(nok => ({...nok, phone_number: `${nok.phoneNumber.countryCode} ${nok.phoneNumber.phoneNumber}`}));
  const phoneNumbers = {mobile_number: '', phone_number_secondary: '', whatsapp_number: ''};
  if (values.mobile_number.phoneNumber) {
    phoneNumbers.mobile_number = `${values.mobile_number.countryCode} ${values.mobile_number.phoneNumber}`;
  }
  if (values.phone_number_secondary.phoneNumber) {
    phoneNumbers.phone_number_secondary = `${values.phone_number_secondary.countryCode} ${values.phone_number_secondary.phoneNumber}`;
  }
  if (values.whatsapp_number.phoneNumber) {
    phoneNumbers.whatsapp_number = `${values.whatsapp_number.countryCode} ${values.whatsapp_number.phoneNumber}`;
  }
  let data = {...values, ...phoneNumbers, custom_data};
  data = removeEmptyValues(data);
  return data
}

const processErrors = (errors, customForms) => {
  console.log(customForms);
  let {detail} = errors;

  if (typeof detail === 'string') {
    return detail
  }else if (typeof detail === 'object' && !Array.isArray(detail)) {
    return {
      msg: detail.msg,
      field_name: getFieldName(detail.field_name, detail.field_set_id, customForms),
      level: detail.level,
    }
  }

  return detail.map(error => ({
    msg: error.msg,
    field_name: getFieldName(error.field_name, error.field_set_id, customForms),
    level: error.level,
  }));
}

const getFieldName = (fieldName, fieldSetId, customForms) => {
  if (!fieldSetId) {
    return {
      client_id: 'Client Number',
      first_name: 'First Name',
      last_name: 'Last Name',
      full_name: 'Full Name',
      gender: 'Gender',
      date_of_birth: 'Date Of Birth',
      registration_date: 'Registration Date',
      mobile_number: 'Mobile Number',
      phone_number_secondary: 'Secondary Mobile Number',
      home_phone: 'Home Phone',
      whatsapp_number: 'Whatsapp Number',
      email: 'Email',
      id_number: 'Id Number',
    }[fieldName]
  }
  const fs = customForms.find(fs => fs.id == fieldSetId);
  const field = fs.fields.find(field => field.id == fieldName);
  return field.name
}


function CustomFileInput({ values, setFieldValue, onUploadStart, onUploadEnd }) {
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const { errors, touched, submitCount, setFieldTouched } = useFormikContext();

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const uploadFile = (file, url) => {
    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', url);
      xhr.onload = () => {
        setStatus('Uploaded');
        setProgress(100);
        res();
      };
      xhr.onerror = (evt) => {
        setStatus('Failed');
        rej(evt);
      };
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentage = (event.loaded / event.total) * 100;
          setProgress(Math.round(percentage));
        }
      };
      const blob = new Blob([file], { type: file.type || 'application/octet-stream' });
      xhr.send(blob);
    });
  };

  const onDrop = async (acceptedFiles) => {
    const [file] = acceptedFiles;
    if (!file) return;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(file));

    setStatus('In Progress');
    setProgress(0);
    if (onUploadStart) onUploadStart();
    setFieldValue('profile_filename', '');
    setFieldTouched('profile_filename', true, false);

    try {
      const response = await axios.get(
        '/usersapi/get_signed_url/?client_method=put_object&bucket=lenda-client-files'
      );
      await uploadFile(file, response.data.url);
      setFieldValue('profile_filename', response.data.filename);
      setFieldTouched('profile_filename', true, false);
    } catch (error) {
      console.log(error);
      setStatus('Failed');
    } finally {
      if (onUploadEnd) onUploadEnd();
    }
  };

  const hasFormikError = Boolean(errors.profile_filename);
  const isEmpty = !values.profile_filename;

  const showError =
    (hasFormikError || isEmpty) &&
    (touched.profile_filename || submitCount > 0) &&
    status !== 'In Progress';

  const errorMessage = errors.profile_filename || 'Please upload a file';

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>Profile Picture</label>

      <Dropzone
        onDrop={onDrop}
        multiple={false}
        accept={{
          'image/jpeg': ['.jpg', '.jpeg'],
          'image/png': ['.png'],
          'image/webp': ['.webp'],
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section className='container'>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <p className='dropzone__text'>
                Drag and drop a file here, or click to select a file
              </p>
            </div>
          </section>
        )}
      </Dropzone>

      {previewUrl ? (
        <div style={{ marginTop: '0.75rem' }}>
          <img
            src={previewUrl}
            alt='Preview'
            style={{
              width: '140px',
              height: '140px',
              objectFit: 'cover',
              borderRadius: '8px',
              border: '1px solid #ddd',
              display: 'block',
            }}
          />
        </div>
      ) : null}

      {status === 'In Progress' ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '0.75rem' }}>
          <i className='fa fa-spinner fa-spin' style={{ fontSize: '2rem' }}></i>
          <div style={{ fontWeight: 700, fontSize: '1.15rem' }}>{progress}%</div>
        </div>
      ) : null}

      {status && status !== 'In Progress' ? <small>{status}</small> : null}
      {showError ? <div className='error'>{errorMessage}</div> : null}
    </div>
  );
}


export default AddClientForm;
