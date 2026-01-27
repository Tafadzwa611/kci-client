import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { useCurrencies } from '../../../../contexts/CurrenciesContext';
import { useBranches } from '../../../../contexts/BranchesContext';
import {
  Fetcher,
  CustomInput,
  CustomSelect,
  CustomMultiSelect,
  SubmitButton
} from '../../../../common';


function AddExpenseType() {
  const [expenseSettings, setExpenseSettings] = React.useState(null);
  const {currencies} = useCurrencies();
  const {branches} = useBranches();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('/expensesapi/expense_settings/');
      setExpenseSettings(response.data);
    }
    fetch();
  }, []);

  if (!expenseSettings) {
    return <div>Loading...</div>
  }

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const data = {
        name: values.name,
        currency_id: values.currency_id,
        expense_account_id: values.expense_account.value,
        ...(expenseSettings.accounting_method === 2 ? {payable_account_id: values.payable_account.value} : {}),
        branch_ids: values.branches.map(branch => branch.value)
      };
      const response = await axios.post('/expensesapi/add_expense_type/', data, CONFIG);
      console.log(response.data);
      navigate('/users/admin/manageexps/addresults', {
        replace: true,
        state: response.data
      });
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
    currency_id: '',
    branches: [],
    expense_account: '',
    payable_account: ''
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, isSubmitting, setFieldValue }) => (
          <Form>
            <div className='divider divider-info'>
              <span>Expense Type Information</span>
            </div>
            <CustomInput label='Name' name='name' type='text' required/>
            <CustomSelect label='Currency' name='currency_id' required>
              <option value=''>------</option>
              {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
            </CustomSelect>
            <CustomMultiSelect
              label='Branches'
              initVals={[]}
              options={branches.map(branch => ({value: branch.id, label: branch.name}))}
              setFieldValue={setFieldValue}
              name='branches'
            />
            <div style={{paddingTop: '1rem'}}></div>
            {values.currency_id && (
              <Fetcher urls={[
                `/acc-api/sub_accounts_api/?page_num=1&currency_id=${values.currency_id}&show_ib=0&account_type=EXPENSE`,
                `/acc-api/sub_accounts_api/?page_num=1&currency_id=${values.currency_id}&show_ib=0&account_type=LIABILITY`
                ]}
              >
                {({data}) => (
                  <div>
                    <CustomMultiSelect
                      label='Expense Account'
                      name='expense_account'
                      isMulti={false}
                      setFieldValue={setFieldValue}
                      options={data[0].accounts.map(account => (
                        {label: `${account.general_ledger_name} - ${account.general_ledger_code}`, value: account.id}
                      ))}
                      required
                    />
                    {expenseSettings.accounting_method === 2 && (
                      <CustomMultiSelect
                        label='Payable Account'
                        name='payable_account'
                        isMulti={false}
                        setFieldValue={setFieldValue}
                        options={data[1].accounts.map(account => (
                          {label: `${account.general_ledger_name} - ${account.general_ledger_code}`, value: account.id}
                        ))}
                        required
                      />
                    )}
                  </div>
                )}
              </Fetcher>
            )}
            <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
            <div style={{display:'flex', justifyContent: 'flex-end'}}> 
              <SubmitButton isSubmitting={isSubmitting}/>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddExpenseType;