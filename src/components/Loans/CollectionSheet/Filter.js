import React from 'react';
import { Form, Formik } from 'formik';
import { 
  NonFieldErrors,
  CustomDatePickerFilter,
  CustomSelectFilter,
  CustomCheckbox,
  SubmitButtonFilter
} from '../../../common';
import { useBranches } from '../../../contexts/BranchesContext';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { removeEmptyValues, getParams } from '../../../utils/utils';
import axios from 'axios';

const Filter = ({data, setParams, setSheet}) => {
  const [units, templates, loanOfficers] = data;

  const {branches} = useBranches();
  const {currencies} = useCurrencies();

  const initialValues = {
    payment_date: '',
    branch_id: '',
    currency_id: '',
    report_template_id: '',
    page_num: 1,
    page_size: 10,
    unit_id: '',
    include_overdue: false,
    loan_officer_id: '',
    file_format: 'html'
  }

  const onSubmit = async (values, actions) => {
    const data = removeEmptyValues(values);
    const params = getParams(data);
    setParams(params);
    try {
      const url = values.file_format === 'html' ? '/reportsapi/collection_sheet/' : '/reportsapi/collection_sheet_export/';
      const response = await axios.get(url, {params: params});
      setSheet(response.data);
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
                  <div className='row-payments-container' style={{width:'19%'}}>
                    <CustomDatePickerFilter label='Installment Date' name='payment_date' setFieldValue={setFieldValue} required/>
                  </div>
                  <div className='row-payments-container' style={{width:'19%'}}>
                    <CustomSelectFilter label='Branch' name='branch_id' required>
                      <option value=''>------</option>
                      {branches.map(branch => (<option key={branch.id} value={branch.id}>{branch.name}</option>))}
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'19%'}}>
                    <CustomSelectFilter label='Template' name='report_template_id' required>
                      <option value=''>------</option>
                      {templates.map(template => (<option key={template.id} value={template.id}>{template.report_name}</option>))}
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'19%'}}>
                    <CustomSelectFilter label='Page Size' name='page_size' required>
                      <option value='10'>10</option>
                      <option value='25'>25</option>
                      <option value='50'>50</option>
                      <option value='75'>75</option>
                      <option value='100'>100</option>
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'19%'}}>
                    <CustomSelectFilter label='Currency' name='currency_id'>
                      <option value=''>------</option>
                      {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                    </CustomSelectFilter>
                  </div>
                </div>
                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                  <div className='row-payments-container' style={{width:'19%'}}>
                    <CustomSelectFilter label='Unit' name='unit_id'>
                      <option value=''>------</option>
                      {units.map(ut => <option key={ut.id} value={ut.id}>{ut.name}</option>)}
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'19%'}}>
                    <CustomSelectFilter label='Loan Officer' name='loan_officer_id'>
                      <option value=''>------</option>
                      {loanOfficers.map(loanOfficer => (
                        <option key={loanOfficer.id} value={loanOfficer.id}>
                          {loanOfficer.first_name} {loanOfficer.last_name}
                        </option>
                      ))}
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'19%'}}>
                    <CustomSelectFilter label='Mode' name='file_format' required>
                      <option value='html'>Screen (HTML)</option>
                      <option value='xlsx'>Excel</option>
                      <option value='csv'>CSV</option>
                    </CustomSelectFilter>
                  </div>
                  <CustomCheckbox label='Include Overdue Installments' name='include_overdue'/>
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