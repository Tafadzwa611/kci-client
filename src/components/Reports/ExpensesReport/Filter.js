import React from 'react';
import { Form, Formik } from 'formik';
import axios from 'axios';
import {
  NonFieldErrors,
  CustomDatePickerFilter,
  MultiSelectFilter,
  SubmitButtonFilter,
  CustomSelectFilter,
} from '../../../common';
import { useBranches } from '../../../contexts/BranchesContext';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { getParams } from '../../../utils/utils';

const Filter = ({ setReport, setParams }) => {
  const { branches } = useBranches();
  const { currencies } = useCurrencies();

  const initialValues = {
    page_num: 1,
    min_date: '',
    max_date: '',
    branch_ids: [],
    currency_id: '',
  };

  const allBranchIds = branches.map(branch => branch.id);

  const onSubmit = async (values, actions) => {
    try {
      const params = getParams(values);

      if (values.branch_ids.includes('*')) {
        params.delete('branch_ids');
        allBranchIds.forEach(id => params.append('branch_ids', id));
      }

      const response = await axios.get('/reportsapi/expenses_report/', { params });
      setReport(response.data);
      setParams(new URLSearchParams(params.toString()));
    } catch (error) {
      if (error.message === 'Network Error') {
        actions.setErrors({ responseStatus: 'Network Error' });
      } else if (error.response && error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else {
        actions.setErrors({ responseStatus: error.response?.status || 500 });
      }
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting, setFieldValue, errors }) => (
        <div className='search_background'>
          <div className='row-containers sf-shellwrap'>
            <Form>
              <NonFieldErrors errors={errors}>
                <div className='row row-payments row-loans sf-card'>
                  <div className='sf-row sf-row-3'>
                    <div className='row-payments-container sf-w-32'>
                      <CustomDatePickerFilter
                        label='From Date'
                        name='min_date'
                        setFieldValue={setFieldValue}
                      />
                    </div>

                    <div className='row-payments-container sf-w-32'>
                      <CustomDatePickerFilter
                        label='To Date'
                        name='max_date'
                        setFieldValue={setFieldValue}
                      />
                    </div>

                    <div className='row-payments-container sf-w-32'>
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

                  <div className='sf-row sf-mt-3'>
                    <div className='row-payments-container' style={{ width: '100%' }}>
                      <MultiSelectFilter
                        label='Branches'
                        name='branch_ids'
                        options={branches.map(branch => ({ label: branch.name, value: branch.id }))}
                        setFieldValue={setFieldValue}
                      />
                    </div>
                  </div>
                </div>

                <div className='sf-submit'>
                  <SubmitButtonFilter isSubmitting={isSubmitting} />
                </div>
              </NonFieldErrors>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Filter;
