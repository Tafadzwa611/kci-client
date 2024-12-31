import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomInput,
  CustomDatePicker,
  Fetcher,
  SubmitButton,
  CustomMultiSelect,
  CustomCheckbox
} from '../../../../common';
import { useNavigate } from 'react-router-dom';

function AddBranch() {
  const initialValues = {
    name: '',
    geographical_location: '',
    branch_code: '',
    date_of_opening: '',
    is_rural: false,
    loan_products: []
  };
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const data = {...values, available_product_ids: values.loan_products.map(lp => lp.value)};
      const response = await axios.post('/usersapi/add_branch/', data, CONFIG);
      navigate({pathname: `/users/admin/managebranches/branch/${response.data.id}`});
      window.location.reload();
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
    <>
      <Fetcher urls={['/loansapi/loan_products_list/']}>
        {({data}) => (
          <div>
            <button type='button' className='btn btn-default max'>
              <Link to='/users/admin/managebranches'>Back</Link>
            </button>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {({ isSubmitting, setFieldValue, errors }) => (
                <Form>
                  <NonFieldErrors errors={errors}>
                    <div className='divider divider-info'>
                      <span>Branch Information</span>
                    </div>
                    <CustomInput label='Name' name='name' type='text' required/>
                    <CustomInput label='Geographical Location' name='geographical_location' type='text'/>
                    <CustomInput label='Branch Code' name='branch_code' type='text' maxLength='5' required/>
                    <CustomDatePicker label='Date of Opening' name='date_of_opening' setFieldValue={setFieldValue} required/>
                    <CustomMultiSelect
                      label='Loan Products'
                      setFieldValue={setFieldValue}
                      name='loan_products'
                      options={data[0].map(loanProduct => ({value: loanProduct.id, label: loanProduct.name}))}
                    />
                    <CustomCheckbox label='Is Rural' name='is_rural'/>
                    <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
                    <div style={{display:'flex', justifyContent: 'flex-end'}}> 
                      <SubmitButton isSubmitting={isSubmitting}/>
                    </div>
                  </NonFieldErrors>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </Fetcher>
    </>
  )
}

export default AddBranch;