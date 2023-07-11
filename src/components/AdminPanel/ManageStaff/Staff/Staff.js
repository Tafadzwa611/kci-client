import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {
  Fetcher,
  NonFieldErrors,
  CustomSelectFilter,
  CustomInputFilter,
  SubmitButtonFilter
} from '../../../../common';
import { useBranches } from '../../../../contexts/BranchesContext';
import { Form, Formik } from 'formik';
import { removeEmptyValues, getParams } from '../../../../utils/utils';
import axios from 'axios';

const Staff = () => {
  const [users, setUsers] = useState([]);

  return (
    <>
      <div style={{margin:'20px 0'}}>
        <button type='button' className='btn btn-success'>
          <Link to='/users/admin/staff/addstaff'>Add Staff</Link>
        </button>
      </div>
      <Fetcher urls={['/usersapi/staffroles/']}>
        {({data}) => (
          <>
            <Filter roles={data[0]} setUsers={setUsers} />
            <div style={{paddingTop: '2rem'}}></div>
            <div className='table-responsive font-12'>
              <table className='table table-hover'>
                <tbody>
                  <tr className='journal-details header'>
                    <th>Full Name</th>
                    <th>Contact Info</th>
                    <th>Staff Role</th>
                    <th>Branch</th>
                  </tr>  
                  {users.map((user) => (
                    <tr className='table-row' key={user.id}>
                      <td>
                        <Link to={`/users/admin/staff/staffdetails/${user.id}`}>{user.first_name} {user.last_name}</Link>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.staff_role__role}</td>
                      <td>{user.branch__name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Fetcher>
    </>
  )
}

function Filter({roles, setUsers}) {
  const {branches} = useBranches();

  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    staff_role_id: '',
    branch_id: '',
  };

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);
      const response = await axios.get('/usersapi/staff/', {params: params});
      setUsers(response.data);
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
      {({isSubmitting, errors}) => (
        <div className='search_background'>
          <div className='row-containers' style={{border:'none'}}>
            <Form>
              <NonFieldErrors errors={errors}>
                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                  <div className='row-payments-container' style={{width:'20%'}}>
                    <CustomSelectFilter label='Branch' name='branch_id'>
                      <option value=''>------</option>
                      {branches.map(branch => <option key={branch.id} value={branch.id}>{branch.name}</option>)}
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'20%'}}>
                    <CustomInputFilter label='First Name' name='first_name'/>
                  </div>
                  <div className='row-payments-container' style={{width:'20%'}}>
                    <CustomInputFilter label='Last Name' name='last_name'/>
                  </div>
                  <div className='row-payments-container' style={{width:'20%'}}>
                    <CustomInputFilter label='Email' name='email'/>
                  </div>
                  <div className='row-payments-container' style={{width:'20%'}}>
                    <CustomSelectFilter label='Role' name='staff_role_id'>
                      <option value=''>------</option>
                      {roles.map(role => <option key={role.id} value={role.id}>{role.role}</option>)}
                    </CustomSelectFilter>
                  </div>
                </div>
                <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
                  <SubmitButtonFilter isSubmitting={isSubmitting}/>
                </div>
              </NonFieldErrors>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default Staff;