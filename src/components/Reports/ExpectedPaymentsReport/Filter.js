import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomDatePickerFilter,
  CustomSelectFilter,
  CustomMultiSelectFilter,
  SubmitButtonFilter
} from '../../../common';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { useBranches } from '../../../contexts/BranchesContext';
import axios from 'axios';
import { removeEmptyValues, getParams } from '../../../utils/utils';

const Filter = ({setReport, setParams}) => {
  const initialValues = {branch_ids: [], page_num: 1, min_date: '', max_date: '', file_format: 'html'};
  const {currencies} = useCurrencies();
  const {branches} = useBranches();

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      data.base_entity = 'INSTALLMENTS_REPORT';
      const params = getParams(data);
      setParams(params);
      if (values.file_format === 'html') {
        const response = await axios.get('/reportsapi/expected_installments_report/', {params: params});
        setReport(response.data);
      }else {
        await axios.get('/reportsapi/expected_installments_report_export/', {params: params});
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
                  <div className='row-payments-container' style={{width:'32%'}}>
                    <CustomDatePickerFilter label='Start Value Date' name='min_date' setFieldValue={setFieldValue} required/>
                  </div>
                  <div className='row-payments-container' style={{width:'32%'}}>
                    <CustomDatePickerFilter label='End Value Date' name='max_date' setFieldValue={setFieldValue} required/>
                  </div>
                  <div className='row-payments-container' style={{width:'32%'}}>
                    <CustomSelectFilter label='Currency' name='currency_id' required>
                      <option value=''>------</option>
                      {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                    </CustomSelectFilter>
                  </div>
                </div>
                <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
                  <div style={{width:'70%'}}>
                    <CustomMultiSelectFilter
                      label='Branches'
                      name='branch_ids'
                      options={branches.map(br => ({label: br.name, value:br.id}))}
                      setFieldValue={setFieldValue}
                      required
                    />
                  </div>
                  <div className='row-payments-container' style={{width:'20%'}}>
                    <CustomSelectFilter label='Mode' name='file_format' required>
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