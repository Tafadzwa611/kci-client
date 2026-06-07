import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { useCurrencies } from '../../../../contexts/CurrenciesContext';
import { useBranches } from '../../../../contexts/BranchesContext';
import {
  Fetcher,
  CustomInput,
  CustomSelect,
  CustomMultiSelect,
  SubmitButton,
  NonFieldErrors
} from '../../../../common';

function AddExpenseType() {
  const [expenseSettings, setExpenseSettings] = React.useState(null);
  const { currencies } = useCurrencies();
  const { branches } = useBranches();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Add Expense Type';
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('/expensesapi/expense_settings/');
      setExpenseSettings(response.data);
    };
    fetch();
  }, []);

  if (!expenseSettings) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };

      const data = {
        name: values.name,
        currency_id: values.currency_id,
        expense_account_id: values.expense_account.value,
        ...(expenseSettings.accounting_method === 2
          ? { payable_account_id: values.payable_account.value }
          : {}),
        branch_ids: values.branches.map(branch => branch.value)
      };

      const response = await axios.post('/expensesapi/add_expense_type/', data, CONFIG);

      navigate('/users/admin/manageexps/addresults', {
        replace: true,
        state: response.data
      });
    } catch (error) {
      console.log(error);
      if (error.message === 'Network Error') {
        actions.setErrors({ responseStatus: 'Network Error' });
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else {
        actions.setErrors({ responseStatus: error.response.status });
      }
    }
  };

  const initialValues = {
    name: '',
    currency_id: '',
    branches: [],
    expense_account: '',
    payable_account: ''
  };

  return (
    <div className='sf-page'>
      <div style={{ marginBottom: 12 }}>
        <button type='button' className='btn btn-default max'>
          <Link to='/users/admin/manageexps/exptypes'>Back</Link>
        </button>
      </div>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, errors, isSubmitting, setFieldValue }) => (
          <Form autoComplete='off' className='sf-form'>
            <NonFieldErrors errors={errors}>
              <div className='sf-shell'>
                <div className='sf-shell-head'>
                  <div className='sf-shell-title'>Expense Type</div>
                  <div className='sf-shell-subtitle'>
                    Create an expense type, choose its currency and branches, then assign the relevant expense and payable accounts.
                  </div>
                </div>

                <div className='sf-shell-body'>
                  <section className='sf-section'>
                    <div className='sf-section-head'>
                      <div className='sf-section-title'>Expense type information</div>
                      <div className='sf-section-hint'>
                        Enter the basic details and select the accounting accounts required for this expense type.
                      </div>
                    </div>

                    <div className='sf-section-body sf-stack'>
                      <CustomInput label='Name' name='name' type='text' required />

                      <CustomSelect label='Currency' name='currency_id' required>
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
                      />

                      {values.currency_id && (
                        <Fetcher
                          urls={[
                            `/acc-api/sub_accounts_api/?page_num=1&currency_id=${values.currency_id}&show_ib=0&account_type=EXPENSE&account_type=ASSET`,
                            `/acc-api/sub_accounts_api/?page_num=1&currency_id=${values.currency_id}&show_ib=0&account_type=LIABILITY`
                          ]}
                        >
                          {({ data }) => (
                            <>
                              <CustomMultiSelect
                                label='Expense or CapEx Account'
                                name='expense_account'
                                isMulti={false}
                                setFieldValue={setFieldValue}
                                options={data[0].accounts.filter(acc => !acc.is_cash_account).map(account => ({
                                  label: `${account.currency__shortname} - ${account.general_ledger_name} - ${account.general_ledger_code} - ${account.account_type}`,
                                  value: account.id
                                }))}
                                required
                              />

                              {expenseSettings.accounting_method === 2 && (
                                <CustomMultiSelect
                                  label='Payable Account'
                                  name='payable_account'
                                  isMulti={false}
                                  setFieldValue={setFieldValue}
                                  options={data[1].accounts.map(account => ({
                                    label: `${account.general_ledger_name} - ${account.general_ledger_code}`,
                                    value: account.id
                                  }))}
                                  required
                                />
                              )}
                            </>
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

export default AddExpenseType;