import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import FeeForm from './FeeForm';

function EditCat({initialValues, setView, setSelectedFee, setFees}) {
  const back = () => setView('list');

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.put(`/loansapi/update_loan_fee/${initialValues.id}/`, values, CONFIG);
      setFees(curr => {
        return curr.map(fee => {
          if (fee.id === values.id) {
            return values
          }
          return fee
        })
      });
      setSelectedFee(values);
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
    <FeeForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      back={back}
    />
  )
}

export default EditCat;