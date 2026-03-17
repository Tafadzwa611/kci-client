import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import {CustomInput, CustomSelect, CustomCheckbox, CustomDatePicker} from '../../../common';
import { useFormikContext } from 'formik';


function  CustomForm({form, setFieldValue, onUploadStart, onUploadEnd}) {
  return (
    <>
      {form.fields.map(
        field => {
          return (
            <React.Fragment key={field.id}>
              {getElement(field, setFieldValue, onUploadStart, onUploadEnd)}
            </React.Fragment>
          )
        }
      )}
    </>
  )
}

const getElement = (field, setFieldValue, onUploadStart, onUploadEnd) => {
  const dataTypes = {
    free_text: 'text',
    integer: 'number',
    decimal: 'number',
    date: 'date',
  };

  const fieldName = field.is_required ? field.name : `${field.name} (Optional)`;

  if (field.data_type === 'select') {
    return (
      <CustomSelect label={fieldName} name={`custom_${field.id}`} required={field.is_required}>
        <option value=''>------</option>
        {field.select_opts.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </CustomSelect>
    )
  }

  if (field.data_type === 'checkbox') {
    return <CustomCheckbox label={fieldName} name={`custom_${field.id}`} required={field.is_required}/>
  }

  if (field.data_type === 'file') {
    return (
      <CustomFileInput
        field={field}
        fieldName={fieldName}
        setFieldValue={setFieldValue}
        onUploadStart={onUploadStart}
        onUploadEnd={onUploadEnd}
      />
    )
  }

  return {
    free_text: <CustomInput label={fieldName} name={`custom_${field.id}`} type={dataTypes[field.data_type]} required={field.is_required}/>,
    integer: <CustomInput
      label={fieldName}
      required={field.is_required}
      name={`custom_${field.id}`}
      type={dataTypes[field.data_type]}
      onKeyDown={e => {if(e.key==='.')e.preventDefault()}}
    />,
    decimal: <CustomInput label={fieldName} name={`custom_${field.id}`} type={dataTypes[field.data_type]} required={field.is_required}/>,
    date: <CustomDatePicker label={fieldName} name={`custom_${field.id}`} setFieldValue={setFieldValue} required={field.is_required}/>
  }[field.data_type]
}


function CustomFileInput({field, fieldName, setFieldValue, onUploadStart, onUploadEnd}) {
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const {errors, touched, submitCount, values, setFieldTouched} = useFormikContext();
  const fieldKey = `custom_${field.id}`;

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const formatFileSize = (bytes) => {
    if (!bytes && bytes !== 0) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const getFileExtension = (file) => {
    if (file?.name && file.name.includes('.')) {
      return file.name.split('.').pop().toLowerCase();
    }
    if (file?.type && file.type.includes('/')) {
      return file.type.split('/').pop().toLowerCase();
    }
    return '';
  };

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

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);

    if (file.type && file.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }

    setStatus('In Progress');
    setProgress(0);
    if (onUploadStart) onUploadStart();
    setFieldValue(fieldKey, '');
    setFieldTouched(fieldKey, true, false);

    try {
      const ext = getFileExtension(file);
      const signedUrlEndpoint = `/usersapi/get_signed_url/?client_method=put_object&bucket=lenda-client-files${ext ? `&ext=${encodeURIComponent(ext)}` : ''}`;
      const response = await axios.get(signedUrlEndpoint);
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
  const isImage = selectedFile?.type?.startsWith('image/');

  return (
    <div style={{marginBottom: '1rem'}}>
      <label>{fieldName}</label>
      <Dropzone onDrop={onDrop} multiple={false}>
        {({getRootProps, getInputProps}) => (
          <section className='container'>
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <p className='dropzone__text'>Drag and drop a file here, or click to select a file</p>
            </div>
          </section>
        )}
      </Dropzone>

      {selectedFile ? (
        <div
          style={{
            marginTop: '0.75rem',
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
            background: '#fafafa',
          }}
        >
          {isImage && previewUrl ? (
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
                marginBottom: '0.75rem',
              }}
            />
          ) : (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '56px',
                height: '56px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                marginBottom: '0.75rem',
                fontSize: '1.5rem',
                background: '#fff',
              }}
            >
              <i className='fa fa-file'></i>
            </div>
          )}

          <div style={{fontWeight: 600, wordBreak: 'break-word'}}>
            {selectedFile.name}
          </div>

          <small style={{display: 'block', marginTop: '0.25rem', color: '#666'}}>
            {selectedFile.type || 'Unknown file type'}
          </small>

          <small style={{display: 'block', marginTop: '0.25rem', color: '#666'}}>
            {formatFileSize(selectedFile.size)}
          </small>
        </div>
      ) : null}

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

export default CustomForm;
