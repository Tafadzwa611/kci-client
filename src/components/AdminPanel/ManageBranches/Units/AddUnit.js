import React from 'react';
import UnitForm from './UnitForm';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useBranches } from '../../../../contexts/BranchesContext';

function AddUnit({setView, setUnit, setUnits}) {
  const {branches} = useBranches();
  const userBranch = branches.find((br) => br.is_user_branch);
  const initialValues = {name: '', branch_id: userBranch.id, is_active:false};
  const back = () => setView('list');

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const data = {...values}
      const response = await axios.post('/usersapi/add_unit/', data, CONFIG);
      console.log(response)
      setUnits(curr => [response.data, ...curr]);
      setUnit(response.data);
      setView('list');
    } catch (error) {
      console.log(error);
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
    <UnitForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      back={back}
    />
  )
}

export default AddUnit;