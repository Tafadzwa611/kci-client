import React, { useEffect } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';

function AddReceiptBook() {
  const { branches } = useBranches();
  const { currencies } = useCurrencies();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Add Receipt Book';
  }, []);

  const onSubmit = async (values, actions) => {
    try {
      const allowed_apps =
        values.receipt_book_type === '1' ? values.receipt_apps : values.voucher_apps;

      const data = {
        ...values,
        allowed_apps: allowed_apps.map(branch => branch.value)
      };

      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          Accept: 'application/json',
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
        actions.setErrors({ responseStatus: 'Network Error' });
      } else if (error.response?.status >= 400 && error.response?.status < 500) {
        actions.setErrors({
          responseStatus: error.response.status,
          ...error.response.data
        });
      } else {
        actions.setErrors({ responseStatus: error.response?.status });
      }
    }
  };

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
    { value: 1, label: 'Loans' },
    { value: 2, label: 'Payments' }
  ];

  const voucherBookApps = [
    { value: 3, label: 'Expenses' }
  ];

  return (
    <div className='sf-page'>
      <div style={{ marginBottom: 12 }}>
        <button type='button' className='btn btn-default max'>
          <Link to='/users/admin/manageexps/receipt-books'>Back</Link>
        </button>
      </div>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, errors, isSubmitting, setFieldValue }) => (
          <Form autoComplete='off' className='sf-form'>
            <NonFieldErrors errors={errors}>
              <div className='sf-shell'>
                <div className='sf-shell-head'>
                  <div className='sf-shell-title'>Receipt Book</div>
                  <div className='sf-shell-subtitle'>
                    Create a receipt or voucher book, set its range, mode, currency, branch, and allowed applications.
                  </div>
                </div>

                <div className='sf-shell-body'>
                  <section className='sf-section'>
                    <div className='sf-section-head'>
                      <div className='sf-section-title'>Receipt book information</div>
                      <div className='sf-section-hint'>
                        Enter the basic details, choose the type, then select applications and configuration options.
                      </div>
                    </div>

                    <div className='sf-section-body sf-stack'>
                      <CustomInput label='Name' name='name' type='text' required />
                      <CustomInput label='Prefix' name='prefix' type='text' />

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

                      <CustomInput
                        label='Start Number'
                        name='start_number'
                        type='number'
                        step={1}
                        required
                      />

                      <CustomInput
                        label='End Number'
                        name='end_number'
                        type='number'
                        step={1}
                        required
                      />

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

                      <CustomCheckbox label='Is Active' name='is_active' />
                    </div>
                  </section>
                </div>

                <div className='sf-shell-footer'>
                  <SubmitButton isSubmitting={isSubmitting} />
                </div>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddReceiptBook;