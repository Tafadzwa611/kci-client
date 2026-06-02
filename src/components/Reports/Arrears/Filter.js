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

const Filter = ({setReport, setParams}) => {
  const initialValues = {
    currency_id: '',
    branch_ids: [],
    as_of_date: '',
    page_num: 1,
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
        const response = await axios.get('/reportsapi/arrears_report/', {params: params});
        setReport(response.data);
      }else {
        params.append('file_format', values.mode);
        await axios.get('/reportsapi/arrears_report_export/', {params: params});
      }
    }catch (error) {
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
                  <div className='sf-row sf-row-3'>
                    <div className='row-payments-container sf-w-16'>
                      <CustomDatePickerFilter
                        label='Date'
                        name='as_of_date'
                        setFieldValue={setFieldValue}
                        required
                      />
                    </div>

                    <div className='row-payments-container sf-w-16'>
                      <CustomSelectFilter label='Currency' name='currency_id' required>
                        <option value=''>------</option>
                        {currencies.map(currency => (
                          <option key={currency.id} value={currency.id}>
                            {currency.fullname}
                          </option>
                        ))}
                      </CustomSelectFilter>
                    </div>
                  </div>

                  <div className='sf-row sf-row-2 sf-mt-3'>
                    <div className='row-payments-container sf-w-16'>
                      <CustomSelectFilter label='Mode' name='mode' required>
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

                  <div className='sf-row sf-row-2 sf-mt-3'>
                    <div className='row-payments-container sf-w-16'>
                      <MultiSelectFilter
                        label='Branches'
                        name='branch_ids'
                        options={branches.map(br => ({label: br.name, value:br.id}))}
                        setFieldValue={setFieldValue}
                      />
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