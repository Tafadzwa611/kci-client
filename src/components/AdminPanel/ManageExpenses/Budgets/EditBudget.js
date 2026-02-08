import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
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

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`/expensesapi/get_budget/${params.bdId}`);
      setBudget(response.data);
    }
    fetch();
  }, []);

  if (!budget) {
    return <div>Loading...</div>
  }

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          'Accept': 'application/json',
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
        actions.setErrors({responseStatus: 'Network Error'});
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({responseStatus: error.response.status, ...error.response.data});
      } else {
        actions.setErrors({responseStatus: error.response.status});
      }
    }
  }

  return (
    <div>
      <Formik initialValues={{limit: budget.limit}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <div className='divider divider-info'>
              <span>Budget Information</span>
            </div>
            <CustomInput label='Limit' name='limit' type='number' required/>
            <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
            <div style={{display:'flex', justifyContent: 'flex-end'}}> 
              <SubmitButton isSubmitting={isSubmitting}/>
            </div>
            <NonFieldErrors errors={errors}/>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EditBudget;
