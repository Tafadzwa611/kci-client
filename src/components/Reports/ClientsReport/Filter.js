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
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { useBranches } from '../../../contexts/BranchesContext';
import axios from 'axios';
import { removeEmptyValues, getParams } from '../../../utils/utils';

const Filter = ({setClientsReportData, setParams, units}) => {
  const initialValues = {branch_ids: [], page_num: 1, min_date: '', max_date: '', client_str: '', order: '-id', mode: 'html', unit_id: ''};
  const {currencies} = useCurrencies();
  const {branches} = useBranches();

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      if (values.mode === 'html') {
        const params = getParams(data);
        setParams(params);
        const response = await axios.get('/reportsapi/clients-report/', {params: params});
        setClientsReportData(response.data);
      }else {
        data.file_format = values.mode;
        await axios.get('/reportsapi/clients_report_export/', {params: getParams(data)});
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
      {({isSubmitting, setFieldValue, errors}) => (
        <div className='search_background'>
          <div className='row-containers' style={{border:'none'}}>
            <Form>
              <NonFieldErrors errors={errors}>
                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                  <div className='row-payments-container' style={{width:'16%'}}>
                    <CustomDatePickerFilter label='Min Client Reg Date' name='min_date' setFieldValue={setFieldValue}/>
                  </div>
                  <div className='row-payments-container' style={{width:'16%'}}>
                    <CustomDatePickerFilter label='Max Client Reg Date' name='max_date' setFieldValue={setFieldValue}/>
                  </div>
                  <div className='row-payments-container' style={{width:'16%'}}>
                    <CustomDatePickerFilter label='Min Loan DB Date' name='min_db_date' setFieldValue={setFieldValue}/>
                  </div>
                  <div className='row-payments-container' style={{width:'16%'}}>
                    <CustomDatePickerFilter label='Max Loan DB Date' name='max_db_date' setFieldValue={setFieldValue}/>
                  </div>
                  <div className='row-payments-container' style={{width:'16%'}}>
                    <CustomSelectFilter label='Unit' name='unit_id'>
                      <option value=''>------</option>
                      {units.map(ut => <option key={ut.id} value={ut.id}>{ut.name}</option>)}
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'16%'}}>
                    <CustomInputFilter label='Search Client' name='client_str' type='text'/>
                  </div>
                </div>
                <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
                  <div style={{width:'63%'}}>
                    <CustomMultiSelectFilter
                      label='Branches'
                      name='branch_ids'
                      options={branches.map(br => ({label: br.name, value:br.id}))}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <div className='row-payments-container' style={{width:'10%'}}>
                    <CustomSelectFilter label='Currency' name='currency_id' required>
                      <option value=''>------</option>
                      {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'10%'}}>
                    <CustomSelectFilter label='Order' name='order' required>
                      <option value={'-id'}>Show newest first</option>
                      <option value={'id'}>Show oldest first</option>
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'10%'}}>
                    <CustomSelectFilter label='Mode' name='mode' required>
                      <option value='html'>Screen (HTML)</option>
                      <option value='xlsx'>Excel</option>
                      <option value='csv'>CSV</option>
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

