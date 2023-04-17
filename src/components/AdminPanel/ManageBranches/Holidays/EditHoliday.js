import React from 'react';
import HolidayForm from './HolidayForm';
import axios from 'axios';
import Cookies from 'js-cookie';

function EditHoliday({
  initialValues,
  setView,
  setHoliday,
  setHolidays
}) {
  const back = () => setView('list');

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.put(`/usersapi/update_branch_holiday/${initialValues.id}/`, values, CONFIG);
      setHolidays(curr => {
        return curr.map(holiday => {
          if (holiday.id === values.id) {
            return values
          }
          return holiday
        })
      });
      setHoliday(values);
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
    <HolidayForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      back={back}
    />
  )
}

export default EditHoliday;