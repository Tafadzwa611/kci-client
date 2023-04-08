import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ExpenseTypeForm from './ExpenseTypeForm';
import { addSchema } from './schema';

function AddExpType({setView, setExpenseTypeId}) {
  const initialValues = {name: '', date_of_account: '', currency_id: '', is_active: true};
  const back = () => setView('list');

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post('/expensesapi/add_expense_type/', values, CONFIG);
      // console.log(response);
      // setExpenseTypeId(response.data.id);
      setView('list');
    } catch (error) {
      console.log(error);
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
    <ExpenseTypeForm
      initialValues={initialValues}
      validationSchema={addSchema}
      onSubmit={onSubmit}
      back={back}
    />
  )
}

export default AddExpType;