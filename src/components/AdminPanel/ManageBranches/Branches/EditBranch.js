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
  CustomMultiSelect
} from '../../../../common';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditBranch() {
  const params = useParams();

  return (
    <Fetcher urls={['/loansapi/loan_products_list/', `/usersapi/get_branch/${params.branchId}/`]}>
      {({data}) => <EditBranchForm loanProducts={data[0]} branch={data[1]}/>}
    </Fetcher>
  )
}

function EditBranchForm({loanProducts, branch}) {
  const initialValues = {
    name: branch.name,
    geographical_location: branch.geographical_location || '',
    branch_code: branch.branch_code,
    date_of_opening: branch.date_of_opening,
    loan_products: branch.products.map(lp => ({value: lp.id, label: lp.name}))
  };

  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const data = {...values, available_product_ids: values.loan_products.map(lp => lp.value)};
      await axios.put(`/usersapi/update_branch/${branch.id}/`, data, CONFIG);
      navigate({pathname: `/users/admin/managebranches/branch/${branch.id}`});
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
      <div style={{marginBottom:'20px'}}>
        <button type='button' className='btn btn-default max'>
          <Link to={`/users/admin/managebranches/branch/${branch.id}`}>Back</Link>
        </button>
      </div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, setFieldValue, errors, values }) => (
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
                initVals={values.loan_products}
                name='loan_products'
                options={loanProducts.map(loanProduct => ({value: loanProduct.id, label: loanProduct.name}))}
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

export default EditBranch;