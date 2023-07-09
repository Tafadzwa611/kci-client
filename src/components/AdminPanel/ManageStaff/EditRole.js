import React from 'react';
import { useParams } from 'react-router-dom';
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

function EditRole() {
  const params = useParams();

  return (
    <Fetcher urls={[`/usersapi/get_staff_role/${params.roleId}/`, '/usersapi/perms_list_api/']}>
      {({data}) => <EditRoleForm role={data[0]} allPerms={data[1]}/>}
    </Fetcher>
  )
}

const EditRoleForm = ({role, allPerms}) => {
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
    role: role.name,
    clients__client: role.perms.clients__client ? role.perms.clients__client.map(perm => ({value: perm.id, label: perm.name})) : [],
    clients__group: role.perms.clients__group ? role.perms.clients__group.map(perm => ({value: perm.id, label: perm.name})) : [],
    loans__loan: role.perms.loans__loan ? role.perms.loans__loan.map(perm => ({value: perm.id, label: perm.name})) : [],
    reports__dataexportreport: role.perms.reports__dataexportreport ? role.perms.reports__dataexportreport.map(perm => ({value: perm.id, label: perm.name})) : [],
    expenses__expense: role.perms.expenses__expense ? role.perms.expenses__expense.map(perm => ({value: perm.id, label: perm.name})) : [],
    otherincome__otherincome: role.perms.otherincome__otherincome ? role.perms.otherincome__otherincome.map(perm => ({value: perm.id, label: perm.name})) : [],
    accounting__journal: role.perms.accounting__journal ? role.perms.accounting__journal.map(perm => ({value: perm.id, label: perm.name})) : [],
    accounting__generalledgeraccount: role.perms.accounting__generalledgeraccount ? role.perms.accounting__generalledgeraccount.map(perm => ({value: perm.id, label: perm.name})) : [],
    reports__rightssupport: role.perms.reports__rightssupport ? role.perms.reports__rightssupport.map(perm => ({value: perm.id, label: perm.name})) : [],
    admin_perms: role.perms.admin_perms ? role.perms.admin_perms.map(perm => ({value: perm.id, label: perm.name})) : [],
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
      await axios.put(`/usersapi/update_staff_role/${role.id}/`, {name: values.role, perm_ids: perm_ids}, CONFIG);
      navigate({pathname: `/users/admin/staff/roledetails/${role.id}`});
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
      {({ isSubmitting, errors, setFieldValue, values}) => (
        <Form>
          <NonFieldErrors errors={errors}>
            <div className='divider divider-info'>
              <span>Role Information</span>
            </div>
            <CustomInput label='Role' name='role' type='text' required/>
            {Object.keys(allPerms).map(key => {
              return (
                <CustomMultiSelect
                  key={key}
                  label={permNames[key]}
                  initVals={values[key]}
                  setFieldValue={setFieldValue}
                  name={key}
                  options={allPerms[key].map(perm => ({value: perm.id, label: perm.name}))}
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

export default EditRole;