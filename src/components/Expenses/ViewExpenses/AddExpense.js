import React from 'react';
import {addSchema} from './schema';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../utils/utils';
import { Form, Formik } from 'formik';
import {
  CustomMultiSelect,
  CustomInput,
  NonFieldErrors,
  SubmitButton,
  CustomDatePicker
} from '../../../common';


function AddExpense({expensetypes, fundaccounts}) {
  const [currencyId, seCurrencyId] = React.useState('');
  const [settings, setSettings] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await axios.get('/expensesapi/expense_settings/');
        setSettings(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSettings();
  }, []);

  if (!settings) {
    return <div>Loading...</div>
  }

  const initialValues = {
    expense_type_id: '',
    expense_name: '',
    expense_amount: '',
    expense_date: '',
    reference: '',
    description: '',
    fund_account_id: '',
  };

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post('/expensesapi/add_expense/', data, CONFIG);
      navigate({pathname: '/expenses/viewexpenses', search: `?expense_id=${response.data.id}`});
    } catch (error) {
      if (error.message === "Network Error") {
        actions.setErrors({responseStatus: "Network Error"});
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({responseStatus: error.response.status, ...error.response.data});
      } else {
        actions.setErrors({responseStatus: error.response.status});
      }
    }
  }

  return (
    <Formik initialValues={initialValues} validationSchema={addSchema} onSubmit={onSubmit}>
      {({ isSubmitting, errors, setFieldValue }) => (
        <Form>
          <NonFieldErrors errors={errors}>
            <div className='divider divider-info'><span>Expense Information</span></div>
            <CustomMultiSelect
              label='Expense Type'
              name='expense_type'
              isMulti={false}
              setFieldValue={(field_name, selectedOpts) => {
                setFieldValue(field_name, selectedOpts);
                setFieldValue('expense_type_id', selectedOpts.value);
                const exp_type = expensetypes.find(et => et.id == selectedOpts.value);
                seCurrencyId(exp_type.currency_id);
              }}
              options={expensetypes.filter(type => type.is_active).map(type => (
                {label: `${type.currency__shortname} ${type.name} ${type.branch__name}`, value: type.id}
              ))}
              required
            />
            {settings.accounting_method === 1 && (
              <CustomMultiSelect
                label='Fund Account'
                name='fund_account'
                isMulti={false}
                setFieldValue={(field_name, selectedOpts) => {
                setFieldValue(field_name, selectedOpts);
                setFieldValue('fund_account_id', selectedOpts.value);
                }}
                options={fundaccounts.filter(fa => fa.currency_id == currencyId).map(account => (
                {label: `${account.currency} ${account.general_ledger_name} ${account.branch}`, value: account.id}
                ))}
                required
              />
            )}
            <CustomInput label='Expense Name' name='expense_name' type='text' required/>
            <CustomInput label='Expense Amount' name='expense_amount' type='number' required/>
            <CustomDatePicker label='Expense Date' name='expense_date' setFieldValue={setFieldValue} required/>
            <CustomInput label='Reference' name='reference' type='text' />
            <CustomInput label='Description' name='description' type='text' />
            <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
            <div style={{display:'flex', justifyContent: 'flex-end'}}>
              <SubmitButton isSubmitting={isSubmitting}/>
            </div>
          </NonFieldErrors>
        </Form>
      )}
    </Formik>
  )
}

export default AddExpense;