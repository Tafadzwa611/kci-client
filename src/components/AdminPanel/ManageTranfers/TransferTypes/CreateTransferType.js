import React from 'react';
import TransferTypeForm from './TransferTypeForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../../utils/utils';

function CreateTransferType({branch_ids}) {
  const navigate = useNavigate();

  const initialValues = {
    currency_id: '',
    name: '',
    branch_ids: [],
    receiving_accounts_ids: [],
    sending_accounts_ids: [],
  };

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post('/acc-api/create_transfer_type/', data, CONFIG);
      navigate({pathname: '/acc-api/transfer-types', search: `?transfertype_id=${response.data.id}`});
    } catch (error) {
      if (error.message === "Network Error") {
        actions.setErrors({responseStatus: "Network Error"});
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({responseStatus: error.response.status, ...error.response.data});
      } else {
        actions.setErrors({responseStatus: error.response.status});
      }
    }
  }

  return (
    <TransferTypeForm
      branch_ids={branch_ids}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  )
}

export default CreateTransferType;