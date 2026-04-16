import React, { useState } from 'react';
import TransferForm from './TransferForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../utils/utils';

function CreateTransfer({ transfertypes }) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({});

  const initialValues = {
    transfertype_id: '',
    amount: '',
    receiving_branch_id: '',
    reference: '',
    description: '',
    date_added: '',
    files: [],
  };

  const onSubmit = async (values, actions) => {
    try {
      const safeTransferTypes = Array.isArray(transfertypes)
        ? transfertypes
        : Array.isArray(transfertypes?.tranfertypes)
          ? transfertypes.tranfertypes
          : Array.isArray(transfertypes?.transfertypes)
            ? transfertypes.transfertypes
            : [];

      const selectedTransferType = safeTransferTypes.find(
        item => String(item.id) === String(values.transfertype_id)
      );

      const isFileRequired = Boolean(selectedTransferType?.is_file_required);
      const hasFiles = Array.isArray(values.files) && values.files.length > 0;

      if (isFileRequired && !hasFiles) {
        actions.setErrors({
          files: ['A file is required for this transfer type.']
        });
        actions.setSubmitting(false);
        return;
      }

      if (hasFiles && values.files.length !== 1) {
        actions.setErrors({
          files: ['Please upload exactly one file.']
        });
        actions.setSubmitting(false);
        return;
      }

      const currentFile = hasFiles ? values.files[0] : null;

      if (hasFiles && !currentFile.uploaded_filename) {
        actions.setErrors({
          files: ['File upload failed. Please upload the file again.']
        });
        actions.setSubmitting(false);
        return;
      }

      const data = {
        ...removeEmptyValues({
          transfertype_id: values.transfertype_id,
          amount: values.amount,
          receiving_branch_id: values.receiving_branch_id,
          reference: values.reference,
          description: values.description,
          date_added: values.date_added,
        }),
        ...(hasFiles
          ? {
              files: [
                {
                  filename: currentFile.uploaded_filename,
                  description: currentFile.description || currentFile.file?.name,
                }
              ],
            }
          : {}),
      };

      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.post('/acc-api/create_transfer/', data, CONFIG);

      navigate({
        pathname: '/transfers/viewtransfers',
        search: `?transfer_id=${response.data.id}`
      });
    } catch (error) {
      console.log('CreateTransfer submit error:', error);

      if (error.message === 'Network Error') {
        actions.setErrors({ responseStatus: 'Network Error' });
      } else if (error.response && error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else if (error.response) {
        actions.setErrors({ responseStatus: error.response.status });
      } else {
        actions.setErrors({ responseStatus: error.message || 'Unknown Error' });
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <TransferForm
      transfertypes={transfertypes}
      initialValues={initialValues}
      onSubmit={onSubmit}
      progress={progress}
    />
  );
}

export default CreateTransfer;