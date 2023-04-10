import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import IncomeTypeForm from './IncomeTypeForm';
import { addSchema } from './schema';

function EditIncType({initialValues, setView, setSelectedIncType, setIncomeTypeData}) {
  const back = () => setView('list');
  initialValues.date_of_account = initialValues.account_date;

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.put(`/otherincomeapi/update_otherincome_type/${initialValues.id}/`, values, CONFIG);
      setIncomeTypeData(curr => {
        return curr.map(inctype => {
          if (inctype.id === values.id) {
            values.name = values.name.toUpperCase()
            return values
          }
          return inctype
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