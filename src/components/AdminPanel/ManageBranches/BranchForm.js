import React from 'react';
import { Form, Formik } from 'formik';
import {
    NonFieldErrors,
    ButtonDefault,
    CustomInput,
    CustomDatePicker,
    SubmitButton
} from '../../../common';
import { useCurrencies } from '../../../contexts/CurrenciesContext';

function IncomeTypeForm({initialValues, validationSchema, onSubmit, back}) {
    const {currencies} = useCurrencies();

    return (
        <>
            <ButtonDefault value={'Back'} handler={back} />
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ isSubmitting, setFieldValue, errors }) => (
                <Form>
                    <NonFieldErrors errors={errors}>
                        <div className='divider divider-info'>
                            <span>Branch & Location</span>
                        </div>
                        <CustomInput label='Name' name='name' type='text' required/>
                        <CustomInput label='Geographical Location' name='geographical_location' type='text'/>
                        <CustomInput label='Branch Code' name='branch_code' type='text' required/>
                        <CustomDatePicker label='Date of Opening' name='date_of_opening' setFieldValue={setFieldValue} required/>
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

export default IncomeTypeForm;