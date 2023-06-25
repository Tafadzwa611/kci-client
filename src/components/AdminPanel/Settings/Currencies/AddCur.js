import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import CurrencyForm from './CurrencyForm';
import { addSchema } from './schema';

function AddCur({setView, setCurrencyId}) {
  const initialValues = {fullname: '', shortname: '', date_created: ''};
  const back = () => setView('list');

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post('/usersapi/add_currency/', values, CONFIG);
      setCurrencyId(response.data.id);
      setView('list');
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
    <CurrencyForm
      initialValues={initialValues}
      validationSchema={addSchema}
      onSubmit={onSubmit}
      back={back}
    />
  )
}

export default AddCur;