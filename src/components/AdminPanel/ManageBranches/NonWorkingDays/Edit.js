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
  { value: 0, label: 'Monday' },
  { value: 1, label: 'Tuesday' },
  { value: 2, label: 'Wednesday' },
  { value: 3, label: 'Thursday' },
  { value: 4, label: 'Friday' },
  { value: 5, label: 'Saturday' },
  { value: 6, label: 'Sunday' }
];

function Edit({ setView, days, setDays }) {
  const back = () => setView('list');

  const onSubmit = async (values, actions) => {
    console.log(values);
    try {
      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };
      await axios.patch(
        '/usersapi/update_non_working_days/',
        { non_working_days: values.non_working_days.map(day => day.value) },
        CONFIG
      );
      setDays(values.non_working_days.map(day => day.value));
      setView('list');
    } catch (error) {
      if (error.message === 'Network Error') {
        actions.setErrors({ responseStatus: 'Network Error' });
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else {
        actions.setErrors({ responseStatus: error.response.status });
      }
    }
  };

  return (
    <div className='sf-page'>
      <div style={{ marginBottom: 12 }}>
        <ButtonDefault value={'Back'} handler={back} />
      </div>

      <Formik initialValues={{ non_working_days: days }} onSubmit={onSubmit}>
        {({ isSubmitting, errors, setFieldValue, values }) => (
          <Form autoComplete='off' className='sf-form'>
            <NonFieldErrors errors={errors}>
              <div className='sf-shell'>
                <div className='sf-shell-head'>
                  <div className='sf-shell-title'>Non-Working Days</div>
                  <div className='sf-shell-subtitle'>
                    Select the days that should be treated as non-working days in the system.
                  </div>
                </div>

                <div className='sf-shell-body'>
                  <section className='sf-section'>
                    <div className='sf-section-head'>
                      <div className='sf-section-title'>Day selection</div>
                      <div className='sf-section-hint'>
                        Choose one or more weekdays to mark as non-working days.
                      </div>
                    </div>

                    <div className='sf-section-body sf-stack'>
                      <CustomMultiSelect
                        label='Non-Working Days'
                        name='non_working_days'
                        options={DAYS_OF_WEEK}
                        setFieldValue={setFieldValue}
                        initVals={DAYS_OF_WEEK.filter(dy => values.non_working_days.includes(dy.value))}
                      />
                    </div>
                  </section>
                </div>

                <div className='sf-shell-footer'>
                  <SubmitButton isSubmitting={isSubmitting} />
                </div>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Edit;