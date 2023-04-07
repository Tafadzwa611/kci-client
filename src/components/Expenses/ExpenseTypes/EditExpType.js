import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ExpenseTypeForm from './ExpenseTypeForm';
import { addSchema } from './schema';

function EditExpType({initialValues, setView, setSelectedExpType, setExpTypes}) {
  const back = () => setView('list');
  initialValues.date_of_account = initialValues.account_date;

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.put(`/expensesapi/edit_expense_type/${initialValues.id}/`, values, CONFIG);
      setExpTypes(curr => {
        return curr.map(exptype => {
          if (exptype.id === values.id) {
            return values
          }
          return exptype
        })
      });
      setSelectedExpType(values);
      setView('list');
    } catch (error) {
      if (error.message === 'Network Error') {
        actions.setErrors({responseStatus: 'Network Error'});
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

export default EditExpType;