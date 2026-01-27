import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useBranches } from '../../../../contexts/BranchesContext';
import { Form, Formik } from 'formik';
import { removeEmptyValues } from '../../../../utils/utils';
import {
  CustomInput,
  CustomMultiSelect,
  SubmitButton
} from '../../../../common';


function EditExpenseType() {
  const params = useParams();
  const { branches } = useBranches();
  const [et, setEt] = React.useState(null);
  const [payableAccs, setPayableAccs] = React.useState(null);
  const [expenseAccs, setExpenseAccs] = React.useState(null);
  const [expenseSettings, setExpenseSettings] = React.useState(null);

  React.useEffect(() => {
    document.title = 'Edit Expense Type - Admin Panel';
  }, []);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('/expensesapi/expense_settings/');
      setExpenseSettings(response.data);
    }
    fetch();
  }, []);

  React.useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await axios.get(`/expensesapi/expensetypes/${params.typeId}/`);
        setEt(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSettings();
  }, []);

  React.useEffect(() => {
    async function fetchAccounts() {
      if (!et) return;
      try {
        const response = await axios.get(`/acc-api/sub_accounts_api/?page_num=1&currency_id=${et.currency_id}&show_ib=0&account_type=EXPENSE`);
        setExpenseAccs(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAccounts();
  }, [JSON.stringify(et)]);

  React.useEffect(() => {
    async function fetchAccounts() {
      if (!et) return;
      try {
        const response = await axios.get(`/acc-api/sub_accounts_api/?page_num=1&currency_id=${et.currency_id}&show_ib=0&account_type=LIABILITY`);
        setPayableAccs(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAccounts();
  }, [JSON.stringify(et)]);

  if (!et || !expenseAccs || !payableAccs) {
    return <div>Loading...</div>
  }

  const accountOption = (a) =>
  a && {
    value: a.id,
    label: `${a.general_ledger_code} - ${a.general_ledger_name}`,
  };

  const branchOption = ({ id, name }) => ({
    value: id,
    label: name,
  });

  const onSubmit = async (values, actions) => {
    console.log(values);
  }

  const initialValues = {
    name: et.name,
    currency_id: et.currency_id,
    branches: branches.filter(branch => et.branch_ids.includes(branch.id)).map(branch => branchOption(branch)),
    expense_account: accountOption(et.expense_account),
    payable_account: accountOption(et.payable_account),
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting, errors, values, setFieldValue }) => (
        <Form>
          <div className='divider divider-info'>
            <span>Expense Type Information</span>
          </div>
          <CustomInput label='Name' name='name' type='text' required/>
          <CustomMultiSelect
            label='Branches'
            name='branches'
            initVals={values.branches}
            options={branches.map(branch => ({value: branch.id, label: branch.name}))}
            setFieldValue={setFieldValue}
          />
          <CustomMultiSelect
            label='Expense Account'
            name='expense_account'
            initVals={values.expense_account}
            isMulti={false}
            setFieldValue={setFieldValue}
            options={expenseAccs.accounts.map(account => (
              {label: `${account.general_ledger_name} - ${account.general_ledger_code}`, value: account.id}
            ))}
            required
          />
          {expenseSettings.accounting_method === 2 && (
            <CustomMultiSelect
              label='Payable Account'
              name='payable_account'
              initVals={values.payable_account}
              isMulti={false}
              setFieldValue={setFieldValue}
              options={payableAccs.accounts.map(account => (
              {label: `${account.general_ledger_name} - ${account.general_ledger_code}`, value: account.id}
              ))}
              required
            />
          )}
          <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
          <div style={{display:'flex', justifyContent: 'flex-end'}}> 
            <SubmitButton isSubmitting={isSubmitting}/>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default EditExpenseType;