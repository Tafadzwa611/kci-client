import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import {
  CustomInput,
  CustomSelect,
  CustomCheckbox,
  Fetcher,
  NonFieldErrors,
  CustomMultiSelect,
  SubmitButton
} from '../../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function EditStaff() {
  const params = useParams();

  return (
    <Fetcher urls={[`/usersapi/user_details/${params.staffId}/`, '/usersapi/staffroles/', '/usersapi/branch-list/', '/usersapi/notification_types/']}>
      {({data}) => <EditStaffForm staff={data[0]} roles={data[1]} branches={data[2]} notificationTypes={data[3]}/>}
    </Fetcher>
  )
}

const EditStaffForm = ({staff, roles, branches, notificationTypes}) => {
  const navigate = useNavigate();

  const initialValues = {
    first_name: staff.first_name,
    last_name: staff.last_name,
    email: staff.email,
    branch_id: staff.branch_id,
    role_id: staff.role_id,
    is_active: staff.is_active,
    is_loan_officer: staff.is_loan_officer,
    access_branches: staff.branch_access.map(branch => ({value: branch.id, label: branch.name})),
    notification_types: staff.branch_access.map(notification => ({value: notification, label: notification}))
  };

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const data = {
        ...values,
        access_branch_ids: values.access_branches.map(branch => branch.value),
        notification_types: values.notification_types.map(notification => notification.value)
      };
      await axios.put(`/usersapi/update_user/${staff.id}/`, data, CONFIG);
      navigate({pathname: `/users/admin/staff/staffdetails/${staff.id}`});
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
    <div style={{marginBottom:'20px'}}>
      <button type='button' className='btn btn-default max'>
        <Link to={`/users/admin/staff/staffdetails/${staff.id}`}>Back</Link>
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
              <CustomSelect label='Role' name='role_id'>
                <option value=''>------</option>
                {roles.map(role => <option key={role.id} value={role.id}>{role.role}</option>)}
              </CustomSelect>
              <CustomSelect label='Branch' name='branch_id'>
                <option value=''>------</option>
                {branches.map(branch => <option key={branch.id} value={branch.id}>{branch.name}</option>)}
              </CustomSelect>
              <CustomMultiSelect
                label='Branch Access'
                initVals={staff.branch_access.map(branch => ({value: branch.id, label: branch.name}))}
                setFieldValue={setFieldValue}
                name='access_branches'
                options={branches.map(branch => ({value: branch.id, label: branch.name}))}
              />
              <CustomMultiSelect
                label='Notifications'
                initVals={staff.notification_types.map(notification => ({value: notification, label: notification}))}
                setFieldValue={setFieldValue}
                name='notification_types'
                options={notificationTypes.map(notification => ({value: notification, label: notification}))}
              />
              <CustomCheckbox label='Is Active' name='is_active'/>
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
  )
}

export default EditStaff;