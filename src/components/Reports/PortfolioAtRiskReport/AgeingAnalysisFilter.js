import React from 'react';
import { Form, Formik } from 'formik';
import {
  CustomSelect,
  NonFieldErrors
} from '../../../common';
import axios from 'axios';
import { getParams } from '../../../utils/utils';
import { useBranches } from '../../../contexts/BranchesContext';

const Filter = ({setParams, setLoans, par}) => {
  const initialValues = {
    page_num: 1,
    file_format: 'html',
    currency_id: par.currency_id,
    lower_limit: par.lower_limit,
    upper_limit: par.upper_limit,
    client_type: par.client_type,
    group_type: par.group_type,
    branch_ids: par.selectedBIds,
    reason: par.reason
  };

  const {branches} = useBranches();
  const allBranchIds = branches.map(br => br.id);

  const onSubmit = async (values, actions) => {
    try {
      const params = getParams(values);
      if (values.branch_ids.includes('*')) {
        params.delete('branch_ids');
        allBranchIds.forEach(id => params.append('branch_ids', id));
      }
      setParams(params);
      if (values.file_format === 'html') {
        const response = await axios.get('/reportsapi/ageing-report/', {params: params});
        setLoans(response.data);
      }else {
        await axios.get('/reportsapi/ageing-report-export/', {params: params});
      }
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
      {({isSubmitting, errors}) => (
        <div style={{height:'80px'}}>
          <Form>
            <NonFieldErrors errors={errors}>
              <CustomSelect label='Mode' name='file_format' required>
                <option value='html'>Screen (HTML)</option>
                <option value='xlsx'>Excel</option>
                <option value='csv'>CSV</option>
                <option value='pdfa4'>PDF A4</option>
                <option value='pdfa3'>PDF A3</option>
                <option value='pdfa2'>PDF A2</option>
                <option value='pdfa1'>PDF A1</option>
              </CustomSelect>
              <SubmitButtonFilter isSubmitting={isSubmitting}/>
            </NonFieldErrors>
          </Form>
        </div>
      )}
    </Formik>
  )
}

const SubmitButtonFilter = ({isSubmitting}) => {
  if (isSubmitting) {
    return (
      <div style={{marginTop:'10px'}}>
        <label className='form-label row-label'></label>
        <span>
          <button className='btn btn-olive' type='submit' style={{pointerEvents: 'none', opacity: '0.7'}} disabled={true}>
            <i className='fa fa-spinner fa-spin'></i> Please wait..
          </button>
        </span>
      </div>
    )
  }
  return (
    <div style={{marginTop:'10px'}}>
      <label className='form-label row-label'></label>
      <span>
        <button className='btn btn-olive' type='submit'>Show Loans</button>
      </span>
    </div>
  )
}

export default Filter;

