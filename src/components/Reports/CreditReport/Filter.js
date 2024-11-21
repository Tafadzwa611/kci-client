import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomSelectFilter,
  CustomMultiSelectFilter,
  CustomDatePickerFilter,
  SubmitButtonFilter
} from '../../../common';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { useBranches } from '../../../contexts/BranchesContext';
import axios from 'axios';
import { removeEmptyValues, getParams } from '../../../utils/utils';

const Filter = ({setReport, setParams, units}) => {
  const initialValues = {
    branch_ids: [],
    page_num: 1,
    currency_id: '',
    file_format: 'html',
    order: '-id',
    status: 'running',
    page_size: '500',
    min_db_date: '',
    max_db_date: '',
    unit_id: ''
  };
  const {currencies} = useCurrencies();
  const {branches} = useBranches();

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      if (values.file_format === 'html') {
        const params = getParams(data);
        setParams(params);
        const response = await axios.get('/reportsapi/credit_report/', {params: params});
        setReport(response.data);
      }else {
        await axios.get('/reportsapi/credit_report_export/', {params: getParams(data)});
      }
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
                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                  <div className='row-payments-container' style={{width:'15%'}}>
                    <CustomDatePickerFilter label='Min Disbursement Date' name='min_db_date' setFieldValue={setFieldValue}/>
                  </div>
                  <div className='row-payments-container' style={{width:'15%'}}>
                    <CustomDatePickerFilter label='Max Disbursement Date' name='max_db_date' setFieldValue={setFieldValue}/>
                  </div>
                  <div className='row-payments-container' style={{width:'16%'}}>
                    <CustomSelectFilter label='Currency' name='currency_id' required>
                      <option value=''>------</option>
                      {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'16%'}}>
                    <CustomSelectFilter label='Order' name='order' required>
                      <option value='-id'>Show newest first</option>
                      <option value='id'>Show oldest first</option>
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'16%'}}>
                    <CustomSelectFilter label='Page Size' name='page_size' required>
                      <option value='10'>10</option>
                      <option value='25'>25</option>
                      <option value='50'>50</option>
                      <option value='100'>100</option>
                      <option value='200'>200</option>
                      <option value='500'>500</option>
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'16%'}}>
                    <CustomSelectFilter label='Mode' name='file_format' required>
                      <option value='html'>Screen (HTML)</option>
                      <option value='xlsx'>Excel</option>
                      <option value='csv'>CSV</option>
                    </CustomSelectFilter>
                  </div>
                </div>
                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                  <div style={{width:'73%'}}>
                    <CustomMultiSelectFilter
                      label='Branches'
                      name='branch_ids'
                      options={branches.map(br => ({label: br.name, value:br.id}))}
                      setFieldValue={setFieldValue}
                      required
                    />
                  </div>
                  <div className='row-payments-container' style={{width:'10%'}}>
                    <CustomSelectFilter label='Status' name='status' required>
                      <option value='running'>Running</option>
                      <option value='not_running'>Not Running</option>
                      <option value='all'>Both</option>
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'10%'}}>
                    <CustomSelectFilter label='Unit' name='unit_id'>
                      <option value=''>------</option>
                      {units.map(ut => <option key={ut.id} value={ut.id}>{ut.name}</option>)}
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
  )
}

export default Filter;