import React from 'react';
import { Form, Formik } from 'formik';
import {
  CustomInput,
  NonFieldErrors,
  SubmitButton,
  CustomSelect,
  CustomDatePicker
} from '../../../common';
import { useBranches } from '../../../contexts/BranchesContext';
import { useCurrencies } from '../../../contexts/CurrenciesContext';

function IncomeForm({incometypes, fundaccounts, initialValues, validationSchema, onSubmit}) {
    const [currencyId, seCurrencyId] = React.useState('');
    const [branchId, seBranchId] = React.useState('');
    const onChange = (setFieldValue, newValue) => {
        setFieldValue('income_type_id', newValue);
        const inc_type = incometypes.find(inc => inc.id == newValue);
        seCurrencyId(inc_type.currency_id);
        seBranchId(inc_type.branch_id);
    }
    const newFundAccountArray = fundaccounts.filter(fa => fa.currency_id === currencyId && fa.branch_id === branchId);

    const { branches } = useBranches();
    const branchMap = branches.reduce((acc, branch) => {
        acc[branch.id] = branch.name;
        return acc;
    }, {});

    const { currencies } = useCurrencies();
    const currencyMap = currencies.reduce((acc, currency) => {
        acc[currency.id] = currency.shortname;
        return acc;
    }, {});

    return (
        <>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ isSubmitting, errors, setFieldValue }) => (
                <Form>
                    <NonFieldErrors errors={errors}>
                        <div className='divider divider-info'>
                            <span>Other Income Information</span>
                        </div>
                        <CustomSelect label='Other Income Type' name='income_type_id' onChange={evt => onChange(setFieldValue, evt.target.value)} required>
                            <option value=''>------</option>
                            {incometypes.filter(type => type.is_active).map(type => (
                                <option key={type.id} value={type.id}>
                                    {currencyMap[type.currency_id]} {type.name} {branchMap[type.branch_id]}
                                </option>
                            ))}
                        </CustomSelect>
                        <CustomSelect label='Fund Account' name='fund_account_id' required>
                            <option value=''>------</option>
                            {newFundAccountArray.map(account => (
                                <option key={account.id} value={account.id}>
                                    {account.currency} {account.general_ledger_name} {account.branch}
                                </option>
                            ))}
                        </CustomSelect>
                        <CustomInput label='Other Income Name' name='otherincome_name' type='text' required/>
                        <CustomInput label='Other Income Amount' name='income_amount' type='number' required/>
                        <CustomDatePicker label='Other Income Date' name='income_date' setFieldValue={setFieldValue} required/>
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

export default IncomeForm;