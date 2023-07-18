import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomSelectFilter,
  CustomMultiSelectFilter,
  SubmitButtonFilter
} from '../../../../common';
import { useCurrencies } from '../../../../contexts/CurrenciesContext';
import { useBranches } from '../../../../contexts/BranchesContext';
import axios from 'axios';
import { removeEmptyValues, getParams } from '../../../../utils/utils';

const Filter = ({setSubAccounts, setPageInfo, setParams}) => {
  const initialValues = {branch_ids: [], page_num: 1, account_type: '', currency_id: ''};
  const {currencies} = useCurrencies();
  const {branches} = useBranches();

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);
      setParams(params);
      const response = await axios.get('/acc-api/sub_accounts_api/', {params: params});
      setSubAccounts(response.data.accounts);
      delete response.data['accounts'];
      setPageInfo(response.data);
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
                  <div className='row-payments-container' style={{width:'49%'}}>
                    <CustomSelectFilter label='Account Type' name='account_type'>
                      <option value=''>------</option>
                      <option value={'ASSET'}>ASSET</option>
                      <option value={'LIABILITY'}>LIABILITY</option>
                      <option value={'EQUITY'}>EQUITY</option>
                      <option value={'INCOME'}>INCOME</option>
                      <option value={'EXPENSE'}>EXPENSE</option>
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'49%'}}>
                    <CustomSelectFilter label='Currency' name='currency_id' required>
                      <option value=''>------</option>
                      {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                    </CustomSelectFilter>
                  </div>
                </div>
                <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
                  <div style={{width:'90%'}}>
                    <CustomMultiSelectFilter
                      label='Branches'
                      name='branch_ids'
                      options={branches.map(br => ({label: br.name, value:br.id}))}
                      setFieldValue={setFieldValue}
                      required
                    />
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