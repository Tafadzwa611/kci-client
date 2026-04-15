// import React from 'react';
// import { Form, Formik, FieldArray } from 'formik';
// import Dropzone from 'react-dropzone';
// import axios from 'axios';
// import {
//   CustomDatePicker,
//   CustomInput,
//   NonFieldErrors,
//   SubmitButton,
//   CustomSelect
// } from '../../../common';
// import { useBranches } from '../../../contexts/BranchesContext';

// function FormSection({ title, hint, children }) {
//   return (
//     <section className='sf-section'>
//       <div className='sf-section-head'>
//         <div>
//           <div className='sf-section-title'>{title}</div>
//           {hint ? <div className='sf-section-hint'>{hint}</div> : null}
//         </div>
//       </div>
//       <div className='sf-section-body'>{children}</div>
//     </section>
//   );
// }

// function TransferForm({ transfertypes, initialValues, onSubmit, progress = {} }) {
//   const { branches = [] } = useBranches();
//   const [fileUploadState, setFileUploadState] = React.useState({});
//   const [previewUrl, setPreviewUrl] = React.useState(null);
//   const [showPreviewModal, setShowPreviewModal] = React.useState(false);

//   const safeTransferTypes = React.useMemo(() => {
//     if (Array.isArray(transfertypes)) return transfertypes;
//     if (transfertypes && Array.isArray(transfertypes.tranfertypes)) return transfertypes.tranfertypes;
//     if (transfertypes && Array.isArray(transfertypes.transfertypes)) return transfertypes.transfertypes;
//     return [];
//   }, [transfertypes]);

//   const receivingBranchOptionsByTT = React.useMemo(() => {
//     const map = {};

//     safeTransferTypes.forEach((t) => {
//       const raw = Array.isArray(t.receiving_accounts_branches) ? t.receiving_accounts_branches : [];

//       const options = raw
//         .map((x) => {
//           if (x && typeof x === 'object') {
//             return { id: Number(x.id), name: x.name || `Branch #${x.id}` };
//           }
//           return { id: Number(x), name: `Branch #${x}` };
//         })
//         .filter((b) => Number.isFinite(b.id));

//       map[Number(t.id)] = options;
//     });

//     return map;
//   }, [safeTransferTypes]);

//   React.useEffect(() => {
//     return () => {
//       if (previewUrl) {
//         URL.revokeObjectURL(previewUrl);
//       }
//     };
//   }, [previewUrl]);

//   React.useEffect(() => {
//     const handleEscape = (event) => {
//       if (event.key === 'Escape') {
//         setShowPreviewModal(false);
//       }
//     };

//     if (showPreviewModal) {
//       document.addEventListener('keydown', handleEscape);
//       document.body.style.overflow = 'hidden';
//     }

//     return () => {
//       document.removeEventListener('keydown', handleEscape);
//       document.body.style.overflow = '';
//     };
//   }, [showPreviewModal]);

//   const getFileExtension = (file) => {
//     if (file?.name && file.name.includes('.')) {
//       return file.name.split('.').pop().toLowerCase();
//     }
//     if (file?.type && file.type.includes('/')) {
//       return file.type.split('/').pop().toLowerCase();
//     }
//     return '';
//   };

//   const formatFileSize = (bytes) => {
//     if (!bytes && bytes !== 0) return '';
//     if (bytes < 1024) return `${bytes} B`;
//     if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
//     if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
//     return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
//   };

//   const uploadFile = (file, url, onProgress) => {
//     return new Promise((res, rej) => {
//       const xhr = new XMLHttpRequest();
//       xhr.open('PUT', url);

//       xhr.onload = () => {
//         onProgress?.({ status: 'Uploaded', progress: 100 });
//         res();
//       };

//       xhr.onerror = (evt) => {
//         onProgress?.({ status: 'Failed', progress: 0 });
//         rej(evt);
//       };

//       xhr.upload.onprogress = (event) => {
//         if (event.lengthComputable) {
//           const percentage = (event.loaded / event.total) * 100;
//           onProgress?.({ status: 'Uploading', progress: Math.round(percentage) });
//         }
//       };

//       const blob = new Blob([file], { type: file.type || 'application/octet-stream' });
//       xhr.send(blob);
//     });
//   };

//   return (
//     <>
//       <style>
//         {`
//           .sf-file-field {
//             display: flex;
//             flex-direction: column;
//             gap: 0.75rem;
//           }

//           .sf-label {
//             font-size: 0.95rem;
//             font-weight: 600;
//             color: var(--sf-text, #111827);
//             position: static;
//           }

//           .sf-dropzone-wrap {
//             width: 100%;
//           }

//           .sf-dropzone {
//             border: 1px dashed var(--sf-border, #d0d5dd);
//             border-radius: 12px;
//             background: var(--sf-surface, #fff);
//             padding: 1rem 1.125rem;
//             min-height: 120px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             text-align: center;
//             cursor: pointer;
//             transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
//           }

//           .sf-dropzone:hover {
//             border-color: var(--sf-primary, #635bff);
//             box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.08);
//           }

//           .sf-dropzone-text {
//             margin: 0;
//             font-size: 0.95rem;
//             color: var(--sf-muted, #667085);
//           }

//           .sf-file-preview-wrap {
//             margin-top: 0.25rem;
//             display: flex;
//             align-items: flex-start;
//             gap: 1rem;
//             flex-wrap: wrap;
//           }

//           .sf-file-preview-image {
//             width: 84px;
//             height: 84px;
//             object-fit: cover;
//             border-radius: 12px;
//             border: 1px solid var(--sf-border, #d0d5dd);
//             display: block;
//             background: var(--sf-surface, #fff);
//             flex-shrink: 0;
//             cursor: pointer;
//             transition: transform 0.2s ease, box-shadow 0.2s ease;
//           }

//           .sf-file-preview-image:hover {
//             transform: scale(1.03);
//             box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
//           }

//           .sf-file-icon-preview {
//             display: inline-flex;
//             align-items: center;
//             justify-content: center;
//             width: 84px;
//             height: 84px;
//             border-radius: 12px;
//             border: 1px solid var(--sf-border, #d0d5dd);
//             background: var(--sf-surface, #fff);
//             font-size: 1.5rem;
//             color: var(--sf-text, #111827);
//             flex-shrink: 0;
//           }

//           .sf-upload-status {
//             min-width: 220px;
//             flex: 1;
//             display: flex;
//             flex-direction: column;
//             gap: 0.5rem;
//           }

//           .sf-file-meta-name {
//             font-weight: 600;
//             word-break: break-word;
//             color: var(--sf-text, #111827);
//           }

//           .sf-upload-progress {
//             display: flex;
//             align-items: center;
//             gap: 10px;
//           }

//           .sf-upload-progress-icon {
//             font-size: 1rem;
//           }

//           .sf-upload-progress-text {
//             font-weight: 700;
//             font-size: 0.95rem;
//             color: var(--sf-text, #111827);
//           }

//           .sf-upload-bar {
//             width: 100%;
//             height: 8px;
//             border-radius: 999px;
//             background: var(--sf-border, #e5e7eb);
//             overflow: hidden;
//           }

//           .sf-upload-bar-fill {
//             height: 100%;
//             width: 0%;
//             background: var(--sf-primary, #635bff);
//             transition: width 0.2s ease;
//           }

//           .sf-help {
//             color: var(--sf-muted, #667085);
//             font-size: 0.875rem;
//           }

//           .sf-warning {
//             margin-top: 0.5rem;
//             color: #b45309;
//             font-size: 0.9rem;
//           }

//           .sf-image-modal {
//             position: fixed;
//             inset: 0;
//             z-index: 9999;
//             background: rgba(15, 23, 42, 0.8);
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             padding: 1rem;
//           }

//           .sf-image-modal-content {
//             position: relative;
//             max-width: min(92vw, 900px);
//             max-height: 92vh;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//           }

//           .sf-image-modal-img {
//             max-width: 100%;
//             max-height: 92vh;
//             object-fit: contain;
//             border-radius: 16px;
//             box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
//             background: #fff;
//           }

//           .sf-image-modal-close {
//             position: absolute;
//             top: -0.75rem;
//             right: -0.75rem;
//             width: 2.25rem;
//             height: 2.25rem;
//             border: none;
//             border-radius: 999px;
//             background: #fff;
//             color: #111827;
//             font-size: 1rem;
//             font-weight: 700;
//             cursor: pointer;
//             box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
//             display: flex;
//             align-items: center;
//             justify-content: center;
//           }

//           .sf-inline-action {
//             display: flex;
//             justify-content: flex-end;
//             margin-top: 0.5rem;
//           }

//           .sf-remove-btn {
//             border: 1px solid #ef4444;
//             background: #fff;
//             color: #dc2626;
//             border-radius: 10px;
//             padding: 0.55rem 0.9rem;
//             cursor: pointer;
//             font-weight: 600;
//           }

//           .sf-remove-btn:hover {
//             background: #fef2f2;
//           }

//           body.dark .sf-label,
//           [data-theme='dark'] .sf-label {
//             color: var(--sf-text, #f3f4f6);
//           }

//           body.dark .sf-dropzone,
//           [data-theme='dark'] .sf-dropzone {
//             background: var(--sf-surface, #111827);
//             border-color: var(--sf-border, #374151);
//           }

//           body.dark .sf-dropzone-text,
//           [data-theme='dark'] .sf-dropzone-text {
//             color: var(--sf-muted, #9ca3af);
//           }

//           body.dark .sf-file-preview-image,
//           [data-theme='dark'] .sf-file-preview-image,
//           body.dark .sf-file-icon-preview,
//           [data-theme='dark'] .sf-file-icon-preview {
//             border-color: var(--sf-border, #374151);
//             background: var(--sf-surface, #111827);
//           }

//           body.dark .sf-file-icon-preview,
//           [data-theme='dark'] .sf-file-icon-preview,
//           body.dark .sf-file-meta-name,
//           [data-theme='dark'] .sf-file-meta-name,
//           body.dark .sf-upload-progress-text,
//           [data-theme='dark'] .sf-upload-progress-text {
//             color: var(--sf-text, #f3f4f6);
//           }

//           body.dark .sf-upload-bar,
//           [data-theme='dark'] .sf-upload-bar {
//             background: #1f2937;
//           }

//           body.dark .sf-help,
//           [data-theme='dark'] .sf-help {
//             color: var(--sf-muted, #9ca3af);
//           }

//           body.dark .sf-remove-btn,
//           [data-theme='dark'] .sf-remove-btn {
//             background: transparent;
//             color: #fca5a5;
//             border-color: #ef4444;
//           }

//           @media (max-width: 768px) {
//             .sf-dropzone {
//               min-height: 96px;
//               padding: 0.875rem;
//             }

//             .sf-file-preview-image,
//             .sf-file-icon-preview {
//               width: 72px;
//               height: 72px;
//             }

//             .sf-upload-status {
//               min-width: 100%;
//             }

//             .sf-image-modal-close {
//               top: 0.5rem;
//               right: 0.5rem;
//             }
//           }
//         `}
//       </style>

//       <Formik initialValues={initialValues} onSubmit={onSubmit}>
//         {({ values, isSubmitting, errors, setFieldValue }) => {
//           const selectedTransferTypeId = Number(values.transfertype_id || 0);
//           const hasOneFile = Array.isArray(values.files) && values.files.length === 1;
//           const uploadedFile = hasOneFile ? values.files[0] : null;
//           const uploadInProgress =
//             uploadedFile && fileUploadState[uploadedFile.file.path]?.status === 'Uploading';

//           const destinationBranchOptions = React.useMemo(() => {
//             if (!selectedTransferTypeId) {
//               return branches.map((b) => ({ id: Number(b.id), name: b.name }));
//             }
//             return receivingBranchOptionsByTT[selectedTransferTypeId] || [];
//           }, [selectedTransferTypeId, receivingBranchOptionsByTT, branches]);

//           React.useEffect(() => {
//             if (!selectedTransferTypeId) return;
//             if (!values.receiving_branch_id) return;

//             const current = Number(values.receiving_branch_id);
//             const ok = destinationBranchOptions.some((b) => b.id === current);
//             if (!ok) setFieldValue('receiving_branch_id', '', false);
//           }, [selectedTransferTypeId, values.receiving_branch_id, destinationBranchOptions, setFieldValue]);

//           React.useEffect(() => {
//             if (!selectedTransferTypeId) return;
//             if (values.receiving_branch_id) return;

//             if (destinationBranchOptions.length === 1) {
//               setFieldValue('receiving_branch_id', String(destinationBranchOptions[0].id), false);
//             }
//           }, [selectedTransferTypeId, destinationBranchOptions, values.receiving_branch_id, setFieldValue]);

//           const handleDrop = async (acceptedFiles) => {
//             if (!acceptedFiles || !acceptedFiles.length) return;

//             const file = acceptedFiles[0];
//             const filePath = file.path || file.name;

//             if (previewUrl) {
//               URL.revokeObjectURL(previewUrl);
//             }

//             if (file.type && file.type.startsWith('image/')) {
//               setPreviewUrl(URL.createObjectURL(file));
//             } else {
//               setPreviewUrl(null);
//             }

//             const localItem = {
//               file: {
//                 name: file.name,
//                 path: filePath,
//                 size: file.size,
//                 type: file.type,
//               },
//               description: file.name,
//               uploaded_filename: '',
//             };

//             setFieldValue('files', [localItem], false);
//             setFileUploadState((prev) => ({
//               ...prev,
//               [filePath]: { status: 'Uploading', progress: 0 },
//             }));

//             try {
//               const ext = getFileExtension(file);
//               const endpoint = `/usersapi/get_signed_url/?client_method=put_object&bucket=lenda-client-files${
//                 ext ? `&ext=${encodeURIComponent(ext)}` : ''
//               }`;

//               const response = await axios.get(endpoint);

//               await uploadFile(file, response.data.url, (next) => {
//                 setFileUploadState((prev) => ({
//                   ...prev,
//                   [filePath]: next,
//                 }));
//               });

//               setFieldValue(
//                 'files',
//                 [
//                   {
//                     ...localItem,
//                     uploaded_filename: response.data.filename,
//                   },
//                 ],
//                 false
//               );
//             } catch (error) {
//               console.log(error);
//               setFileUploadState((prev) => ({
//                 ...prev,
//                 [filePath]: { status: 'Failed', progress: 0 },
//               }));
//             }
//           };

//           return (
//             <Form className='sf-form'>
//               <NonFieldErrors errors={errors}>
//                 <div className='sf-page'>
//                   <div className='sf-shell'>
//                     <div className='sf-shell-head'>
//                       <div className='sf-shell-title'>Create transfer</div>
//                       <div className='sf-shell-subtitle'>
//                         Capture transfer details and upload the supporting file.
//                       </div>
//                     </div>

//                     <div className='sf-shell-body'>
//                       <FormSection
//                         title='Transfer Information'
//                         hint='Enter the transfer details below.'
//                       >
//                         <CustomSelect label='Transfer Type' name='transfertype_id' required>
//                           <option value=''>------</option>
//                           {safeTransferTypes.map((type) => (
//                             <option key={type.id} value={type.id}>
//                               {type.name}
//                             </option>
//                           ))}
//                         </CustomSelect>

//                         <CustomInput label='Transfer Amount' name='amount' type='number' required />

//                         <CustomDatePicker
//                           label='Transfer Date'
//                           name='date_added'
//                           setFieldValue={setFieldValue}
//                           required
//                         />

//                         <CustomSelect
//                           label='Send To [Branch]'
//                           name='receiving_branch_id'
//                           required
//                           disabled={!!selectedTransferTypeId && destinationBranchOptions.length === 0}
//                         >
//                           <option value=''>------</option>
//                           {destinationBranchOptions.map((b) => (
//                             <option key={b.id} value={b.id}>
//                               {b.name}
//                             </option>
//                           ))}
//                         </CustomSelect>

//                         {!!selectedTransferTypeId && destinationBranchOptions.length === 0 && (
//                           <div className='sf-warning'>
//                             No eligible branches for this transfer type.
//                           </div>
//                         )}

//                         <CustomInput label='Reference' name='reference' type='text' />
//                         <CustomInput label='Description' name='description' type='text' />
//                       </FormSection>

//                       <FormSection
//                         title='Transfer File'
//                         hint='Upload one supporting file. It uploads immediately after selection.'
//                       >
//                         <div className='sf-file-field'>
//                           <label className='sf-label'>Transfer File</label>

//                           <Dropzone onDrop={handleDrop} multiple={false} maxFiles={1}>
//                             {({ getRootProps, getInputProps }) => (
//                               <section className='sf-dropzone-wrap'>
//                                 <div {...getRootProps({ className: 'sf-dropzone' })}>
//                                   <input {...getInputProps()} />
//                                   <p className='sf-dropzone-text'>
//                                     Drag and drop one file here, or click to select a file
//                                   </p>
//                                 </div>
//                               </section>
//                             )}
//                           </Dropzone>

//                           {!hasOneFile && (
//                             <div className='text-danger' style={{ marginTop: '0.25rem' }}>
//                               Please upload one file before submitting.
//                             </div>
//                           )}

//                           <FieldArray name='files'>
//                             {({ remove }) => (
//                               <div>
//                                 {(values.files || []).map((item, index) => {
//                                   const path = item.file?.path || item.file?.name;
//                                   const currentProgress =
//                                     fileUploadState[path] || progress[path] || {};
//                                   const isImage =
//                                     item.file?.type && item.file.type.startsWith('image/');

//                                   return (
//                                     <div key={`${path}-${index}`} className='sf-file-preview-wrap'>
//                                       {isImage && previewUrl ? (
//                                         <img
//                                           src={previewUrl}
//                                           alt='Preview'
//                                           className='sf-file-preview-image'
//                                           onClick={() => setShowPreviewModal(true)}
//                                           title='Click to preview'
//                                         />
//                                       ) : (
//                                         <div className='sf-file-icon-preview'>
//                                           <i className='fa fa-file'></i>
//                                         </div>
//                                       )}

//                                       <div className='sf-upload-status'>
//                                         <div className='sf-file-meta-name'>
//                                           {item.file?.name || item.description}
//                                         </div>

//                                         <small className='sf-help'>
//                                           {item.file?.type || 'Unknown file type'}
//                                         </small>

//                                         <small className='sf-help'>
//                                           {formatFileSize(item.file?.size)}
//                                         </small>

//                                         {currentProgress.status === 'Uploading' ? (
//                                           <>
//                                             <div className='sf-upload-progress'>
//                                               <i className='fa fa-spinner fa-spin sf-upload-progress-icon'></i>
//                                               <div className='sf-upload-progress-text'>
//                                                 {currentProgress.progress || 0}% uploading...
//                                               </div>
//                                             </div>
//                                             <div className='sf-upload-bar'>
//                                               <div
//                                                 className='sf-upload-bar-fill'
//                                                 style={{
//                                                   width: `${currentProgress.progress || 0}%`
//                                                 }}
//                                               ></div>
//                                             </div>
//                                           </>
//                                         ) : null}

//                                         {currentProgress.status &&
//                                         currentProgress.status !== 'Uploading' ? (
//                                           <small className='sf-help'>
//                                             {currentProgress.status}
//                                             {isImage && previewUrl ? '. Click the image to preview.' : ''}
//                                           </small>
//                                         ) : null}

//                                         {/* <CustomInput
//                                           label='File Description'
//                                           name={`files.${index}.description`}
//                                           type='text'
//                                         />

//                                         <div className='sf-inline-action'>
//                                           <button
//                                             type='button'
//                                             className='sf-remove-btn'
//                                             onClick={() => {
//                                               if (previewUrl) {
//                                                 URL.revokeObjectURL(previewUrl);
//                                                 setPreviewUrl(null);
//                                               }
//                                               remove(index);
//                                               setFileUploadState((prev) => {
//                                                 const next = { ...prev };
//                                                 delete next[path];
//                                                 return next;
//                                               });
//                                             }}
//                                           >
//                                             Remove
//                                           </button>
//                                         </div> */}
//                                       </div>
//                                     </div>
//                                   );
//                                 })}
//                               </div>
//                             )}
//                           </FieldArray>
//                         </div>
//                       </FormSection>
//                     </div>

//                     <div className='sf-shell-footer'>
//                       <SubmitButton
//                         isSubmitting={isSubmitting || !hasOneFile || uploadInProgress}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {showPreviewModal && previewUrl ? (
//                   <div
//                     className='sf-image-modal'
//                     onClick={() => setShowPreviewModal(false)}
//                   >
//                     <div
//                       className='sf-image-modal-content'
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       <button
//                         type='button'
//                         className='sf-image-modal-close'
//                         onClick={() => setShowPreviewModal(false)}
//                       >
//                         ×
//                       </button>
//                       <img
//                         src={previewUrl}
//                         alt='Full Preview'
//                         className='sf-image-modal-img'
//                       />
//                     </div>
//                   </div>
//                 ) : null}
//               </NonFieldErrors>
//             </Form>
//           );
//         }}
//       </Formik>
//     </>
//   );
// }

// export default TransferForm;



import React from 'react';
import { Form, Formik, FieldArray } from 'formik';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import {
  CustomDatePicker,
  CustomInput,
  NonFieldErrors,
  CustomSelect
} from '../../../common';
import { useBranches } from '../../../contexts/BranchesContext';

function FormSection({ title, hint, children }) {
  return (
    <section className='sf-section'>
      <div className='sf-section-head'>
        <div>
          <div className='sf-section-title'>{title}</div>
          {hint ? <div className='sf-section-hint'>{hint}</div> : null}
        </div>
      </div>
      <div className='sf-section-body'>{children}</div>
    </section>
  );
}

function TransferForm({ transfertypes, initialValues, onSubmit, progress = {} }) {
  const { branches = [] } = useBranches();
  const [fileUploadState, setFileUploadState] = React.useState({});
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [showPreviewModal, setShowPreviewModal] = React.useState(false);

  const safeTransferTypes = React.useMemo(() => {
    if (Array.isArray(transfertypes)) return transfertypes;
    if (transfertypes && Array.isArray(transfertypes.tranfertypes)) return transfertypes.tranfertypes;
    if (transfertypes && Array.isArray(transfertypes.transfertypes)) return transfertypes.transfertypes;
    return [];
  }, [transfertypes]);

  const receivingBranchOptionsByTT = React.useMemo(() => {
    const map = {};

    safeTransferTypes.forEach((t) => {
      const raw = Array.isArray(t.receiving_accounts_branches) ? t.receiving_accounts_branches : [];

      const options = raw
        .map((x) => {
          if (x && typeof x === 'object') {
            return { id: Number(x.id), name: x.name || `Branch #${x.id}` };
          }
          return { id: Number(x), name: `Branch #${x}` };
        })
        .filter((b) => Number.isFinite(b.id));

      map[Number(t.id)] = options;
    });

    return map;
  }, [safeTransferTypes]);

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

  const getFileExtension = (file) => {
    if (file?.name && file.name.includes('.')) {
      return file.name.split('.').pop().toLowerCase();
    }
    if (file?.type && file.type.includes('/')) {
      return file.type.split('/').pop().toLowerCase();
    }
    return '';
  };

  const formatFileSize = (bytes) => {
    if (!bytes && bytes !== 0) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const uploadFile = (file, url, onProgress) => {
    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', url);

      xhr.onload = () => {
        onProgress?.({ status: 'Uploaded', progress: 100 });
        res();
      };

      xhr.onerror = (evt) => {
        onProgress?.({ status: 'Failed', progress: 0 });
        rej(evt);
      };

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentage = (event.loaded / event.total) * 100;
          onProgress?.({ status: 'Uploading', progress: Math.round(percentage) });
        }
      };

      const blob = new Blob([file], { type: file.type || 'application/octet-stream' });
      xhr.send(blob);
    });
  };

  return (
    <>
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

          .sf-warning {
            margin-top: 0.5rem;
            color: #b45309;
            font-size: 0.9rem;
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

          .sf-inline-action {
            display: flex;
            justify-content: flex-end;
            margin-top: 0.5rem;
          }

          .sf-remove-btn {
            border: 1px solid #ef4444;
            background: #fff;
            color: #dc2626;
            border-radius: 10px;
            padding: 0.55rem 0.9rem;
            cursor: pointer;
            font-weight: 600;
          }

          .sf-remove-btn:hover {
            background: #fef2f2;
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

          body.dark .sf-remove-btn,
          [data-theme='dark'] .sf-remove-btn {
            background: transparent;
            color: #fca5a5;
            border-color: #ef4444;
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

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, isSubmitting, errors, setFieldValue }) => {
          const selectedTransferTypeId = Number(values.transfertype_id || 0);

          const selectedTransferType = safeTransferTypes.find(
            (type) => Number(type.id) === selectedTransferTypeId
          );

          const isFileRequired = Boolean(selectedTransferType?.is_file_required);
          const hasFiles = Array.isArray(values.files) && values.files.length > 0;
          const hasOneFile = Array.isArray(values.files) && values.files.length === 1;
          const uploadedFile = hasOneFile ? values.files[0] : null;
          const uploadInProgress =
            uploadedFile && fileUploadState[uploadedFile.file.path]?.status === 'Uploading';

          const destinationBranchOptions = React.useMemo(() => {
            if (!selectedTransferTypeId) {
              return branches.map((b) => ({ id: Number(b.id), name: b.name }));
            }
            return receivingBranchOptionsByTT[selectedTransferTypeId] || [];
          }, [selectedTransferTypeId, receivingBranchOptionsByTT, branches]);

          React.useEffect(() => {
            if (!selectedTransferTypeId) return;
            if (!values.receiving_branch_id) return;

            const current = Number(values.receiving_branch_id);
            const ok = destinationBranchOptions.some((b) => b.id === current);
            if (!ok) setFieldValue('receiving_branch_id', '', false);
          }, [selectedTransferTypeId, values.receiving_branch_id, destinationBranchOptions, setFieldValue]);

          React.useEffect(() => {
            if (!selectedTransferTypeId) return;
            if (values.receiving_branch_id) return;

            if (destinationBranchOptions.length === 1) {
              setFieldValue('receiving_branch_id', String(destinationBranchOptions[0].id), false);
            }
          }, [selectedTransferTypeId, destinationBranchOptions, values.receiving_branch_id, setFieldValue]);

          const handleDrop = async (acceptedFiles) => {
            if (!acceptedFiles || !acceptedFiles.length) return;

            const file = acceptedFiles[0];
            const filePath = file.path || file.name;

            if (previewUrl) {
              URL.revokeObjectURL(previewUrl);
            }

            if (file.type && file.type.startsWith('image/')) {
              setPreviewUrl(URL.createObjectURL(file));
            } else {
              setPreviewUrl(null);
            }

            const localItem = {
              file: {
                name: file.name,
                path: filePath,
                size: file.size,
                type: file.type,
              },
              description: file.name,
              uploaded_filename: '',
            };

            setFieldValue('files', [localItem], false);
            setFileUploadState((prev) => ({
              ...prev,
              [filePath]: { status: 'Uploading', progress: 0 },
            }));

            try {
              const ext = getFileExtension(file);
              const endpoint = `/usersapi/get_signed_url/?client_method=put_object&bucket=lenda-client-files${
                ext ? `&ext=${encodeURIComponent(ext)}` : ''
              }`;

              const response = await axios.get(endpoint);

              await uploadFile(file, response.data.url, (next) => {
                setFileUploadState((prev) => ({
                  ...prev,
                  [filePath]: next,
                }));
              });

              setFieldValue(
                'files',
                [
                  {
                    ...localItem,
                    uploaded_filename: response.data.filename,
                  },
                ],
                false
              );
            } catch (error) {
              console.log(error);
              setFileUploadState((prev) => ({
                ...prev,
                [filePath]: { status: 'Failed', progress: 0 },
              }));
            }
          };

          return (
            <Form className='sf-form'>
              <NonFieldErrors errors={errors}>
                <div className='sf-page'>
                  <div className='sf-shell'>
                    <div className='sf-shell-head'>
                      <div className='sf-shell-title'>Create transfer</div>
                      <div className='sf-shell-subtitle'>
                        Capture transfer details and upload the supporting file when required by the transfer type.
                      </div>
                    </div>

                    <div className='sf-shell-body'>
                      <FormSection
                        title='Transfer Information'
                        hint='Enter the transfer details below.'
                      >
                        <CustomSelect label='Transfer Type' name='transfertype_id' required>
                          <option value=''>------</option>
                          {safeTransferTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                              {type.name}
                            </option>
                          ))}
                        </CustomSelect>

                        <CustomInput label='Transfer Amount' name='amount' type='number' required />

                        <CustomDatePicker
                          label='Transfer Date'
                          name='date_added'
                          setFieldValue={setFieldValue}
                          required
                        />

                        <CustomSelect
                          label='Send To [Branch]'
                          name='receiving_branch_id'
                          required
                          disabled={!!selectedTransferTypeId && destinationBranchOptions.length === 0}
                        >
                          <option value=''>------</option>
                          {destinationBranchOptions.map((b) => (
                            <option key={b.id} value={b.id}>
                              {b.name}
                            </option>
                          ))}
                        </CustomSelect>

                        {!!selectedTransferTypeId && destinationBranchOptions.length === 0 && (
                          <div className='sf-warning'>
                            No eligible branches for this transfer type.
                          </div>
                        )}

                        <CustomInput label='Reference' name='reference' type='text' />
                        <CustomInput label='Description' name='description' type='text' />
                      </FormSection>

                      <FormSection
                        title='Transfer File'
                        hint='Upload one supporting file when required by the selected transfer type. It uploads immediately after selection.'
                      >
                        <div className='sf-file-field'>
                          <label className='sf-label'>
                            Transfer File {isFileRequired ? '(Required)' : '(Optional)'}
                          </label>

                          <Dropzone onDrop={handleDrop} multiple={false} maxFiles={1}>
                            {({ getRootProps, getInputProps }) => (
                              <section className='sf-dropzone-wrap'>
                                <div {...getRootProps({ className: 'sf-dropzone' })}>
                                  <input {...getInputProps()} />
                                  <p className='sf-dropzone-text'>
                                    Drag and drop one file here, or click to select a file
                                  </p>
                                </div>
                              </section>
                            )}
                          </Dropzone>

                          {isFileRequired && !hasOneFile && (
                            <div className='text-danger' style={{ marginTop: '0.25rem' }}>
                              Please upload one file before submitting.
                            </div>
                          )}

                          {hasFiles && !hasOneFile && (
                            <div className='text-danger' style={{ marginTop: '0.25rem' }}>
                              Please upload only one file.
                            </div>
                          )}

                          <FieldArray name='files'>
                            {({ remove }) => (
                              <div>
                                {(values.files || []).map((item, index) => {
                                  const path = item.file?.path || item.file?.name;
                                  const currentProgress =
                                    fileUploadState[path] || progress[path] || {};
                                  const isImage =
                                    item.file?.type && item.file.type.startsWith('image/');

                                  return (
                                    <div key={`${path}-${index}`} className='sf-file-preview-wrap'>
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
                                        <div className='sf-file-meta-name'>
                                          {item.file?.name || item.description}
                                        </div>

                                        <small className='sf-help'>
                                          {item.file?.type || 'Unknown file type'}
                                        </small>

                                        <small className='sf-help'>
                                          {formatFileSize(item.file?.size)}
                                        </small>

                                        {currentProgress.status === 'Uploading' ? (
                                          <>
                                            <div className='sf-upload-progress'>
                                              <i className='fa fa-spinner fa-spin sf-upload-progress-icon'></i>
                                              <div className='sf-upload-progress-text'>
                                                {currentProgress.progress || 0}% uploading...
                                              </div>
                                            </div>
                                            <div className='sf-upload-bar'>
                                              <div
                                                className='sf-upload-bar-fill'
                                                style={{
                                                  width: `${currentProgress.progress || 0}%`
                                                }}
                                              ></div>
                                            </div>
                                          </>
                                        ) : null}

                                        {currentProgress.status &&
                                        currentProgress.status !== 'Uploading' ? (
                                          <small className='sf-help'>
                                            {currentProgress.status}
                                            {isImage && previewUrl ? '. Click the image to preview.' : ''}
                                          </small>
                                        ) : null}

                                        {/* <CustomInput
                                          label='File Description'
                                          name={`files.${index}.description`}
                                          type='text'
                                        />

                                        <div className='sf-inline-action'>
                                          <button
                                            type='button'
                                            className='sf-remove-btn'
                                            onClick={() => {
                                              if (previewUrl) {
                                                URL.revokeObjectURL(previewUrl);
                                                setPreviewUrl(null);
                                              }
                                              remove(index);
                                              setFileUploadState((prev) => {
                                                const next = { ...prev };
                                                delete next[path];
                                                return next;
                                              });
                                            }}
                                          >
                                            Remove
                                          </button>
                                        </div> */}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </FieldArray>
                        </div>
                      </FormSection>
                    </div>

                    <div className='sf-shell-footer'>
                      <SubmitButton
                        isSubmitting={
                          isSubmitting ||
                          uploadInProgress ||
                          (isFileRequired && !hasOneFile)
                        }
                      />
                    </div>
                  </div>
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
              </NonFieldErrors>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

const SubmitButton = ({isSubmitting}) => {
  if (isSubmitting) {
    return (
      <div className="modal-footer justify-content-between">
        <button className='btn btn-info' type='submit' style={{pointerEvents: 'none', opacity: '0.7'}} disabled={true}>
          Submit
        </button>
      </div>
    )
  }
  return <button className='btn btn-info' type='submit'>Submit</button>

}

export default TransferForm;