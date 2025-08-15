import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomSelectFilter,
  MultiSelectFilter,
  CustomDatePickerFilter,
  Fetcher,
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
    unit_id: '',
    loan_product_id: '',
    date_format: '',
  };
  const {currencies} = useCurrencies();
  const {branches} = useBranches();

  const allBranchIds = branches.map(br => br.id);

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);
      if (values.branch_ids.includes('*')) {
        params.delete('branch_ids');
        allBranchIds.forEach(id => params.append('branch_ids', id));
      }
      if (values.file_format === 'html') {
        setParams(params);
        const response = await axios.get('/reportsapi/credit_report/', {params});
        setReport(response.data);
      }else {
        await axios.get('/reportsapi/credit_report_export/', {params});
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
    <Fetcher urls={['/loansapi/loan_products/']}>
      {({data}) => (
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
                          <option value='pdfa4'>PDF A4</option>
                          <option value='pdfa3'>PDF A3</option>
                          <option value='pdfa2'>PDF A2</option>
                          <option value='pdfa1'>PDF A1</option>
                        </CustomSelectFilter>
                      </div>
                    </div>
                    <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                      <div style={{width:'53%'}}>
                        <MultiSelectFilter
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
                        <CustomSelectFilter label='Loan Product' name='loan_product_id'>
                          <option value=''>------</option>
                          {data[0].loan_products.map(product => <option key={product.id} value={product.id}>{product.name} - {product.currency}</option>)}
                        </CustomSelectFilter>
                      </div>
                      <div className='row-payments-container' style={{width:'10%'}}>
                        <CustomSelectFilter label='Unit' name='unit_id'>
                          <option value=''>------</option>
                          {units.map(ut => <option key={ut.id} value={ut.id}>{ut.name} {ut.branch_name} BRANCH</option>)}
                        </CustomSelectFilter>
                      </div>
                      <div className='row-payments-container' style={{width:'10%'}}>
                        <CustomSelectFilter label='Date Format' name='date_format'>
                          <option value=''>-------</option>
                          <option value='DD/MM/YYYY'>DD/MM/YYYY</option>
                          <option value='MM/DD/YYYY'>MM/DD/YYYY</option>
                          <option value='YYYY/MM/DD'>YYYY/MM/DD</option>
                          <option value='DD/Mon/YYYY'>DD/Mon/YYYY</option>
                          <option value='Mon/DD/YYYY'>Mon/DD/YYYY</option>
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
      )}
    </Fetcher>
  )
}

export default Filter;