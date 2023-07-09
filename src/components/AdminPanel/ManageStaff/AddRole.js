import React from 'react';
import {
  NonFieldErrors,
  CustomInput,
  SubmitButton,
  Fetcher,
  CustomMultiSelect
} from '../../../common';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function AddRole() {
  return (
    <Fetcher urls={['/usersapi/perms_list_api/']}>
      {({data}) => <AddRoleForm perms={data[0]} />}
    </Fetcher>
  )
}

function AddRoleForm({perms}) {
  const navigate = useNavigate();

  const permNames = {
    clients__client: 'Client Permissions',
    clients__group: 'Group Permissions',
    loans__loan: 'Loan Permissions',
    reports__dataexportreport: 'Data Export Permissions',
    expenses__expense: 'Expense Permissions',
    otherincome__otherincome: 'Other Income Permissions',
    accounting__journal: 'Journal Permissions',
    accounting__generalledgeraccount: 'Ledger Accounts Permissions',
    reports__rightssupport: 'Reports Permissions',
    admin_perms: 'Admin Permissions',
  };

  const initialValues = {
    role: '',
    clients__client: [],
    clients__group: [],
    loans__loan: [],
    reports__dataexportreport: [],
    expenses__expense: [],
    otherincome__otherincome: [],
    accounting__journal: [],
    accounting__generalledgeraccount: [],
    reports__rightssupport: [],
    admin_perms: [],
  };

  const onSubmit = async (values, actions) => {
    const perm_ids = [];
    Object.keys(values).map(key => {
      if (Array.isArray(values[key])) {
        values[key].forEach(perm => {
          perm_ids.push(perm.value);
        })
      }
    });
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post('/usersapi/add_staff_role/', {name: values.role, perm_ids: perm_ids}, CONFIG);
      console.log(response.data);
      navigate({pathname: `/users/admin/staff/roledetails/${response.data.id}`});
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
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting, errors, setFieldValue}) => (
        <Form>
          <NonFieldErrors errors={errors}>
            <div className='divider divider-info'>
              <span>Role Information</span>
            </div>
            <CustomInput label='Role' name='role' type='text' required/>
            {Object.keys(perms).map(key => {
              return (
                <CustomMultiSelect
                  key={key}
                  label={permNames[key]}
                  setFieldValue={setFieldValue}
                  name={key}
                  options={perms[key].map(perm => ({value: perm.id, label: perm.name}))}
                />
              )
            })}
            <div className='divider divider-info' style={{padding: '1.25rem'}}></div>
            <div style={{display:'flex', justifyContent: 'flex-end'}}> 
              <SubmitButton isSubmitting={isSubmitting}/>
            </div>
          </NonFieldErrors>
        </Form>
      )}
    </Formik>
  )
}

export default AddRole;