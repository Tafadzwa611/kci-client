import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import BranchForm from './BranchForm';
import { addSchema } from './schema';

function AddBranch({setView, setBranchData}) {
  const initialValues = {name: '', geographical_location: '', branch_code: '', date_of_opening: ''};
  const back = () => setView('list');

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post('/usersapi/add_branch/', values, CONFIG);
      setBranchData(curr => [response.data, ...curr])
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
    <BranchForm
      initialValues={initialValues}
      validationSchema={addSchema}
      onSubmit={onSubmit}
      back={back}
    />
  )
}

export default AddBranch;