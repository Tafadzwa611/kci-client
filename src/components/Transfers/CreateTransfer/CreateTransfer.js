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
      if (!values.files || values.files.length !== 1) {
        actions.setErrors({
          files: ['Please upload exactly one file.']
        });
        actions.setSubmitting(false);
        return;
      }

      const currentFile = values.files[0];

      if (!currentFile.uploaded_filename) {
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
        files: [
          {
            filename: currentFile.uploaded_filename,
            description: currentFile.description || currentFile.file?.name,
          }
        ],
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
      if (error.message === 'Network Error') {
        actions.setErrors({ responseStatus: 'Network Error' });
      } else if (error.response && error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else if (error.response) {
        actions.setErrors({ responseStatus: error.response.status });
      } else {
        actions.setErrors({ responseStatus: 'Unknown Error' });
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