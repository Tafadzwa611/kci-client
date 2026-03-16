import React, { useEffect } from 'react';
import {
  Fetcher,
  CustomInput,
  CustomSelect,
  CustomMultiSelect,
  SubmitButton,
  CustomDatePicker,
  NonFieldErrors
} from '../../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useBranches } from '../../../../contexts/BranchesContext';
import { useCurrencies } from '../../../../contexts/CurrenciesContext';
import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

function AddBudget() {
  const { branches } = useBranches();
  const { currencies } = useCurrencies();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Add Budget';
  }, []);

  const onSubmit = async (values, actions) => {
    try {
      const data = {
        month: values.month,
        limit: values.limit,
        currency_id: values.currency_id,
        expense_account_id: values.expense_account.value,
        branch_ids: values.branches.map(branch => branch.value)
      };

      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.post(
        '/expensesapi/create_budget/',
        data,
        CONFIG
      );

      navigate('/users/admin/manageexps/budget-results', {
        replace: true,
        state: response.data
      });
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
    month: '',
    limit: '',
    currency_id: '',
    expense_account: '',
    branches: ''
  };

  return (
    <div className='sf-page'>
      <div style={{ marginBottom: 12 }}>
        <button type='button' className='btn btn-default max'>
          <Link to='/users/admin/manageexps/budgets'>Back</Link>
        </button>
      </div>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, errors, isSubmitting, setFieldValue }) => (
          <Form autoComplete='off' className='sf-form'>
            <NonFieldErrors errors={errors}>
              <div className='sf-shell'>
                <div className='sf-shell-head'>
                  <div className='sf-shell-title'>Budget</div>
                  <div className='sf-shell-subtitle'>
                    Create a monthly budget limit, pick a currency, choose branches, and assign an expense account.
                  </div>
                </div>

                <div className='sf-shell-body'>
                  <section className='sf-section'>
                    <div className='sf-section-head'>
                      <div className='sf-section-title'>Budget information</div>
                      <div className='sf-section-hint'>
                        Select the budget month and configure limit, currency, branches, and expense account.
                      </div>
                    </div>

                    <div className='sf-section-body sf-stack'>
                      <CustomDatePicker
                        label='Date'
                        name='month'
                        setFieldValue={setFieldValue}
                        required
                      />

                      <CustomInput
                        label='Limit'
                        name='limit'
                        type='number'
                        required
                      />

                      <CustomSelect
                        label='Currency'
                        name='currency_id'
                        required
                      >
                        <option value=''>------</option>
                        {currencies.map(currency => (
                          <option key={currency.id} value={currency.id}>
                            {currency.fullname}
                          </option>
                        ))}
                      </CustomSelect>

                      <CustomMultiSelect
                        label='Branches'
                        initVals={[]}
                        options={branches.map(branch => ({
                          value: branch.id,
                          label: branch.name
                        }))}
                        setFieldValue={setFieldValue}
                        name='branches'
                        required
                      />

                      {values.currency_id && (
                        <Fetcher
                          urls={[
                            `/acc-api/sub_accounts_api/?page_num=1&currency_id=${values.currency_id}&show_ib=0&account_type=EXPENSE`
                          ]}
                        >
                          {({ data }) => (
                            <CustomMultiSelect
                              label='Expense Account'
                              name='expense_account'
                              isMulti={false}
                              setFieldValue={setFieldValue}
                              options={data[0].accounts.map(account => ({
                                label: `${account.general_ledger_name} - ${account.general_ledger_code}`,
                                value: account.id
                              }))}
                              required
                            />
                          )}
                        </Fetcher>
                      )}
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

export default AddBudget;