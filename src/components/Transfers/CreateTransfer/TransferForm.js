import React from 'react';
import { Form, Formik } from 'formik';
import {
  CustomDatePicker,
  CustomInput,
  NonFieldErrors,
  SubmitButton,
  CustomSelect
} from '../../../common';

import { useBranches } from '../../../contexts/BranchesContext';

function TransferForm({ transfertypes, initialValues, onSubmit }) {
  const { branches = [] } = useBranches(); // can still be used as fallback when TT has no branches

  const safeTransferTypes = React.useMemo(() => {
    if (Array.isArray(transfertypes)) return transfertypes;
    if (transfertypes && Array.isArray(transfertypes.tranfertypes)) return transfertypes.tranfertypes;
    if (transfertypes && Array.isArray(transfertypes.transfertypes)) return transfertypes.transfertypes;
    return [];
  }, [transfertypes]);

  // Map: transfertype_id -> [{id, name}]
  const receivingBranchOptionsByTT = React.useMemo(() => {
    const map = {};

    safeTransferTypes.forEach((t) => {
      const raw = Array.isArray(t.receiving_accounts_branches) ? t.receiving_accounts_branches : [];

      const options = raw
        .map((x) => {
          // new shape: {id, name}
          if (x && typeof x === 'object') {
            return { id: Number(x.id), name: x.name || `Branch #${x.id}` };
          }
          // fallback old shape: id only
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

        // ✅ destination branches come from backend transfer type
        const destinationBranchOptions = React.useMemo(() => {
          if (!selectedTransferTypeId) {
            // no transfer type yet => show branches from context (optional)
            return branches.map((b) => ({ id: Number(b.id), name: b.name }));
          }
          return receivingBranchOptionsByTT[selectedTransferTypeId] || [];
        }, [selectedTransferTypeId, receivingBranchOptionsByTT, branches]);

        // Clear invalid selection if transfer type changes
        React.useEffect(() => {
          if (!selectedTransferTypeId) return;
          if (!values.receiving_branch_id) return;

          const current = Number(values.receiving_branch_id);
          const ok = destinationBranchOptions.some((b) => b.id === current);
          if (!ok) setFieldValue('receiving_branch_id', '', false);
        }, [selectedTransferTypeId, values.receiving_branch_id, destinationBranchOptions, setFieldValue]);

        // Optional: if only one destination branch, auto-select it (IBT case)
        React.useEffect(() => {
          if (!selectedTransferTypeId) return;
          if (values.receiving_branch_id) return;

          if (destinationBranchOptions.length === 1) {
            setFieldValue('receiving_branch_id', String(destinationBranchOptions[0].id), false);
          }
        }, [selectedTransferTypeId, destinationBranchOptions, values.receiving_branch_id, setFieldValue]);

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

              <div className='divider divider-default' style={{ padding: '1.25rem' }}></div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <SubmitButton isSubmitting={isSubmitting} />
              </div>
            </NonFieldErrors>
          </Form>
        );
      }}
    </Formik>
  );
}

export default TransferForm;

