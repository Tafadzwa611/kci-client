import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import {
  CustomDatePickerFilter,
  CustomSelectFilter,
  SubmitButtonFilter,
  NonFieldErrors
} from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import File from './File';

function Filter() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const initialValues = { file_name: '', action: '', db_date: '' };
  const isMobile = window.innerWidth <= 900;

  const onSubmit = async (values, actions) => {
    try {
      const fileName = files[0].name;
      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.post(
        '/loansapi/start_batch_approval/',
        { ...values, file_name: fileName },
        CONFIG
      );
      navigate({ pathname: `/loans/viewloans/approval-report/${response.data.result}` });
    } catch (error) {
      console.log(error);
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
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting, setFieldValue, errors }) => (
        <div className='search_background'>
          <div
            className='row-containers'
            style={{
              border: 'none',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <Form>
              <NonFieldErrors errors={errors}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '1rem' : '0'
                  }}
                >
                  <div
                    className='row-payments-container'
                    style={{
                      width: isMobile ? '100%' : '48%',
                      minWidth: 0
                    }}
                  >
                    <CustomDatePickerFilter
                      label='Expected Disbursement Date'
                      name='db_date'
                      setFieldValue={setFieldValue}
                      required
                    />
                  </div>

                  <div
                    className='row-payments-container'
                    style={{
                      width: isMobile ? '100%' : '48%',
                      minWidth: 0
                    }}
                  >
                    <CustomSelectFilter label='Action' name='action' required>
                      <option value=''>------</option>
                      <option value='Approve'>Approve</option>
                      <option value='Reject'>Reject</option>
                    </CustomSelectFilter>
                  </div>
                </div>

                <div
                  className='row row-payments row-loans'
                  style={{
                    marginTop: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '1rem',
                    width: '100%'
                  }}
                >
                  <File files={files} setFiles={setFiles} />
                  {files.length > 0 && <SubmitButtonFilter isSubmitting={isSubmitting} />}
                </div>
              </NonFieldErrors>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Filter;