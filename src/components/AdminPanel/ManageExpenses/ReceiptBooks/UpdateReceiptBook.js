import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


function UpdateReceiptBook() {
  const params = useParams();
  const {branches} = useBranches();
  const {currencies} = useCurrencies();
  const [rb, setRb] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`/loansapi/receipt_book/${params.rbId}`);
      setRb(response.data);
    }
    fetch();
  }, []);

  if (!rb) {
    return <div>Loading...</div>
  }

  const onSubmit = async (values, actions) => {
    try {
      const allowed_apps = (
        values.receipt_book_type == '1' ?
        values.receipt_apps :
        values.voucher_apps
      );
      const data = {
        ...values,
        allowed_apps: allowed_apps.map(app => app.value)
      };
      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      await axios.put(
        `/loansapi/update_receipt_book/${params.rbId}/`,
        data,
        CONFIG
      );
      navigate(`/users/admin/manageexps/receipt-book-details/${params.rbId}`);
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

  const receiptBookApps = [
    {value: 1, label: 'Loans'},
    {value: 2, label: 'Payments'}
  ];

  const voucherBookApps = [
    {value: 3, label: 'Expenses'}
  ];

  const initialValues = {
    name: rb.name,
    prefix: rb.prefix,
    start_number: rb.start_number,
    end_number: rb.end_number,
    mode: rb.mode,
    receipt_book_type: rb.receipt_book_type,
    currency_id: rb.currency.id,
    branch_id: rb.branch.id,
    receipt_apps: receiptBookApps.filter(app => rb.allowed_apps.includes(app.value)),
    voucher_apps: voucherBookApps.filter(app => rb.allowed_apps.includes(app.value)),
    is_active: rb.is_active
  }

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
            {values.receipt_book_type == '1' ? (
              <CustomMultiSelect
                key='receipt_apps'
                label='Applications'
                initVals={values.receipt_apps}
                options={receiptBookApps}
                setFieldValue={setFieldValue}
                name='receipt_apps'
              />
              ) : (
              <CustomMultiSelect
                key='voucher_apps'
                label='Applications'
                initVals={values.voucher_apps}
                options={voucherBookApps}
                setFieldValue={setFieldValue}
                name='voucher_apps'
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

export default UpdateReceiptBook;