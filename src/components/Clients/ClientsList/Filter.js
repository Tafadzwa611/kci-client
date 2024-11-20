import React from 'react';
import { useBranches } from '../../../contexts/BranchesContext';
import { Form, Formik } from 'formik';
import {
  CustomMultiSelectFilter,
  CustomDatePickerFilter,
  CustomSelectFilter,
  SubmitButtonFilter,
  CustomInputFilter,
  NonFieldErrors
} from '../../../common';
import { removeEmptyValues, getParams } from '../../../utils/utils';
import axios from 'axios';

const Filter = ({ setClientsData, clientTypes, setParams, units }) => {
  const initialValues = {
    page_num: 1,
    page_size: 10,
    branch_ids: [],
    search_str: '',
    min_reg_date: '',
    max_reg_date: '',
    min_dob: '',
    max_dob: '',
    client_type_id: '',
    unit_id: '',
    gender: '',
    status: '',
  };
  const {branches} = useBranches();

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);
      setParams(params);
      const response = await axios.get('/clientsapi/clients/', {params: params});
      setClientsData(response.data);
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
      {({isSubmitting, setFieldValue, errors}) => (
        <div className='search_background'>
          <div className='row-containers' style={{border:'none'}}>
            <Form>
              <NonFieldErrors errors={errors}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomDatePickerFilter label='Min Reg Date' name='min_reg_date' setFieldValue={setFieldValue}/>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomDatePickerFilter label='Max Reg Date' name='max_reg_date' setFieldValue={setFieldValue}/>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomDatePickerFilter label='Min Date Of Birth' name='min_dob' setFieldValue={setFieldValue}/>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomDatePickerFilter label='Max Date Of Birth' name='max_dob' setFieldValue={setFieldValue}/>
                  </div>
                </div>
                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomSelectFilter label='Client Type' name='client_type_id'>
                      <option value=''>------</option>
                      {clientTypes.map(ct => (<option key={ct.id} value={ct.id}>{ct.name}</option>))}
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomInputFilter label='Search Client' name='search_str'/>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomSelectFilter label='Gender' name='gender'>
                      <option value=''>------</option>
                      <option value='MALE'>Male</option>
                      <option value='FEMALE'>Female</option>
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomSelectFilter label='Status' name='status'>
                      <option value=''>------</option>
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
                  <div style={{width:'70%'}}>
                    <CustomMultiSelectFilter
                      label='Branches'
                      name='branch_ids'
                      setFieldValue={setFieldValue}
                      options={branches.map(br => ({value: br.id, label: br.name}))}
                    />
                  </div>
                  <div className='row-payments-container' style={{width:'10%'}}>
                    <CustomSelectFilter label='Page Size' name='page_size' required>
                      <option value='10'>10</option>
                      <option value='25'>25</option>
                      <option value='50'>50</option>
                      <option value='75'>75</option>
                      <option value='100'>100</option>
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'10%'}}>
                    <CustomSelectFilter label='Units' name='unit_id'>
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