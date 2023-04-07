import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import IncomeTypeForm from './IncomeTypeForm';
import { addSchema } from './schema';

function EditIncType({initialValues, setView, setSelectedIncType, setIncTypes}) {
  const back = () => setView('list');

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.put(`/loansapi/edit_product_group/${initialValues.id}/`, values, CONFIG);
      setIncTypes(curr => {
        return curr.map(cat => {
          if (cat.id === values.id) {
            return values
          }
          return cat
        })
      });
      setSelectedIncType(values);
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
    <IncomeTypeForm
      initialValues={initialValues}
      validationSchema={addSchema}
      onSubmit={onSubmit}
      back={back}
    />
  )
}

export default EditIncType;