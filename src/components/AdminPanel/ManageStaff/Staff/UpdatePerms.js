import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Fetcher, CustomMultiSelect, NonFieldErrors, SubmitButton } from '../../../../common';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';

function UpdatePerms() {
  const params = useParams();

  return (
    <Fetcher urls={[`/usersapi/user_details/${params.staffId}/`, '/usersapi/perms_list_api/']}>
      {({data}) => <UpdatePermsForm user={data[0]} allPerms={data[1]}/>}
    </Fetcher>
  )
}

const UpdatePermsForm = ({user, allPerms}) => {
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
    users__toplevelperms: 'Module Level Permissions'
  };

  const initialValues = {
    users__toplevelperms: user.perms.users__toplevelperms ? user.perms.users__toplevelperms.map(perm => ({value: perm.id, label: perm.name})) : [],
    clients__client: user.perms.clients__client ? user.perms.clients__client.map(perm => ({value: perm.id, label: perm.name})) : [],
    clients__group: user.perms.clients__group ? user.perms.clients__group.map(perm => ({value: perm.id, label: perm.name})) : [],
    loans__loan: user.perms.loans__loan ? user.perms.loans__loan.map(perm => ({value: perm.id, label: perm.name})) : [],
    reports__dataexportreport: user.perms.reports__dataexportreport ? user.perms.reports__dataexportreport.map(perm => ({value: perm.id, label: perm.name})) : [],
    expenses__expense: user.perms.expenses__expense ? user.perms.expenses__expense.map(perm => ({value: perm.id, label: perm.name})) : [],
    otherincome__otherincome: user.perms.otherincome__otherincome ? user.perms.otherincome__otherincome.map(perm => ({value: perm.id, label: perm.name})) : [],
    accounting__journal: user.perms.accounting__journal ? user.perms.accounting__journal.map(perm => ({value: perm.id, label: perm.name})) : [],
    accounting__generalledgeraccount: user.perms.accounting__generalledgeraccount ? user.perms.accounting__generalledgeraccount.map(perm => ({value: perm.id, label: perm.name})) : [],
    reports__rightssupport: user.perms.reports__rightssupport ? user.perms.reports__rightssupport.map(perm => ({value: perm.id, label: perm.name})) : [],
    admin_perms: user.perms.admin_perms ? user.perms.admin_perms.map(perm => ({value: perm.id, label: perm.name})) : [],
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
      await axios.patch(`/usersapi/update_staff_perms/${user.id}/`, {perm_ids: perm_ids}, CONFIG);
      navigate({pathname: `/users/admin/staff/staffdetails/${user.id}`});
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
  const newIndex = 0;
  const oldIndex = 9;
  const permNamesArray = Object.keys(allPerms);
  permNamesArray.splice(newIndex, 0, permNamesArray.splice(oldIndex, 1)[0]);

  return (
    <>
      <div style={{marginBottom:'20px'}}>
        <button type='button' className='btn btn-default max'>
          <Link to={`/users/admin/staff/staffdetails/${user.id}`}>Back</Link>
        </button>
      </div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, errors, setFieldValue, values}) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='divider divider-info'>
                <span>Role Information</span>
              </div>
              {permNamesArray.map(key => {
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

export default UpdatePerms;