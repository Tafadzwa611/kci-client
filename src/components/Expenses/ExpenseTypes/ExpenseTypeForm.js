import React from 'react';
import { Form, Formik } from 'formik';
import {
    NonFieldErrors,
    ButtonDefault,
    CustomInput,
    CustomDatePicker,
    CustomSelect,
    CustomCheckbox,
    SubmitButton
} from '../../../common';
import { useCurrencies } from '../../../contexts/CurrenciesContext';

function ExpenseTypeForm({initialValues, validationSchema, onSubmit, back}) {
    const {currencies} = useCurrencies();

    return (
        <>
            <ButtonDefault value={'Back'} handler={back} />
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ isSubmitting, setFieldValue, errors }) => (
                <Form>
                    <NonFieldErrors errors={errors}>
                        <div className='divider divider-info'>
                            <span>Name & Currency</span>
                        </div>
                        <CustomInput label='Name' name='name' type='text' required/>
                            <CustomDatePicker label='Date of Account' name='date_of_account' setFieldValue={setFieldValue} required/>
                        <CustomSelect label='Currency' name='currency_id' required>
                            <option value=''>------</option>
                            {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                        </CustomSelect>
                        <CustomCheckbox label='Is Active' name='is_active'/>
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

export default ExpenseTypeForm;