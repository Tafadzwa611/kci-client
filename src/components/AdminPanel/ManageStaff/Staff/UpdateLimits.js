import React from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Form, Formik, FieldArray } from 'formik';
import {
  ButtonDefault,
  ButtonSuccess,
  CustomSelect,
  CustomInput,
  SubmitButton,
  NonFieldErrors
} from '../../../../common';
import { useCurrencies } from '../../../../contexts/CurrenciesContext';
import Cookies from 'js-cookie';

function UpdateLimits() {
  const params = useParams();
  const navigate = useNavigate();
  const { currencies } = useCurrencies();
  const [limits, setLimits] = React.useState(null);
  const [err, setErr] = React.useState(null);

  React.useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get(`/usersapi/limits/${params.staffId}/`);
        setLimits(response.data);
      } catch (err) {
        setErr(JSON.stringify(err.response.data));
      }
    }
    fetch();
  }, []);

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };
      await axios.put(`/usersapi/update_limits/${params.staffId}/`, values, CONFIG);
      navigate({ pathname: `/users/admin/staff/staffdetails/${params.staffId}` });
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

  if (err) {
    return <div>{err}</div>;
  }

  if (limits === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className='sf-page'>
      <div style={{ marginBottom: 12 }}>
        <button type='button' className='btn btn-default max'>
          <Link to={`/users/admin/staff/staffdetails/${params.staffId}`}>Back</Link>
        </button>
      </div>

      <Formik initialValues={{ limits }} onSubmit={onSubmit}>
        {({ values, isSubmitting, errors }) => (
          <Form className='sf-form'>
            <NonFieldErrors errors={errors}>
              <div className='sf-shell'>
                <div className='sf-shell-head'>
                  <div className='sf-shell-title'>User Limits</div>
                  <div className='sf-shell-subtitle'>
                    Set and update currency-based limits for this staff member.
                  </div>
                </div>

                <div className='sf-shell-body'>
                  <section className='sf-section'>
                    <div className='sf-section-head'>
                      <div className='sf-section-title'>Limits information</div>
                      <div className='sf-section-hint'>
                        Add one or more limits by selecting a currency and entering the allowed amount.
                      </div>
                    </div>

                    <div className='sf-section-body'>
                      <FieldArray name='limits'>
                        {({ push, remove }) => (
                          <div className='sf-stack'>
                            {values.limits.map((limit, index) => (
                              <div key={index} className='sf-section' style={{ marginBottom: '1rem' }}>
                                <div className='sf-section-body sf-stack'>
                                  <CustomSelect
                                    label='Currency'
                                    name={`limits[${index}].currency_id`}
                                    required
                                  >
                                    <option value=''>------</option>
                                    {currencies.map(currency => (
                                      <option key={currency.id} value={currency.id}>
                                        {currency.fullname}
                                      </option>
                                    ))}
                                  </CustomSelect>

                                  <CustomInput
                                    label='Amount'
                                    name={`limits[${index}].amount`}
                                    type='number'
                                    required
                                  />

                                  <div>
                                    <ButtonDefault
                                      value='Remove Limit'
                                      handler={evt => {
                                        evt.preventDefault();
                                        remove(index);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}

                            <div style={{ marginTop: '10px' }}>
                              <ButtonSuccess
                                value='Add Limit'
                                handler={() => push({ currency_id: '', amount: '' })}
                              />
                            </div>
                          </div>
                        )}
                      </FieldArray>
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

export default UpdateLimits;