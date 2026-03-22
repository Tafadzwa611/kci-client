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
  const [showPreviewModal, setShowPreviewModal] = React.useState(false);
  const {errors, touched, submitCount, values, setFieldTouched} = useFormikContext();
  const fieldKey = `custom_${field.id}`;

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
  };

  const requiredFileMessage = field.is_required && !values[fieldKey] && submitCount > 0 ? 'Please upload a file' : null;
  const errorMessage = errors[fieldKey] || requiredFileMessage;
  const showError = Boolean(errorMessage) && (touched[fieldKey] || submitCount > 0);
  const isImage = selectedFile?.type?.startsWith('image/');

  <style>
  {`
    .sf-file-field {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
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

    .sf-file-icon-preview {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 84px;
      height: 84px;
      border-radius: 12px;
      border: 1px solid var(--sf-border, #d0d5dd);
      background: var(--sf-surface, #fff);
      font-size: 1.5rem;
      color: var(--sf-text, #111827);
      flex-shrink: 0;
    }

    .sf-upload-status {
      min-width: 220px;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .sf-file-meta-name {
      font-weight: 600;
      word-break: break-word;
      color: var(--sf-text, #111827);
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

    body.dark .sf-label ,
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
    [data-theme='dark'] .sf-file-preview-image,
    body.dark .sf-file-icon-preview,
    [data-theme='dark'] .sf-file-icon-preview {
      border-color: var(--sf-border, #374151);
      background: var(--sf-surface, #111827);
    }

    body.dark .sf-file-icon-preview,
    [data-theme='dark'] .sf-file-icon-preview,
    body.dark .sf-file-meta-name,
    [data-theme='dark'] .sf-file-meta-name,
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

      .sf-file-preview-image,
      .sf-file-icon-preview {
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

  return (
    <>
      <div className='sf-file-field'>
        <label className='sf-label'>{fieldName}</label>

        <Dropzone onDrop={onDrop} multiple={false}>
          {({getRootProps, getInputProps}) => (
            <section className='sf-dropzone-wrap'>
              <div {...getRootProps({className: 'sf-dropzone'})}>
                <input {...getInputProps()} />
                <p className='sf-dropzone-text'>Drag and drop a file here, or click to select a file</p>
              </div>
            </section>
          )}
        </Dropzone>

        {selectedFile ? (
          <div className='sf-file-preview-wrap'>
            {isImage && previewUrl ? (
              <img
                src={previewUrl}
                alt='Preview'
                className='sf-file-preview-image'
                onClick={() => setShowPreviewModal(true)}
                title='Click to preview'
              />
            ) : (
              <div className='sf-file-icon-preview'>
                <i className='fa fa-file'></i>
              </div>
            )}

            <div className='sf-upload-status'>
              <div className='sf-file-meta-name'>{selectedFile.name}</div>

              <small className='sf-help'>
                {selectedFile.type || 'Unknown file type'}
              </small>

              <small className='sf-help'>
                {formatFileSize(selectedFile.size)}
              </small>

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
                  {status}
                  {isImage && previewUrl ? '. Click the image to preview.' : ''}
                </small>
              ) : null}
            </div>
          </div>
        ) : null}

        {!selectedFile && status === 'In Progress' ? (
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

export default CustomForm;
