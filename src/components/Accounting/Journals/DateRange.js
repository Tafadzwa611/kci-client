import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomDatePickerFilter,
  CustomSelectFilter,
  CustomMultiSelectFilter,
  SubmitButtonFilter,
  CustomSelectRemote
} from '../../../common';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { useBranches } from '../../../contexts/BranchesContext';
import axios from 'axios';
import { removeEmptyValues, getParams } from '../../../utils/utils';

const DateRange = ({setParams, staff, setInfo}) => {
  const initialValues = {
    branch_ids: [],
    page_num: 1,
    min_date: '',
    max_date: '',
    order: '-date_created',
    account_debited_id: '',
    account_credited_id: '',
    user_id: ''
  };

  const {currencies} = useCurrencies();
  const {branches} = useBranches();

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      if (data.account_debited_id) {
        data.account_debited_id = data.account_debited_id.id;
      }

      if (data.account_credited_id) {
        data.account_credited_id = data.account_credited_id.id;
      }
      const params = getParams(data);
      setParams(params);
      const response = await axios.get('/acc-api/journals-list/', {params: params});
      setInfo(response.data);
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
      {({isSubmitting, setFieldValue, errors, values}) => (
        <div className='search_background'>
          <div className='row-containers' style={{border:'none'}}>
            <Form>
              <NonFieldErrors errors={errors}>
                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                  <div className='row-payments-container' style={{width:'25%'}}>
                    <CustomSelectFilter label='Currency' name='currency_id' required>
                      <option value=''>------</option>
                      {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.shortname}</option>)}
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'25%'}}>
                    <CustomDatePickerFilter label='Min Value Date' name='min_date' setFieldValue={setFieldValue}/>
                  </div>
                  <div className='row-payments-container' style={{width:'25%'}}>
                    <CustomDatePickerFilter label='Max Value Date' name='max_date' setFieldValue={setFieldValue}/>
                  </div>
                  <div className='row-payments-container' style={{width:'25%'}}>
                    <CustomSelectFilter label='User' name='user_id'>
                      <option value=''>------</option>
                      {staff.map(mbr => <option key={mbr.id} value={mbr.id}>{mbr.first_name} {mbr.last_name}</option>)}
                    </CustomSelectFilter>
                  </div>
                </div>
                {values.currency_id ?
                <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
                  <div style={{width:'50%'}}>
                    <CustomSelectRemote
                      label='Account Debited'
                      url='/acc-api/search_account/'
                      selected={values.account_debited_id}
                      params={[
                        {key: 'currency_id', value: values.currency_id}
                      ]}
                      setFieldValue={setFieldValue}
                      queryParamName='query'
                      placeholder='Search Account'
                      name='account_debited_id'
                    />
                  </div>
                  <div style={{width:'50%'}}>
                    <CustomSelectRemote
                      label='Account Credited'
                      url='/acc-api/search_account/'
                      selected={values.account_credited_id}
                      params={[
                        {key: 'currency_id', value: values.currency_id}
                      ]}
                      setFieldValue={setFieldValue}
                      queryParamName='query'
                      placeholder='Search Account'
                      name='account_credited_id'
                    />
                  </div>
                </div> : null}
                <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
                  <div style={{width:'80%'}}>
                    <CustomMultiSelectFilter label='Branches' name='branch_ids' options={branches.map(br => ({label: br.name, value:br.id}))} setFieldValue={setFieldValue} required/>
                  </div>
                  <div className='row-payments-container' style={{width:'10%'}}>
                    <CustomSelectFilter label='Order' name='order'>
                      <option value={'-date_created'}>Show newest first</option>
                      <option value={'date_created'}>Show oldest first</option>
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

export default DateRange;

