import React from 'react';
import UnitForm from './UnitForm';
import axios from 'axios';
import Cookies from 'js-cookie';

function EditUnit({
  initialValues,
  setView,
  setUnit,
  setUnits
}) {
  const back = () => setView('list');
  const initialValuesEdit = {name: initialValues.name, branch_id: initialValues.branch, is_active: initialValues.is_active};

  console.log(initialValues)

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const data = {...values}
      await axios.put(`/usersapi/update_unit/${initialValues.id}/`, data, CONFIG);
      setUnits(curr => {
        return curr.map(unit => {
          if (unit.id === values.id) {
            return values
          }
          return unit
        })
      });
      setUnit(data);
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
    <UnitForm
      initialValues={initialValuesEdit}
      onSubmit={onSubmit}
      back={back}
    />
  )
}

export default EditUnit;