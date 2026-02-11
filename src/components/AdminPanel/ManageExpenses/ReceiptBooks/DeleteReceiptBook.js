import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Formik } from 'formik';
import {
  SubmitButton,
  NonFieldErrors
} from '../../../../common';
import Cookies from 'js-cookie';


function DeleteBudget() {
  const params = useParams();
  const navigate = useNavigate();
  const [rb, setRb] = React.useState(null);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`/loansapi/receipt_book/${params.rbId}`);
      setRb(response.data);
    }
    fetch();
  }, []);

  if (!rb) {
    return <div>Loading...</div>
  }

  const onSubmit = async (_, actions) => {
    try {
      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      await axios.delete(
        `/loansapi/delete_receipt_book/${params.rbId}/`,
        CONFIG
      );
      navigate('/users/admin/manageexps/receipt-books');
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
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <h4>
              Are you sure you want to delete this receipt book? {rb.name}
            </h4>
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

export default DeleteBudget;
