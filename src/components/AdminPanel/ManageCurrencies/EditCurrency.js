import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import {
  Fetcher,
  NonFieldErrors,
  CustomInput,
  SubmitButton
} from '../../../common';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function EditCurrency() {
  const params = useParams();

  return (
    <Fetcher urls={[`/usersapi/get_currency/${params.currencyId}/`]}>
      {({ data }) => <EditCurrencyForm currency={data[0]} />}
    </Fetcher>
  );
}

function EditCurrencyForm({ currency }) {
  const initialValues = { fullname: currency.fullname, shortname: currency.shortname };
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.put(`/usersapi/update_currency/${currency.id}/`, values, CONFIG);
      navigate({ pathname: '/users/admin' });
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
    <div className='sf-page'>
      <div style={{ marginBottom: 12 }}>
        <button type='button' className='btn btn-default max'>
          <Link to='/users/admin'>Back</Link>
        </button>
      </div>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form autoComplete='off' className='sf-form'>
            <NonFieldErrors errors={errors}>
              <div className='sf-shell'>
                <div className='sf-shell-head'>
                  <div className='sf-shell-title'>Currency</div>
                  <div className='sf-shell-subtitle'>
                    Update the currency details for this record.
                  </div>
                </div>

                <div className='sf-shell-body'>
                  <section className='sf-section'>
                    <div className='sf-section-head'>
                      <div className='sf-section-title'>Currency information</div>
                      <div className='sf-section-hint'>
                        Edit the full name and short name, then save your changes.
                      </div>
                    </div>

                    <div className='sf-section-body sf-stack'>
                      <CustomInput label='Fullname' name='fullname' type='text' required />
                      <CustomInput label='Shortname' name='shortname' type='text' />
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

export default EditCurrency;