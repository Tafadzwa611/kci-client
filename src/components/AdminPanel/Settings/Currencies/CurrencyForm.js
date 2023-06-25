import React from 'react';
import { Form, Formik } from 'formik';
import {
    CustomDatePicker,
    NonFieldErrors,
    ButtonDefault,
    CustomInput,
    SubmitButton
} from '../../../../common';

function CurrencyForm({initialValues, validationSchema, onSubmit, back}) {
  return (
    <>
      <ButtonDefault value={'Back'} handler={back} />
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, setFieldValue, errors }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='divider divider-info'>
                <span>Name</span>
              </div>
              <CustomInput label='Fullname' name='fullname' type='text' required/>
              <CustomInput label='Shortname' name='shortname' type='text' required/>
              <CustomDatePicker label='Date Created' name='date_created'  setFieldValue={setFieldValue} required/>
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

export default CurrencyForm;