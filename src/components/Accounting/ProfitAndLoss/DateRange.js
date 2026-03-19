import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomDatePickerFilter,
  CustomSelectFilter,
  MultiSelectFilter,
  CustomCheckBoxfilter,
  SubmitButtonFilter
} from '../../../common';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { useBranches } from '../../../contexts/BranchesContext';
import axios from 'axios';
import { getParams } from '../../../utils/utils';

const DateRange = ({setProfitAndLossData}) => {
  const initialValues = {branch_ids: [], currency_id: '', minDate: '', maxDate: '', consolidate: false};
  const {currencies} = useCurrencies();
  const {branches} = useBranches();

  const allBranchIds = branches.map(br => br.id);

  const onSubmit = async (values, actions) => {
    try {
      const params = getParams(values);
      if (values.branch_ids.includes('*')) {
        params.delete('branch_ids');
        allBranchIds.forEach(id => params.append('branch_ids', id));
      }
      const response = await axios.get('/acc-api/income-statement/', {params: params});
      setProfitAndLossData(response.data);
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
                  <div className='sf-row sf-row-3'>
                    <div className='row-payments-container sf-w-32'>
                      <CustomDatePickerFilter
                        label='Min Date'
                        name='minDate'
                        setFieldValue={setFieldValue}
                        required
                      />
                    </div>

                    <div className='row-payments-container sf-w-32'>
                      <CustomDatePickerFilter
                        label='Max Date'
                        name='maxDate'
                        setFieldValue={setFieldValue}
                        required
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

                  <div className='sf-row sf-row-2 sf-mt-3'>
                    <div className='row-payments-container' style={{width:'66%'}}>
                      <MultiSelectFilter
                        label='Branches'
                        name='branch_ids'
                        options={branches.map(br => ({label: br.name, value:br.id}))}
                        setFieldValue={setFieldValue}
                        required
                      />
                    </div>

                    <div className='row-payments-container' style={{width:'32%', marginTop:'1.5rem'}}>
                      <CustomCheckBoxfilter label='Consolidate' name='consolidate'/>
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

export default DateRange;