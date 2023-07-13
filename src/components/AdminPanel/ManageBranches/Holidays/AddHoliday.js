import React from 'react';
import HolidayForm from './HolidayForm';
import axios from 'axios';
import Cookies from 'js-cookie';

function AddHoliday({setView, setHoliday, setHolidays}) {
  const initialValues = {description: '', holiday_date: '', branch_ids: [], recurring: false};
  const back = () => setView('list');

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const data = {...values, branch_ids: values.branch_ids.map(br => br.value)}
      const response = await axios.post('/usersapi/add_branch_holiday/', data, CONFIG);
      setHolidays(curr => [response.data, ...curr]);
      setHoliday(response.data);
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
    <HolidayForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      back={back}
    />
  )
}

export default AddHoliday;