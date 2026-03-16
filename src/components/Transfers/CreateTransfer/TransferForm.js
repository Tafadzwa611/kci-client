// import React from 'react';
// import { Form, Formik, FieldArray } from 'formik';
// import Dropzone from 'react-dropzone';
// import {
//   CustomDatePicker,
//   CustomInput,
//   NonFieldErrors,
//   SubmitButton,
//   CustomSelect
// } from '../../../common';

// import { useBranches } from '../../../contexts/BranchesContext';

// function TransferForm({ transfertypes, initialValues, onSubmit, progress = {} }) {
//   const { branches = [] } = useBranches();

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

//   return (
//     <Formik initialValues={initialValues} onSubmit={onSubmit}>
//       {({ values, isSubmitting, errors, setFieldValue }) => {
//         const selectedTransferTypeId = Number(values.transfertype_id || 0);

//         const destinationBranchOptions = React.useMemo(() => {
//           if (!selectedTransferTypeId) {
//             return branches.map((b) => ({ id: Number(b.id), name: b.name }));
//           }
//           return receivingBranchOptionsByTT[selectedTransferTypeId] || [];
//         }, [selectedTransferTypeId, receivingBranchOptionsByTT, branches]);

//         React.useEffect(() => {
//           if (!selectedTransferTypeId) return;
//           if (!values.receiving_branch_id) return;

//           const current = Number(values.receiving_branch_id);
//           const ok = destinationBranchOptions.some((b) => b.id === current);
//           if (!ok) setFieldValue('receiving_branch_id', '', false);
//         }, [selectedTransferTypeId, values.receiving_branch_id, destinationBranchOptions, setFieldValue]);

//         React.useEffect(() => {
//           if (!selectedTransferTypeId) return;
//           if (values.receiving_branch_id) return;

//           if (destinationBranchOptions.length === 1) {
//             setFieldValue('receiving_branch_id', String(destinationBranchOptions[0].id), false);
//           }
//         }, [selectedTransferTypeId, destinationBranchOptions, values.receiving_branch_id, setFieldValue]);

//         const handleDrop = (acceptedFiles) => {
//           const mappedFiles = acceptedFiles.map((file) => ({
//             file,
//             description: file.name,
//           }));

//           setFieldValue('files', [...(values.files || []), ...mappedFiles]);
//         };

//         return (
//           <Form>
//             <NonFieldErrors errors={errors}>
//               <div className='divider divider-info'>
//                 <span>Transfer Information</span>
//               </div>

//               <div style={{ marginBottom: '1.5rem', marginTop: '1.5rem' }}>
//                 <CustomSelect label='Transfer Type' name='transfertype_id' required>
//                   <option value=''>------</option>
//                   {safeTransferTypes.map((type) => (
//                     <option key={type.id} value={type.id}>
//                       {type.name}
//                     </option>
//                   ))}
//                 </CustomSelect>
//               </div>

//               <CustomInput label='Transfer Amount' name='amount' type='number' required />

//               <CustomDatePicker
//                 label='Transfer Date'
//                 name='date_added'
//                 setFieldValue={setFieldValue}
//                 required
//               />

//               <div style={{ marginTop: '1rem' }}>
//                 <CustomSelect
//                   label='Send To [Branch]'
//                   name='receiving_branch_id'
//                   required
//                   disabled={!!selectedTransferTypeId && destinationBranchOptions.length === 0}
//                 >
//                   <option value=''>------</option>
//                   {destinationBranchOptions.map((b) => (
//                     <option key={b.id} value={b.id}>
//                       {b.name}
//                     </option>
//                   ))}
//                 </CustomSelect>

//                 {!!selectedTransferTypeId && destinationBranchOptions.length === 0 && (
//                   <div className="text-warning" style={{ marginTop: '0.5rem' }}>
//                     No eligible branches for this transfer type.
//                   </div>
//                 )}
//               </div>

//               <CustomInput label='Reference' name='reference' type='text' />
//               <CustomInput label='Description' name='description' type='text' />

//               <div className='divider divider-info' style={{ marginTop: '1.5rem' }}>
//                 <span>Transfer Files</span>
//               </div>

//               <Dropzone onDrop={handleDrop}>
//                 {({ acceptedFiles, getRootProps, getInputProps }) => (
//                   <section className='container'>
//                     <div {...getRootProps({ className: 'dropzone' })}>
//                       <input {...getInputProps()} />
//                       <p className='dropzone__text'>
//                         Drag and drop some files here, or click to select files
//                       </p>
//                     </div>

//                     <aside>
//                       <p style={{ marginTop: '1rem' }}>Selected Files</p>
//                       <ul>
//                         {acceptedFiles.map(file => (
//                           <li key={file.path}>{file.path}</li>
//                         ))}
//                       </ul>
//                     </aside>
//                   </section>
//                 )}
//               </Dropzone>

//               <FieldArray name="files">
//                 {({ remove }) => (
//                   <div style={{ marginTop: '1rem' }}>
//                     {(values.files || []).map((item, index) => (
//                       <div
//                         key={`${item.file.path}-${index}`}
//                         style={{
//                           border: '1px solid #ddd',
//                           padding: '1rem',
//                           borderRadius: '6px',
//                           marginBottom: '1rem'
//                         }}
//                       >
//                         <div style={{ marginBottom: '0.5rem' }}>
//                           {item.file.name}{' '}
//                           {progress[item.file.path]
//                             ? `${progress[item.file.path].status} ${progress[item.file.path].progress}%`
//                             : ''}
//                         </div>

//                         <CustomInput
//                           label='File Description'
//                           name={`files.${index}.description`}
//                           type='text'
//                         />

//                         <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
//                           <button
//                             type='button'
//                             className='btn btn-danger'
//                             onClick={() => remove(index)}
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </FieldArray>

//               <div className='divider divider-default' style={{ padding: '1.25rem' }}></div>

//               <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//                 <SubmitButton isSubmitting={isSubmitting} />
//               </div>
//             </NonFieldErrors>
//           </Form>
//         );
//       }}
//     </Formik>
//   );
// }

// export default TransferForm;



import React from 'react';
import { Form, Formik, FieldArray } from 'formik';
import Dropzone from 'react-dropzone';
import {
  CustomDatePicker,
  CustomInput,
  NonFieldErrors,
  SubmitButton,
  CustomSelect
} from '../../../common';

import { useBranches } from '../../../contexts/BranchesContext';

function TransferForm({ transfertypes, initialValues, onSubmit, progress = {} }) {
  const { branches = [] } = useBranches();

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

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, isSubmitting, errors, setFieldValue }) => {
        const selectedTransferTypeId = Number(values.transfertype_id || 0);
        const hasOneFile = Array.isArray(values.files) && values.files.length === 1;

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

        const handleDrop = (acceptedFiles) => {
          if (!acceptedFiles || !acceptedFiles.length) return;

          const file = acceptedFiles[0];
          const mappedFile = {
            file,
            description: file.name,
          };

          setFieldValue('files', [mappedFile]);
        };

        return (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='divider divider-info'>
                <span>Transfer Information</span>
              </div>

              <div style={{ marginBottom: '1.5rem', marginTop: '1.5rem' }}>
                <CustomSelect label='Transfer Type' name='transfertype_id' required>
                  <option value=''>------</option>
                  {safeTransferTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </CustomSelect>
              </div>

              <CustomInput label='Transfer Amount' name='amount' type='number' required />

              <CustomDatePicker
                label='Transfer Date'
                name='date_added'
                setFieldValue={setFieldValue}
                required
              />

              <div style={{ marginTop: '1rem' }}>
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
                  <div className="text-warning" style={{ marginTop: '0.5rem' }}>
                    No eligible branches for this transfer type.
                  </div>
                )}
              </div>

              <CustomInput label='Reference' name='reference' type='text' />
              <CustomInput label='Description' name='description' type='text' />

              <div className='divider divider-info' style={{ marginTop: '1.5rem' }}>
                <span>Transfer File</span>
              </div>

              <Dropzone onDrop={handleDrop} multiple={false} maxFiles={1}>
                {({ getRootProps, getInputProps }) => (
                  <section className='container'>
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <p className='dropzone__text'>
                        Drag and drop one file here, or click to select a file
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>

              {!hasOneFile && (
                <div className='text-danger' style={{ marginTop: '0.75rem' }}>
                  Please upload one file before submitting.
                </div>
              )}

              <FieldArray name="files">
                {({ remove }) => (
                  <div style={{ marginTop: '1rem' }}>
                    {(values.files || []).map((item, index) => (
                      <div
                        key={`${item.file.path}-${index}`}
                        style={{
                          border: '1px solid #ddd',
                          padding: '1rem',
                          borderRadius: '6px',
                          marginBottom: '1rem'
                        }}
                      >
                        <div style={{ marginBottom: '0.5rem' }}>
                          {item.file.name}{' '}
                          {progress[item.file.path]
                            ? `${progress[item.file.path].status} ${progress[item.file.path].progress}%`
                            : ''}
                        </div>

                        <CustomInput
                          label='File Description'
                          name={`files.${index}.description`}
                          type='text'
                        />

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                          <button
                            type='button'
                            className='btn btn-danger'
                            onClick={() => remove(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>

              <div className='divider divider-default' style={{ padding: '1.25rem' }}></div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <SubmitButton isSubmitting={isSubmitting || !hasOneFile} />
              </div>
            </NonFieldErrors>
          </Form>
        );
      }}
    </Formik>
  );
}

export default TransferForm;