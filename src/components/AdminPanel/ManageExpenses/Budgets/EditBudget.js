import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import {
  CustomInput,
  SubmitButton,
  NonFieldErrors
} from '../../../../common';
import Cookies from 'js-cookie';

function EditBudget() {
  const params = useParams();
  const navigate = useNavigate();
  const [budget, setBudget] = React.useState(null);

  useEffect(() => {
    document.title = 'Edit Budget';
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`/expensesapi/get_budget/${params.bdId}`);
      setBudget(response.data);
    };
    fetch();
  }, [params.bdId]);

  if (!budget) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };

      await axios.patch(
        `/expensesapi/update_budget/${params.bdId}/`,
        values,
        CONFIG
      );

      navigate(`/users/admin/manageexps/budget-details/${params.bdId}`);
    } catch (error) {
      console.log(error);

      if (error.message === 'Network Error') {
        actions.setErrors({ responseStatus: 'Network Error' });
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({
          responseStatus: error.response.status,
          ...error.response.data
        });
      } else {
        actions.setErrors({ responseStatus: error.response.status });
      }
    }
  };

  return (
    <div className='sf-page'>
      <div style={{ marginBottom: 12 }}>
        <button type='button' className='btn btn-default max'>
          <Link to={`/users/admin/manageexps/budget-details/${params.bdId}`}>Back</Link>
        </button>
      </div>

      <Formik initialValues={{ limit: budget.limit }} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form autoComplete='off' className='sf-form'>
            <NonFieldErrors errors={errors}>
              <div className='sf-shell'>
                <div className='sf-shell-head'>
                  <div className='sf-shell-title'>Budget</div>
                  <div className='sf-shell-subtitle'>
                    Update the budget limit for this budget record.
                  </div>
                </div>

                <div className='sf-shell-body'>
                  <section className='sf-section'>
                    <div className='sf-section-head'>
                      <div className='sf-section-title'>Budget information</div>
                      <div className='sf-section-hint'>
                        Adjust the limit and save your changes.
                      </div>
                    </div>

                    <div className='sf-section-body sf-stack'>
                      <CustomInput
                        label='Limit'
                        name='limit'
                        type='number'
                        required
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

export default EditBudget;