import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  CustomInput,
  CustomSelect,
  Fetcher,
  NonFieldErrors,
  CustomMultiSelect,
  CustomCheckbox,
  SubmitButton
} from '../../../../common';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

// const AddStaff= () => {
//   return (
//     <Fetcher urls={['/usersapi/staffroles/', '/usersapi/branch-list/']}>
//       {({data}) => <AddStaffForm roles={data[0]} branches={data[1]}/>}
//     </Fetcher>
//   )
// }

function AddStaff({roles, branches}) {
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const data = {
        ...values,
        access_branch_ids: values.access_branches.map(branch => branch.value),
        notification_types: values.notification_types.map(notification => notification.value)
      };
      console.log(data);
      const response = await axios.post('/usersapi/add_staff/', data, CONFIG);
      navigate({pathname: `/users/admin/staff/staffdetails/${response.data.id}`});
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

  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    branch_id: '',
    role_id: '',
    access_branches: [],
    notification_types: [],
    is_loan_officer: false
  };

  return (
    <Fetcher urls={['/usersapi/staffroles/', '/usersapi/branch-list/', '/usersapi/notification_types/']}>
      {({data}) => (
        <div>
          <button type='button' className='btn btn-default max'>
            <Link to='/users/admin/staff'>Back</Link>
          </button>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ isSubmitting, errors, setFieldValue}) => (
              <Form>
                <NonFieldErrors errors={errors}>
                  <div className='divider divider-info'>
                    <span>Staff Information</span>
                  </div>
                  <CustomInput label='First Name' name='first_name' type='text' required/>
                  <CustomInput label='Last Name' name='last_name' type='text' required/>
                  <CustomInput label='Email' name='email' type='text' required/>
                  <CustomSelect label='Role' name='role_id' required>
                    <option value=''>------</option>
                    {data[0].map(role => <option key={role.id} value={role.id}>{role.role}</option>)}
                  </CustomSelect>
                  <CustomSelect label='Branch' name='branch_id' required>
                    <option value=''>------</option>
                    {data[1].map(branch => <option key={branch.id} value={branch.id}>{branch.name}</option>)}
                  </CustomSelect>
                  <CustomMultiSelect
                    label='Branch Access'
                    setFieldValue={setFieldValue}
                    name='access_branches'
                    options={data[1].map(branch => ({value: branch.id, label: branch.name}))}
                  />
                  <CustomMultiSelect
                    label='Notifications'
                    setFieldValue={setFieldValue}
                    name='notification_types'
                    options={data[2].map(notification => ({value: notification, label: notification}))}
                  />
                  <CustomCheckbox label='Is Loan Officer' name='is_loan_officer'/>
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
  )
}

export default AddStaff;