import React from 'react';
import {addSchema} from './schema';
import ExpenseForm from './ExpenseForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../utils/utils';

function AddExpense({expensetypes, fundaccounts}) {
  const navigate = useNavigate();

  const initialValues = {
    expense_type_id: '',
    expense_name: '',
    expense_amount: '',
    expense_date: '',
    reference: '',
    description: '',
    fund_account_id: '',
  };

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post('/expensesapi/add_expense/', data, CONFIG);
      navigate({pathname: '/expenses/viewexpenses', search: `?expense_id=${response.data.id}`});
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
    <ExpenseForm
      expensetypes={expensetypes}
      fundaccounts={fundaccounts}
      initialValues={initialValues}
      validationSchema={addSchema}
      onSubmit={onSubmit}
    />
  )
}

export default AddExpense;