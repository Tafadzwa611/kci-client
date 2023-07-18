import React from 'react';
import {
  CustomInput,
  CustomSelect,
  NonFieldErrors,
  CustomTextField,
  CustomDatePicker,
  SubmitButton,
  CustomCheckbox,
  Fetcher
} from '../../../../common';
import { Form, Formik } from 'formik';
import { useCurrencies } from '../../../../contexts/CurrenciesContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../../utils/utils';
import { useNavigate } from 'react-router-dom';

function AddDetailAccount() {
  const initialValues = {
    general_ledger_name: '',
    general_ledger_code: '',
    account_type: '',
    account_open_date: '',
    currency_id: '',
    branch_id: '',
    is_cash_account: false,
    description: '',
    header_account_id: ''
  };

  const {currencies} = useCurrencies();
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const data = removeEmptyValues(values);
      const response = await axios.post('/acc-api/create-sub-account/', data, CONFIG);
      console.log(response.data);
      navigate({pathname: `/accounting/viewaccounting/chartsofaccounts/detailaccount/${response.data.id}`});
    } catch (error) {
      console.log(error);
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
    <Fetcher urls={['/acc-api/main-accounts-list/', '/usersapi/branch-list/']}>
      {({data}) => (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting, errors, setFieldValue}) => (
            <Form>
              <NonFieldErrors errors={errors}>
                <div className='divider divider-info'>
                  <span>Detail Account Information</span>
                </div>
                <CustomInput label='General Ledger Name' name='general_ledger_name' type='text' required/>
                <CustomInput label='General Ledger Code' name='general_ledger_code' type='text' required/>
                <CustomSelect label='Account Type' name='account_type' required>
                  <option value=''>------</option>
                  <option value='ASSET'>ASSET</option>
                  <option value='LIABILITY'>LIABILITY</option>
                  <option value='EQUITY'>EQUITY</option>
                  <option value='INCOME'>INCOME</option>
                  <option value='EXPENSE'>EXPENSE</option>
                </CustomSelect>
                <CustomSelect label='Branch' name='branch_id' required>
                  <option value=''>------</option>
                  {data[1].map(br => <option key={br.id} value={br.id}>{br.name}</option>)}
                </CustomSelect>
                <CustomSelect label='Currency' name='currency_id' required>
                  <option value=''>------</option>
                  {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                </CustomSelect>
                <CustomDatePicker label='Account Date' name='account_open_date' setFieldValue={setFieldValue} required/>
                <CustomSelect label='Header Account' name='header_account_id'>
                  <option value=''>------</option>
                  {data[0].map(acc => <option key={acc.id} value={acc.id}>{acc.general_ledger_code}-{acc.general_ledger_name}-{acc.account_type}</option>)}
                </CustomSelect>
                <CustomCheckbox label='Is Cash Account' name='is_cash_account'/>
                <CustomTextField label='Description' name='description'/>
                <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
                <div style={{display:'flex', justifyContent: 'flex-end'}}> 
                  <SubmitButton isSubmitting={isSubmitting}/>
                </div>
              </NonFieldErrors>
            </Form>
          )}
        </Formik>
      )}
    </Fetcher>
  )
}

export default AddDetailAccount;