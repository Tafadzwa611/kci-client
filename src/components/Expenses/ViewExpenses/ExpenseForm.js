import React, {useState} from 'react';
import { Form, Formik } from 'formik';
import {
  CustomInput,
  NonFieldErrors,
  SubmitButton,
  CustomSelect,
  CustomDatePicker,
  CustomSelectRemote
} from '../../../common';

function ExpenseForm({expensetypes, fundaccounts, initialValues, validationSchema, onSubmit}) {
    const [currencyId, seCurrencyId] = useState('');
    const onChange = (setFieldValue, newValue) => {
        setFieldValue('expense_type_id', newValue);
        const exp_type = expensetypes.find(et => et.id == newValue);
        seCurrencyId(exp_type.currency_id)
    }
    const newFundAccountArray = fundaccounts.filter(fa => fa.currency ==  currencyId);

    return (
        <>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ isSubmitting, errors, setFieldValue, values }) => (
                <Form>
                    <NonFieldErrors errors={errors}>
                        <div className='divider divider-info'>
                            <span>Expense Information</span>
                        </div>
                        <CustomSelect 
                            label='Expense Type' 
                            name='expense_type_id'  
                            onChange={evt => onChange(setFieldValue, evt.target.value)}
                            required
                        >
                            <option value=''>------</option>
                            {expensetypes.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
                        </CustomSelect>
                        <CustomSelect label='Fund Account' name='fund_account_id' required>
                            <option value=''>------</option>
                            {newFundAccountArray.map(account => <option key={account.id} value={account.id}>{account.general_ledger_name}</option>)}
                        </CustomSelect>
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
        </>
    )
}

export default ExpenseForm;