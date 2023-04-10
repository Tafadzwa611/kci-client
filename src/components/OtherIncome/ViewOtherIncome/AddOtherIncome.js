import React from 'react';
import {addSchema} from './schema';
import IncomeForm from './IncomeForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../utils/utils';

function AddOtherIncome({incometypes, fundaccounts}) {
  const navigate = useNavigate();

  const initialValues = {
    income_type_id: '',
    otherincome_name: '',
    income_amount: '',
    income_date: '',
    reference: '',
    description: '',
    fund_account_id: '',
  };

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post('/otherincomeapi/add_otherincome/', data, CONFIG);
      navigate({pathname: '/otherincome/viewotherincome', search: `?income_id=${response.data.id}`});
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
    <IncomeForm
      incometypes={incometypes}
      fundaccounts={fundaccounts}
      initialValues={initialValues}
      validationSchema={addSchema}
      onSubmit={onSubmit}
    />
  )
}

export default AddOtherIncome;