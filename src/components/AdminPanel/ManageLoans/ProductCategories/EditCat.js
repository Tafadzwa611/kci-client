import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import CategoryForm from './CategoryForm';
import { addSchema } from './schema';

function EditCat({initialValues, setView, setSelectedCat, setCats}) {
  const back = () => setView('list');

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.put(`/loansapi/edit_product_group/${initialValues.id}/`, values, CONFIG);
      setCats(curr => {
        return curr.map(cat => {
          if (cat.id === values.id) {
            return values
          }
          return cat
        })
      });
      setSelectedCat(values);
      setView('list');
    } catch (error) {
      if (error.message === 'Network Error') {
        actions.setErrors({responseStatus: 'Network Error'});
      } else if (error.response.status === 400) {
        actions.setErrors({responseStatus: error.response.status, ...error.response.data});
      } else {
        actions.setErrors({responseStatus: error.response.status});
      }
    }
  }

  return (
    <CategoryForm
      initialValues={initialValues}
      validationSchema={addSchema}
      onSubmit={onSubmit}
      back={back}
    />
  )
}

export default EditCat;