import React from 'react';
import { Form, Formik } from 'formik';
import {
  CustomCheckbox,
  NonFieldErrors,
  ButtonDefault,
  CustomInput,
  SubmitButton
} from '../../../../common';

function CategoryForm({initialValues, validationSchema, onSubmit, back}) {
  return (
    <>
      <ButtonDefault value={'Back'} handler={back} />
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='divider divider-info'>
                <span>Name & Status</span>
              </div>
              <CustomInput label='Name' name='name' type='text' required/>
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

export default CategoryForm;