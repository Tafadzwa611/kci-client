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
import { useNavigate } from 'react-router-dom';


function AddReceiptBook() {
  const {branches} = useBranches();
  const {currencies} = useCurrencies();
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      const allowed_apps = values.receipt_book_type === '1' ? values.receipt_apps : values.voucher_apps;
      const data = {
        ...values,
        allowed_apps: allowed_apps.map(branch => branch.value)
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
      navigate(`/users/admin/manageexps/receipt-book-details/${response.data.id}`);
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
    receipt_book_type: '',
    start_number: '',
    end_number: '',
    mode: '',
    currency_id: '',
    branch_id: '',
    receipt_apps: '',
    voucher_apps: '',
    is_active: false
  };

  const receiptBookApps = [
    {value: 1, label: 'Loans'},
    {value: 2, label: 'Payments'}
  ];

  const voucherBookApps = [
    {value: 3, label: 'Expenses'}
  ];

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, errors, isSubmitting, setFieldValue }) => (
          <Form>
            <div className='divider divider-info'>
              <span>Receipt Book Information</span>
            </div>
            <CustomInput label='Name' name='name' type='text' required/>
            <CustomInput label='Prefix' name='prefix' type='text'/>
            <CustomSelect label='Type' name='receipt_book_type' required>
              <option value=''>------</option>
              <option value='1'>Receipt Book</option>
              <option value='2'>Voucher Book</option>
            </CustomSelect>
            {values.receipt_book_type === '1' ? (
              <CustomMultiSelect
                key='receipt_apps'
                label='Applications'
                initVals={[]}
                options={receiptBookApps}
                setFieldValue={setFieldValue}
                name='receipt_apps'
                required
              />
              ) : (
              <CustomMultiSelect
                key='voucher_apps'
                label='Applications'
                initVals={[]}
                options={voucherBookApps}
                setFieldValue={setFieldValue}
                name='voucher_apps'
                required
              />
            )}
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