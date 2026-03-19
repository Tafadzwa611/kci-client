import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

function AddStaff() {
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };

      const data = {
        ...values,
        access_branch_ids: values.access_branches.map(branch => branch.value),
        user_access_units_ids: values.access_units.map(unit => unit.value),
        notification_types: values.notification_types.map(notification => notification.value)
      };

      console.log(data);
      const response = await axios.post('/usersapi/add_staff/', data, CONFIG);
      navigate({ pathname: `/users/admin/staff/staffdetails/${response.data.id}` });
    } catch (error) {
      console.log(error);
      if (error.message === 'Network Error') {
        actions.setErrors({ responseStatus: 'Network Error' });
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else {
        actions.setErrors({ responseStatus: error.response.status });
      }
    }
  };

  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    branch_id: '',
    role_id: '',
    access_branches: [],
    access_units: [],
    notification_types: [],
    is_loan_officer: false
  };

  return (
    <Fetcher
      urls={[
        '/usersapi/staffroles/',
        '/usersapi/branch-list/',
        '/usersapi/notification_types/',
        '/usersapi/list_units/'
      ]}
    >
      {({ data }) => (
        <div className='sf-page'>
          <div style={{ marginBottom: 12 }}>
            <button type='button' className='btn btn-default max'>
              <Link to='/users/admin/staff'>Back</Link>
            </button>
          </div>

          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ isSubmitting, errors, setFieldValue }) => (
              <Form className='sf-form'>
                <NonFieldErrors errors={errors}>
                  <div className='sf-shell'>
                    <div className='sf-shell-head'>
                      <div className='sf-shell-title'>Staff</div>
                      <div className='sf-shell-subtitle'>
                        Add a staff member, assign their role and branch, then configure access permissions and notifications.
                      </div>
                    </div>

                    <div className='sf-shell-body'>
                      <section className='sf-section'>
                        <div className='sf-section-head'>
                          <div className='sf-section-title'>Staff information</div>
                          <div className='sf-section-hint'>
                            Enter the staff member’s basic details and define their access settings.
                          </div>
                        </div>

                        <div className='sf-section-body sf-stack'>
                          <CustomInput label='First Name' name='first_name' type='text' required />
                          <CustomInput label='Last Name' name='last_name' type='text' required />
                          <CustomInput label='Email' name='email' type='text' required />

                          <CustomSelect label='Role' name='role_id' required>
                            <option value=''>------</option>
                            {data[0].map(role => (
                              <option key={role.id} value={role.id}>
                                {role.role}
                              </option>
                            ))}
                          </CustomSelect>

                          <CustomSelect label='Branch' name='branch_id' required>
                            <option value=''>------</option>
                            {data[1].map(branch => (
                              <option key={branch.id} value={branch.id}>
                                {branch.name}
                              </option>
                            ))}
                          </CustomSelect>

                          <CustomMultiSelect
                            label='Branch Access'
                            setFieldValue={setFieldValue}
                            name='access_branches'
                            options={data[1].map(branch => ({
                              value: branch.id,
                              label: branch.name
                            }))}
                          />

                          <CustomMultiSelect
                            label='Notifications'
                            setFieldValue={setFieldValue}
                            name='notification_types'
                            options={data[2].map(notification => ({
                              value: notification,
                              label: notification
                            }))}
                          />

                          <CustomMultiSelect
                            label='Unit Access'
                            setFieldValue={setFieldValue}
                            name='access_units'
                            options={data[3].map(unit => ({
                              value: unit.id,
                              label: unit.name
                            }))}
                          />

                          <CustomCheckbox label='Is Loan Officer' name='is_loan_officer' />
                        </div>
                      </section>
                    </div>

                    <div className='sf-shell-footer'>
                      <SubmitButton isSubmitting={isSubmitting} />
                    </div>
                  </div>
                </NonFieldErrors>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </Fetcher>
  );
}

export default AddStaff;