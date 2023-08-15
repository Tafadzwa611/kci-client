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

const Filter = ({setData, setParams}) => {
  const initialValues = {branch_ids: [], page_num: 1, client_name: '', min_date_created: '', max_date_created: ''};
  const {currencies} = useCurrencies();
  const {branches} = useBranches();

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);
      setParams(params);
      const response = await axios.get('/loansapi/payments_list/', {params: params});
      setData(response.data);
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
                    <CustomDatePickerFilter label='Min Col Date' name='min_date_created' setFieldValue={setFieldValue}/>
                  </div>
                  <div className='row-payments-container' style={{width:'32%'}}>
                    <CustomDatePickerFilter label='Max Col Date' name='max_date_created' setFieldValue={setFieldValue}/>
                  </div>
                  <div className='row-payments-container' style={{width:'32%'}}>
                    <CustomInputFilter label='Search Client' name='client_name' type='text'/>
                  </div>
                </div>
                <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
                  <div style={{width:'70%'}}>
                    <CustomMultiSelectFilter
                      label='Branches'
                      name='branch_ids'
                      options={branches.map(br => ({label: br.name, value:br.id}))}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <div style={{width:'20%'}}>
                    <CustomSelectFilter label='Currency' name='currency_id' required>
                      <option value=''>------</option>
                      {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
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

