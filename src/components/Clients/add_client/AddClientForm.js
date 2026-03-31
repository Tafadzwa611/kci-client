import React, { useState, useMemo } from 'react';
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
  next_of_kin_list: yup.array().of(
    yup.object().shape({
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
    })
  ),
  address_list: yup.array().of(
    yup.object().shape({
      address: yup.string().required('Required'),
      city: yup.string().required('Required'),
      country: yup.string().required('Required'),
      ownership: yup.string().required('Required').oneOf(['OWNER', 'RENTING']),
    })
  ),
  id_nums: yup.array().of(
    yup.object().shape({
      id_template_id: yup.string().required('Required'),
      id_number: yup.string().required('Required'),
    })
  ),
});

function FormSection({ title, hint, right, children }) {
  return (
    <section className='sf-section'>
      <div className='sf-section-head'>
        <div>
          <div className='sf-section-title'>{title}</div>
          {hint ? <div className='sf-section-hint'>{hint}</div> : null}
        </div>
        {right ? <div className='sf-section-right'>{right}</div> : null}
      </div>
      <div className='sf-section-body'>{children}</div>
    </section>
  );
}

function AddClientForm({
  customForms,
  clientTypes,
  idTemplates,
  clientControls,
  staff,
  units,
}) {
  const [validationSchema, setValidationSchema] = useState(initValidationSchema);
  const [showIgnore, setShowIgnore] = useState(false);
  const [customFileUploadsInProgress, setCustomFileUploadsInProgress] = useState(0);

  const onCustomFileUploadStart = () => setCustomFileUploadsInProgress((curr) => curr + 1);
  const onCustomFileUploadEnd = () =>
    setCustomFileUploadsInProgress((curr) => (curr > 0 ? curr - 1 : 0));

  const handleClientTypeChange = (evt) => {
    const { name, value } = evt.target;
    if (name !== 'client_type_id') return;

    let newSchema = initValidationSchema;

    customForms
      .filter((form) => form.client_type_id == value)
      .forEach((form) => {
        form.fields.forEach((field) => {
          let schema;
          if (
            field.data_type === 'free_text' ||
            field.data_type === 'date' ||
            field.data_type === 'file'
          ) {
            schema = yup.string();
          } else if (field.data_type === 'select') {
            schema = yup.string().oneOf(field.select_opts);
          }

          if (field.is_required && field.data_type === 'file') {
            schema = schema.required('Please upload a file');
          } else {
            schema = field.is_required ? schema.required('Required') : schema;
          }

          newSchema = newSchema.concat(
            yup.object().shape({
              [`custom_${field.id}`]: schema,
            })
          );
        });
      });

    setValidationSchema(newSchema);
  };

  const { branches } = useBranches();
  const userBranch = branches.find((br) => br.is_user_branch);

  const initialValues = useMemo(() => {
    const base = {
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
      branch_id: userBranch?.id,
      unit_id: '',
      id_nums: [{ id: uuidv4(), id_number: '', id_template_id: '' }],
      profile_filename: '',
    };

    customForms.forEach((form) => {
      form.fields.forEach((field) => {
        base[`custom_${field.id}`] = '';
      });
    });

    return base;
  }, [customForms, userBranch?.id]);

  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    const data = processValues(values, customForms);
    try {
      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post('/clientsapi/add_client/', data, CONFIG);
      navigate({
        pathname: `/clients/viewclients/clientdetails/${response.data.client_id}`,
      });
    } catch (error) {
      console.log(error);
      if (error.message === 'Network Error') {
        actions.setErrors({ responseStatus: 'Network Error' });
      } else if (error.response?.status >= 400 && error.response?.status < 500) {
        setShowIgnore(true);
        actions.setErrors({
          responseStatus: error.response.status,
          detail: processErrors(error.response.data, customForms),
        });
      } else {
        actions.setErrors({ responseStatus: error.response?.status });
      }
    }
  };

  return (
    <>
      <style>
        {`
          .sf-file-field {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            margin-bottom: 1rem;
          }

          .sf-label {
            font-size: 0.95rem;
            font-weight: 600;
            color: var(--sf-text, #111827);
            position: static;
          }

          .sf-dropzone-wrap {
            width: 100%;
          }

          .sf-dropzone {
            border: 1px dashed var(--sf-border, #d0d5dd);
            border-radius: 12px;
            background: var(--sf-surface, #fff);
            padding: 1rem 1.125rem;
            min-height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            cursor: pointer;
            transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          }

          .sf-dropzone:hover {
            border-color: var(--sf-primary, #635bff);
            box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.08);
          }

          .sf-dropzone-text {
            margin: 0;
            font-size: 0.95rem;
            color: var(--sf-muted, #667085);
          }

          .sf-file-preview-wrap {
            margin-top: 0.25rem;
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            flex-wrap: wrap;
          }

          .sf-file-preview-image {
            width: 84px;
            height: 84px;
            object-fit: cover;
            border-radius: 12px;
            border: 1px solid var(--sf-border, #d0d5dd);
            display: block;
            background: var(--sf-surface, #fff);
            flex-shrink: 0;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .sf-file-preview-image:hover {
            transform: scale(1.03);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
          }

          .sf-upload-status {
            min-width: 220px;
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .sf-upload-progress {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .sf-upload-progress-icon {
            font-size: 1rem;
          }

          .sf-upload-progress-text {
            font-weight: 700;
            font-size: 0.95rem;
            color: var(--sf-text, #111827);
          }

          .sf-upload-bar {
            width: 100%;
            height: 8px;
            border-radius: 999px;
            background: var(--sf-border, #e5e7eb);
            overflow: hidden;
          }

          .sf-upload-bar-fill {
            height: 100%;
            width: 0%;
            background: var(--sf-primary, #635bff);
            transition: width 0.2s ease;
          }

          .sf-help {
            color: var(--sf-muted, #667085);
            font-size: 0.875rem;
          }

          .sf-image-modal {
            position: fixed;
            inset: 0;
            z-index: 9999;
            background: rgba(15, 23, 42, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
          }

          .sf-image-modal-content {
            position: relative;
            max-width: min(92vw, 900px);
            max-height: 92vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .sf-image-modal-img {
            max-width: 100%;
            max-height: 92vh;
            object-fit: contain;
            border-radius: 16px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
            background: #fff;
          }

          .sf-image-modal-close {
            position: absolute;
            top: -0.75rem;
            right: -0.75rem;
            width: 2.25rem;
            height: 2.25rem;
            border: none;
            border-radius: 999px;
            background: #fff;
            color: #111827;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .sf-image-modal-close:hover {
            transform: scale(1.04);
          }

          body.dark .sf-label,
          [data-theme='dark'] .sf-label {
            color: var(--sf-text, #f3f4f6);
          }

          body.dark .sf-dropzone,
          [data-theme='dark'] .sf-dropzone {
            background: var(--sf-surface, #111827);
            border-color: var(--sf-border, #374151);
          }

          body.dark .sf-dropzone-text,
          [data-theme='dark'] .sf-dropzone-text {
            color: var(--sf-muted, #9ca3af);
          }

          body.dark .sf-file-preview-image,
          [data-theme='dark'] .sf-file-preview-image {
            border-color: var(--sf-border, #374151);
            background: var(--sf-surface, #111827);
          }

          body.dark .sf-upload-progress-text,
          [data-theme='dark'] .sf-upload-progress-text {
            color: var(--sf-text, #f3f4f6);
          }

          body.dark .sf-upload-bar,
          [data-theme='dark'] .sf-upload-bar {
            background: #1f2937;
          }

          body.dark .sf-help,
          [data-theme='dark'] .sf-help {
            color: var(--sf-muted, #9ca3af);
          }

          @media (max-width: 768px) {
            .sf-dropzone {
              min-height: 96px;
              padding: 0.875rem;
            }

            .sf-file-preview-image {
              width: 72px;
              height: 72px;
            }

            .sf-upload-status {
              min-width: 100%;
            }

            .sf-image-modal-close {
              top: 0.5rem;
              right: 0.5rem;
            }
          }
        `}
      </style>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors, values, setFieldValue }) => (
          <Form autoComplete='off' onChange={handleClientTypeChange} className='sf-form'>
            <NonFieldErrors errors={errors}>
              <div className='sf-page'>
                <div className='sf-shell'>
                  <div className='sf-shell-head'>
                    <div className='sf-shell-title'>Create client</div>
                    <div className='sf-shell-subtitle'>
                      Complete the client onboarding details below.
                    </div>
                  </div>

                  <div className='sf-shell-body'>
                    <FormSection
                      title='Client Information'
                      hint='Basic personal details for this client.'
                    >
                      <CustomSelect label='Client Type' name='client_type_id' required>
                        <option value=''>------</option>
                        {clientTypes.map((ct) => (
                          <option key={ct.id} value={ct.id}>
                            {ct.name}
                          </option>
                        ))}
                      </CustomSelect>

                      <ClientInformation
                        setFieldValue={setFieldValue}
                        clientControls={clientControls}
                        staff={staff}
                        units={units}
                      />
                    </FormSection>

                    <FormSection
                      title='Identification'
                      hint='National ID / Passport / Licence details.'
                    >
                      <ClientId
                        id_nums={values.id_nums}
                        setFieldValue={setFieldValue}
                        idTemplates={idTemplates}
                      />
                    </FormSection>

                    <FormSection title='Address' hint='At least one address is required.'>
                      <Addresses
                        address_list={values.address_list}
                        setFieldValue={setFieldValue}
                      />
                    </FormSection>

                    <FormSection
                      title='Next Of Kin'
                      hint='At least one next-of-kin record is required.'
                    >
                      <NextOfKin
                        next_of_kin_list={values.next_of_kin_list}
                        setFieldValue={setFieldValue}
                      />
                    </FormSection>

                    <FormSection
                      title='Client Photo'
                      hint='Upload a profile image for this client.'
                    >
                      <CustomFileInput
                        setFieldValue={setFieldValue}
                        values={values}
                        onUploadStart={onCustomFileUploadStart}
                        onUploadEnd={onCustomFileUploadEnd}
                      />
                    </FormSection>

                    {customForms
                      .filter((form) => form.client_type_id == values.client_type_id)
                      .map((form) => (
                        <FormSection
                          key={form.id}
                          title={form.name}
                          hint='Extra fields for this client type.'
                        >
                          <CustomForm
                            form={form}
                            setFieldValue={setFieldValue}
                            onUploadStart={onCustomFileUploadStart}
                            onUploadEnd={onCustomFileUploadEnd}
                          />
                        </FormSection>
                      ))}

                    {showIgnore ? (
                      <FormSection
                        title='Warnings'
                        hint='If you want to proceed despite warnings, enable ignore.'
                      >
                        <CustomCheckbox label='Ignore Warnings' name='ignore_warnings' />
                      </FormSection>
                    ) : null}
                  </div>

                  <div className='sf-shell-footer'>
                    <SubmitButton
                      isSubmitting={isSubmitting || customFileUploadsInProgress > 0}
                    />
                  </div>
                </div>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </>
  );
}

/** -----------------------------
 * Helpers
 * ----------------------------- */
const processValues = (values, customForms) => {
  const applicableForms = customForms.filter(
    (form) => form.client_type_id == values.client_type_id
  );

  const custom_data = applicableForms.map((form) => {
    const data = [];
    form.fields.forEach((field) => {
      if (values[`custom_${field.id}`]) {
        data.push({ field_id: field.id, [field.data_type]: values[`custom_${field.id}`] });
      }
    });
    return { field_set_id: form.id, data };
  });

  values.next_of_kin_list = values.next_of_kin_list.map((nok) => ({
    ...nok,
    phone_number: `${nok.phoneNumber.countryCode} ${nok.phoneNumber.phoneNumber}`,
  }));

  const phoneNumbers = { mobile_number: '', phone_number_secondary: '', whatsapp_number: '' };

  if (values.mobile_number?.phoneNumber) {
    phoneNumbers.mobile_number = `${values.mobile_number.countryCode} ${values.mobile_number.phoneNumber}`;
  }

  if (values.phone_number_secondary?.phoneNumber) {
    phoneNumbers.phone_number_secondary = `${values.phone_number_secondary.countryCode} ${values.phone_number_secondary.phoneNumber}`;
  }

  if (values.whatsapp_number?.phoneNumber) {
    phoneNumbers.whatsapp_number = `${values.whatsapp_number.countryCode} ${values.whatsapp_number.phoneNumber}`;
  }

  let data = { ...values, ...phoneNumbers, custom_data };
  data = removeEmptyValues(data);
  return data;
};

const processErrors = (errors, customForms) => {
  let { detail } = errors;

  if (typeof detail === 'string') {
    return detail;
  } else if (typeof detail === 'object' && !Array.isArray(detail)) {
    return {
      msg: detail.msg,
      field_name: getFieldName(detail.field_name, detail.field_set_id, customForms),
      level: detail.level,
    };
  }

  return detail.map((error) => ({
    msg: error.msg,
    field_name: getFieldName(error.field_name, error.field_set_id, customForms),
    level: error.level,
  }));
};

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
    }[fieldName];
  }

  const fs = customForms.find((fs) => fs.id == fieldSetId);
  const field = fs.fields.find((field) => field.id == fieldName);
  return field.name;
};

function CustomFileInput({ values, setFieldValue, onUploadStart, onUploadEnd }) {
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [showPreviewModal, setShowPreviewModal] = React.useState(false);
  const { errors, touched, submitCount, setFieldTouched } = useFormikContext();

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  React.useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowPreviewModal(false);
      }
    };

    if (showPreviewModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [showPreviewModal]);

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
      const ext = file.name.split('.').pop();

      const response = await axios.get(
        `/usersapi/get_signed_url/?client_method=put_object&bucket=lenda-client-files&ext=${ext}`
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
    <>
      <div className='sf-file-field'>
        <label className='sf-label'>Profile Picture</label>

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
            <section className='sf-dropzone-wrap'>
              <div {...getRootProps({ className: 'sf-dropzone' })}>
                <input {...getInputProps()} />
                <p className='sf-dropzone-text'>
                  Drag and drop a file here, or click to select a file
                </p>
              </div>
            </section>
          )}
        </Dropzone>

        {previewUrl ? (
          <div className='sf-file-preview-wrap'>
            <img
              src={previewUrl}
              alt='Preview'
              className='sf-file-preview-image'
              onClick={() => setShowPreviewModal(true)}
              title='Click to preview'
            />

            <div className='sf-upload-status'>
              {status === 'In Progress' ? (
                <>
                  <div className='sf-upload-progress'>
                    <i className='fa fa-spinner fa-spin sf-upload-progress-icon'></i>
                    <div className='sf-upload-progress-text'>{progress}% uploading...</div>
                  </div>
                  <div className='sf-upload-bar'>
                    <div
                      className='sf-upload-bar-fill'
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </>
              ) : null}

              {status && status !== 'In Progress' ? (
                <small className='sf-help'>
                  {status}. Click the image to preview.
                </small>
              ) : null}
            </div>
          </div>
        ) : null}

        {!previewUrl && status === 'In Progress' ? (
          <div className='sf-upload-status'>
            <div className='sf-upload-progress'>
              <i className='fa fa-spinner fa-spin sf-upload-progress-icon'></i>
              <div className='sf-upload-progress-text'>{progress}% uploading...</div>
            </div>
            <div className='sf-upload-bar'>
              <div
                className='sf-upload-bar-fill'
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        ) : null}

        {showError ? <div className='error'>{errorMessage}</div> : null}
      </div>

      {showPreviewModal && previewUrl ? (
        <div
          className='sf-image-modal'
          onClick={() => setShowPreviewModal(false)}
        >
          <div
            className='sf-image-modal-content'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type='button'
              className='sf-image-modal-close'
              onClick={() => setShowPreviewModal(false)}
            >
              ×
            </button>
            <img
              src={previewUrl}
              alt='Full Preview'
              className='sf-image-modal-img'
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default AddClientForm;