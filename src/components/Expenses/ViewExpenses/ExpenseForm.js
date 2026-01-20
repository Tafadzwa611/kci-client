import React, {useState} from 'react';
import { Form, Formik } from 'formik';
import {
  CustomMultiSelect,
  CustomInput,
  NonFieldErrors,
  SubmitButton,
  CustomDatePicker
} from '../../../common';

function ExpenseForm({expensetypes, fundaccounts, initialValues, validationSchema, onSubmit}) {
  const [currencyId, seCurrencyId] = useState('');

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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

export default ExpenseForm;