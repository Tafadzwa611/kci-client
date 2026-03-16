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

  const uploadFileToSpaces = (file, url, setProgress) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', url);

      xhr.onload = () => resolve();
      xhr.onerror = (evt) => reject(evt);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentage = (event.loaded / event.total) * 100;
          setProgress((curr) => ({
            ...curr,
            [file.path]: {
              ...curr[file.path],
              progress: Math.round(percentage),
              status: 'In Progress',
            }
          }));
        }
      };

      const blob = new Blob([file], { type: file.type || 'application/octet-stream' });
      xhr.send(blob);
    });
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

      let uploadedFiles = [];

      const initialProgress = {};
      values.files.forEach((item) => {
        initialProgress[item.file.path] = { progress: 0, status: 'Queued' };
      });
      setProgress(initialProgress);

      const urls = Array(values.files.length).fill(
        '/usersapi/get_signed_url/?client_method=put_object&bucket=lenda-client-files'
      );

      const signedUrls = await axios.all(urls.map((url) => axios.get(url)));

      uploadedFiles = await Promise.all(
        signedUrls.map(async (response, idx) => {
          const currentFile = values.files[idx];

          await uploadFileToSpaces(currentFile.file, response.data.url, setProgress);

          setProgress((curr) => ({
            ...curr,
            [currentFile.file.path]: {
              ...curr[currentFile.file.path],
              progress: 100,
              status: 'Uploaded',
            }
          }));

          return {
            filename: response.data.filename,
            description: currentFile.description || currentFile.file.name,
          };
        })
      );

      const data = {
        ...removeEmptyValues({
          transfertype_id: values.transfertype_id,
          amount: values.amount,
          receiving_branch_id: values.receiving_branch_id,
          reference: values.reference,
          description: values.description,
          date_added: values.date_added,
        }),
        files: uploadedFiles,
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