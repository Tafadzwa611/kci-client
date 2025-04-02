import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomInputFilter,
  CustomDatePickerFilter,
  CustomSelectFilter,
  MultiSelectFilter,
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
    min_date: '',
    max_date: '',
    client_str: '',
    reason: '',
    status: '',
    unit_id: '',
    order: '-id',
    mode: 'html'
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
      if (values.mode === 'html') {
        setParams(params);
        const response = await axios.get('/reportsapi/loans-report/', {params});
        setReport(response.data);
      }else {
        params.append('file_format', values.mode);
        await axios.get('/reportsapi/loans-report-export/', {params});
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
                    <CustomDatePickerFilter label='Min Date' name='min_date' setFieldValue={setFieldValue} required/>
                  </div>
                  <div className='row-payments-container' style={{width:'16%'}}>
                    <CustomDatePickerFilter label='Max Date' name='max_date' setFieldValue={setFieldValue} required/>
                  </div>
                  <div className='row-payments-container' style={{width:'16%'}}>
                    <CustomInputFilter label='Search Client' name='client_str' type='text'/>
                  </div>
                  <div className='row-payments-container' style={{width:'16%'}}>
                    <CustomSelectFilter label='Currency' name='currency_id' required>
                      <option value=''>------</option>
                      {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'16%'}}>
                    <CustomSelectFilter label='Unit' name='unit_id'>
                      <option value=''>------</option>
                      {units.map(ut => <option key={ut.id} value={ut.id}>{ut.name}</option>)}
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'16%'}}>
                    <CustomSelectFilter label='Reason For Borrowing' name='reason'>
                      <option value=''>-----</option>
                      <option value='CONSUMER'>CONSUMER</option>
                      <option value='COMMERCIAL - Agriculture'>COMMERCIAL - Agriculture</option>
                      <option value='COMMERCIAL - Manufacturing'>COMMERCIAL - Manufacturing</option>
                      <option value='COMMERCIAL - Mining'>COMMERCIAL - Mining</option>
                      <option value='COMMERCIAL - Housing'>COMMERCIAL - Housing</option>
                      <option value='COMMERCIAL - Distribution & Services'>COMMERCIAL - Distribution & Services</option>
                      <option value='COMMERCIAL - Retail'>COMMERCIAL - Retail</option>
                      <option value='COMMERCIAL - Transport'>COMMERCIAL - Transport</option>
                      <option value='COMMERCIAL - Health'>COMMERCIAL - Health</option>
                      <option value='COMMERCIAL - Education'>COMMERCIAL - Education</option>
                      <option value='COMMERCIAL - Cross Border Traders'>COMMERCIAL - Cross Border Traders</option>
                      <option value='COMMERCIAL - Construction'>COMMERCIAL - Construction</option>
                      <option value='COMMERCIAL - Vendors'>COMMERCIAL - Vendors</option>
                      <option value='OTHER'>OTHER</option>
                    </CustomSelectFilter>
                  </div>
                </div>
                <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
                  <div style={{width:'63%'}}>
                    <MultiSelectFilter
                      label='Branches'
                      name='branch_ids'
                      options={branches.map(br => ({label: br.name, value:br.id}))}
                      setFieldValue={setFieldValue}
                      required
                    />
                  </div>
                  <div className='row-payments-container' style={{width:'10%'}}>
                    <CustomSelectFilter label='Status' name='status'>
                      <option value=''>-----</option>
                      <option value='Open'>Open</option>
                      <option value='Arrears'>Arrears</option>
                      <option value='Fully Paid'>Fully Paid</option>
                      <option value='Over Paid'>Over Paid</option>
                      <option value='Written-Off'>Written-Off</option>
                      <option value='Restructured'>Restructured</option>
                      <option value='Refinanced'>Refinanced</option>
                      <option value='Early Settlement'>Early Settlement</option>
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'10%'}}>
                    <CustomSelectFilter label='Mode' name='mode' required>
                      <option value='html'>Screen (HTML)</option>
                      <option value='xlsx'>Excel</option>
                      <option value='csv'>CSV</option>
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'10%'}}>
                    <CustomSelectFilter label='Order' name='order' required>
                      <option value={'-id'}>Show newest first</option>
                      <option value={'id'}>Show oldest first</option>
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

