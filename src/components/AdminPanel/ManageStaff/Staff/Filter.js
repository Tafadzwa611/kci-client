import React from 'react';
import { Form, Formik } from 'formik';
import { NonFieldErrors } from '../../../../common';
import {
CustomInputFilter,
CustomSelectFilter,
SubmitButtonFilter
} from '../../../../common';
import { useBranches } from '../../../../contexts/BranchesContext';
import axios from 'axios';
import { removeEmptyValues, getParams } from '../../../../utils/utils';

const Filter = ({roles, setUsers, setParams}) => {
    const {branches} = useBranches();

    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        staff_role_id: '',
        branch_id: '',
        status: 'active',
        page_num: 1,
    };

    const onSubmit = async (values, actions) => {
    try {
        const data = removeEmptyValues(values);
        const params = getParams(data);
        setParams(params);
        const response = await axios.get('/usersapi/staff_admin/', {params: params});
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
                        <div className='row-containers sf-shellwrap'>
                            <Form>
                                <NonFieldErrors errors={errors}>
                                    <div className='row row-payments row-loans sf-card'>
                                        <div className='sf-row sf-row-4'>
                                            <div className='row-payments-container sf-w-24'>
                                                <CustomSelectFilter label='Branch' name='branch_id'>
                                                    <option value=''>------</option>
                                                    {branches.map(branch => (
                                                        <option key={branch.id} value={branch.id}>
                                                        {branch.name}
                                                        </option>
                                                    ))}
                                                </CustomSelectFilter>
                                            </div>

                                            <div className='row-payments-container sf-w-24'>
                                                <CustomInputFilter label='First Name' name='first_name'/>
                                            </div>

                                            <div className='row-payments-container sf-w-24'>
                                                <CustomInputFilter label='Last Name' name='last_name'/>
                                            </div>

                                            <div className='row-payments-container sf-w-24'>
                                            <   CustomInputFilter label='Email' name='email'/>
                                            </div>
                                        </div>

                                        <div className='sf-row sf-row-2 sf-mt-3'>
                                            <div className='row-payments-container sf-w-49'>
                                                <CustomSelectFilter label='Role' name='staff_role_id'>
                                                    <option value=''>------</option>
                                                        {roles.map(role => (
                                                            <option key={role.id} value={role.id}>
                                                            {role.role}
                                                        </option>
                                                    ))}
                                                </CustomSelectFilter>
                                            </div>

                                            <div className='row-payments-container sf-w-49'>
                                                <CustomSelectFilter label='Status' name='status'>
                                                    <option value='all'>All</option>
                                                    <option value='active'>Active</option>
                                                    <option value='inactive'>Inactive</option>
                                                </CustomSelectFilter>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='sf-submit'>
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

export default Filter;