import React from 'react';
import { Form, Formik } from 'formik';
import {
  CustomInput,
  CustomSelect,
  CustomMultiSelect,
  CustomCheckbox,
  NonFieldErrors,
  SubmitButton
} from '../../../../common';
import { useBranches } from '../../../../contexts/BranchesContext';
import { useCurrencies } from '../../../../contexts/CurrenciesContext';
import axios from 'axios';
import Cookies from 'js-cookie';


function AddReceiptBook() {
  const {branches} = useBranches();
  const {currencies} = useCurrencies();

  const onSubmit = async (values, actions) => {
    try {
      const data = {
        ...values,
        allowed_apps: values.allowed_apps.map(branch => branch.value)
      };
      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.post(
        '/loansapi/create_receipt_book/',
        data,
        CONFIG
      );
      console.log(response.data);
      // navigate('/users/admin/manageexps/budget-results', {
      //   replace: true,
      //   state: response.data
      // });
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

  const initialValues = {
    name: '',
    prefix: '',
    start_number: '',
    end_number: '',
    mode: '',
    currency_id: '',
    branch_id: '',
    allowed_apps: '',
    is_active: false
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, isSubmitting, setFieldValue }) => (
          <Form>
            <div className='divider divider-info'>
              <span>Receipt Book Information</span>
            </div>
            <CustomInput label='Name' name='name' type='text' required/>
            <CustomInput label='Prefix' name='prefix' type='text'/>
            <CustomInput label='Start Number' name='start_number' type='number' step={1} required/>
            <CustomInput label='End Number' name='end_number' type='number' step={1} required/>
            <CustomSelect label='Mode' name='mode' required>
              <option value=''>------</option>
              <option value='1'>Auto</option>
              <option value='2'>Manual</option>
            </CustomSelect>
            <CustomSelect label='Currency' name='currency_id' required>
              <option value=''>------</option>
              {currencies.map(currency => (
                <option key={currency.id} value={currency.id}>
                  {currency.fullname}
                </option>
              ))}
            </CustomSelect>
            <CustomSelect label='Branch' name='branch_id' required>
              <option value=''>------</option>
              {branches.map(branch => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </CustomSelect>
            <CustomMultiSelect
              label='Applications'
              initVals={[]}
              options={[
                {value: 1, label: 'Loans'},
                {value: 2, label: 'Payments'},
                {value: 3, label: 'Expenses'}
              ]}
              setFieldValue={setFieldValue}
              name='allowed_apps'
              required
            />
            <CustomCheckbox label='Is Active' name='is_active'/>
            <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
            <div style={{display:'flex', justifyContent: 'flex-end'}}> 
              <SubmitButton isSubmitting={isSubmitting}/>
            </div>
            <NonFieldErrors errors={errors}/>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddReceiptBook;