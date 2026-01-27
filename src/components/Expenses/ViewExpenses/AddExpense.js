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
import { useBranches } from '../../../contexts/BranchesContext';


function AddExpense({expensetypes, fundaccounts}) {
  const [currencyId, setCurrencyId] = React.useState('');
  const [settings, setSettings] = React.useState(null);
  const navigate = useNavigate();
  const {branches} = useBranches();

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
    expense_type: '',
    expense_name: '',
    expense_amount: '',
    expense_date: '',
    expense_branch: '',
    reference: '',
    description: '',
    fund_account_id: '',
    branch: ''
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
      {({ isSubmitting, errors, values, setFieldValue }) => (
        <Form>
            <div className='divider divider-info'><span>Expense Information</span></div>
            <CustomMultiSelect
              label='Expense Branch'
              name='expense_branch'
              isMulti={false}
              options={branches.map(branch => ({value: branch.id, label: branch.name}))}
              required
              setFieldValue={(field_name, selectedOpts) => {
                setFieldValue('expense_type', '');
                setFieldValue('expense_type_id', '');
                setFieldValue(field_name, selectedOpts);
              }}
            />
            <CustomMultiSelect
              label='Expense Type'
              name='expense_type'
              isMulti={false}
              setFieldValue={(field_name, selectedOpts) => {
                setFieldValue(field_name, selectedOpts);
                setFieldValue('expense_type_id', selectedOpts?.value);
                const exp_type = expensetypes.find(et => et.id == selectedOpts?.value);
                setCurrencyId(exp_type?.currency_id);
              }}
              options={expensetypes.filter(type => type.branch_id === values.expense_branch?.value).map(type => (
                {label: `${type.currency_shortname} ${type.name} ${type.branch_name}`, value: type.id}
              ))}
              required
            />
            {settings.accounting_method === 1 && (
              <>
                <CustomMultiSelect
                  label='Fund Branch'
                  name='fund_branch'
                  isMulti={false}
                  options={branches.map(branch => ({value: branch.id, label: branch.name}))}
                  required
                  setFieldValue={(field_name, selectedOpts) => {
                    setFieldValue(field_name, selectedOpts);
                    setFieldValue('fund_account', '');
                    setFieldValue('fund_account_id', '');
                  }}
                />
                <CustomMultiSelect
                  label='Fund Account'
                  name='fund_account'
                  isMulti={false}
                  setFieldValue={(field_name, selectedOpts) => {
                    setFieldValue(field_name, selectedOpts);
                    setFieldValue('fund_account_id', selectedOpts.value);
                  }}
                  options={fundaccounts.filter(fa => fa.currency_id == currencyId && fa.branch_id == values.fund_branch?.value).map(account => (
                    {label: `${account.currency} ${account.general_ledger_name} ${account.branch}`, value: account.id}
                  ))}
                  required
                />
              </>
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
            <NonFieldErrors errors={errors}/>
        </Form>
      )}
    </Formik>
  )
}

export default AddExpense;