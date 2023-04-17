import React from 'react';
import { Form, Formik } from 'formik';
import {
  CustomMultiSelect,
  NonFieldErrors,
  ButtonDefault,
  SubmitButton
} from '../../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';

const DAYS_OF_WEEK = [
  {value: 0, label: 'Monday'},
  {value: 1, label: 'Tuesday'},
  {value: 2, label: 'Wednesday'},
  {value: 3, label: 'Thursday'},
  {value: 4, label: 'Friday'},
  {value: 5, label: 'Saturday'},
  {value: 6, label: 'Sunday'}
];

function Edit({setView, days, setDays}) {
  const back = () => setView('list');

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.patch('/usersapi/update_non_working_days/', values, CONFIG);
      setDays(values.non_working_days);
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
    <>
      <ButtonDefault value={'Back'} handler={back} />
      <Formik initialValues={{non_working_days: days}} onSubmit={onSubmit}>
        {({ isSubmitting, errors, setFieldValue, values }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='divider divider-info'>
                <span>Non-Working Days</span>
              </div>
              <CustomMultiSelect
                label='Non-Working Days'
                name='non_working_days'
                options={DAYS_OF_WEEK}
                setFieldValue={setFieldValue}
                initVals={DAYS_OF_WEEK.filter(dy => values.non_working_days.includes(dy.value))}
              />
              <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
              <div style={{display:'flex', justifyContent: 'flex-end'}}> 
                <SubmitButton isSubmitting={isSubmitting}/>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Edit;