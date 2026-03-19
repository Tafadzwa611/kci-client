import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
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
    file_format: 'html',
    unit_id: '',
    status: ''
  };

  const {currencies} = useCurrencies();
  const {branches} = useBranches();

  const allBranchIds = branches.map(br => br.id);

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      data.base_entity = 'INSTALLMENTS_REPORT';
      const params = getParams(data);
      if (values.branch_ids.includes('*')) {
        params.delete('branch_ids');
        allBranchIds.forEach(id => params.append('branch_ids', id));
      }
      setParams(params);
      if (values.file_format === 'html') {
        const response = await axios.get('/reportsapi/expected_installments_report/', {params: params});
        setReport(response.data);
      } else {
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
          <div className='row-containers sf-shellwrap'>
            <Form>
              <NonFieldErrors errors={errors}>
                <div className='row row-payments row-loans sf-card'>
                  <div className='sf-row sf-row-4'>
                    <div className='row-payments-container sf-w-24'>
                      <CustomDatePickerFilter
                        label='Start Value Date'
                        name='min_date'
                        setFieldValue={setFieldValue}
                        required
                      />
                    </div>

                    <div className='row-payments-container sf-w-24'>
                      <CustomDatePickerFilter
                        label='End Value Date'
                        name='max_date'
                        setFieldValue={setFieldValue}
                        required
                      />
                    </div>

                    <div className='row-payments-container sf-w-24'>
                      <CustomSelectFilter label='Currency' name='currency_id' required>
                        <option value=''>------</option>
                        {currencies.map(currency => (
                          <option key={currency.id} value={currency.id}>
                            {currency.fullname}
                          </option>
                        ))}
                      </CustomSelectFilter>
                    </div>

                    <div className='row-payments-container sf-w-24'>
                      <CustomSelectFilter label='Unit' name='unit_id'>
                        <option value=''>------</option>
                        {units.map(ut => (
                          <option key={ut.id} value={ut.id}>
                            {ut.name} {ut.branch_name} BRANCH
                          </option>
                        ))}
                      </CustomSelectFilter>
                    </div>
                  </div>

                  <div className='sf-row sf-mt-3'>
                    <div className='row-payments-container' style={{width:'100%'}}>
                      <MultiSelectFilter
                        label='Branches'
                        name='branch_ids'
                        options={branches.map(br => ({label: br.name, value:br.id}))}
                        setFieldValue={setFieldValue}
                        required
                      />
                    </div>
                  </div>

                  <div className='sf-row sf-row-2 sf-mt-3'>
                    <div className='row-payments-container' style={{width:'49%'}}>
                      <CustomSelectFilter label='Status' name='status'>
                        <option value=''>Select Status</option>
                        <option value='Pending'>Unpaid</option>
                        <option value='Paid'>Paid</option>
                        <option value='Overdue'>Overdue</option>
                      </CustomSelectFilter>
                    </div>

                    <div className='row-payments-container' style={{width:'49%'}}>
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
  );
}

export default Filter;