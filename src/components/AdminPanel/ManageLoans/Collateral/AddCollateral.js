import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import CollateralForm from './CollateralForm';

function AddCollateral({setView, setSelectedCollateral, setCollaterals}) {
  const initialValues = {name: ''};
  const back = () => setView('list');

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post('/loansapi/add_loan_collateral_type/', values, CONFIG);
      setCollaterals(curr => [response.data, ...curr]);
      setSelectedCollateral(response.data);
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
    <CollateralForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      back={back}
    />
  )
}

export default AddCollateral;