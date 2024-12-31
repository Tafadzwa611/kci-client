import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomInputFilter,
  CustomDatePickerFilter,
  CustomSelectFilter,
  CustomMultiSelectFilter,
  SubmitButtonFilter
} from '../../../common';
import { useBranches } from '../../../contexts/BranchesContext';
import axios from 'axios';
import { removeEmptyValues, getParams } from '../../../utils/utils';

const Filter = ({setGroupsData, setGroupId, setGroupDetails, setParams, units}) => {
  const initialValues = {
    branch_ids: [],
    page_num: 1,
    search_str: '',
    min_reg_date: '',
    max_reg_date: '',
    min_grp_date: '',
    max_grp_date: '',
    status: '',
    unit_id: '',
  };
  const {branches} = useBranches();

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);
      setParams(params);
      const response = await axios.get('/clientsapi/groups/', {params: params});
      setGroupsData(response.data);
    } catch (error) {
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
      {({isSubmitting, setFieldValue, errors}) => (
        <div className='search_background'>
          <div className='row-containers' style={{border:'none'}}>
            <Form>
              <NonFieldErrors errors={errors}>
                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                  <div style={{width:'49%', display:'flex', justifyContent:'space-between'}}>
                    <div className='row-payments-container' style={{width:'49%'}}>
                      <CustomDatePickerFilter label='Min Reg Date' name='min_reg_date' setFieldValue={setFieldValue}/>
                    </div>
                    <div className='row-payments-container' style={{width:'49%'}}>
                      <CustomDatePickerFilter label='Max Reg Date' name='max_reg_date' setFieldValue={setFieldValue}/>
                    </div>
                  </div>
                  <div style={{width:'49%', display:'flex', justifyContent:'space-between'}}>
                    <div className='row-payments-container' style={{width:'49%'}}>
                      <CustomDatePickerFilter label='Min Group Date' name='min_grp_date' setFieldValue={setFieldValue}/>
                    </div>
                    <div className='row-payments-container' style={{width:'49%'}}>
                      <CustomDatePickerFilter label='Min Group Date' name='max_grp_date' setFieldValue={setFieldValue}/>
                    </div>
                  </div>
                </div>
                <div className='row row-payments' style={{marginTop:'1rem'}}>
                  <div className='row-payments-container' style={{width:'49%'}}>
                    <CustomInputFilter label='Group Name' name='search_str' type='text'/>
                  </div>
                  <div className='row-payments-container' style={{width:'49%'}}>
                    <CustomSelectFilter label='Status' name='status'>
                      <option value=''></option>
                      <option value='Pending Approval'>Pending Approval</option>
                      <option value='Inactive'>Inactive</option>
                      <option value='Active'>Active</option>
                      <option value='Rejected'>Rejected</option>
                      <option value='Blacklisted'>Blacklisted</option>
                      <option value='Left'>Left</option>
                    </CustomSelectFilter>
                  </div>
                </div>
                <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
                  <div style={{width:'80%'}}>
                    <CustomMultiSelectFilter
                      label='Branches'
                      name='branch_ids'
                      options={branches.map(br => ({label: br.name, value:br.id}))}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <div className='row-payments-container' style={{width:'10%'}}>
                    <CustomSelectFilter label='Unit' name='unit_id'>
                      <option value=''>------</option>
                      {units.map(ut => (<option key={ut.id} value={ut.id}>{ut.name}</option>))}
                    </CustomSelectFilter>
                  </div>
                  <SubmitButtonFilter isSubmitting={isSubmitting}/>
                </div>
              </NonFieldErrors>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Filter;

