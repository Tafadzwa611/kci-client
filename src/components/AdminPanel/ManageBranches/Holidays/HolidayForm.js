import React from 'react';
import { Form, Formik } from 'formik';
import {
  CustomCheckbox,
  CustomDatePicker,
  CustomMultiSelect,
  NonFieldErrors,
  ButtonDefault,
  CustomInput,
  SubmitButton
} from '../../../../common';
import { useBranches } from '../../../../contexts/BranchesContext';

function HolidayForm({initialValues, onSubmit, back}) {
  const {branches} = useBranches();
  const selectBranches = branches.map(br => ({label: br.name, value:br.id}));

  return (
    <>
      <ButtonDefault value={'Back'} handler={back} />
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, errors, setFieldValue, values }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='divider divider-info'>
                <span>Holiday Info</span>
              </div>
              <CustomInput label='Name' name='description' type='text' required/>
              <CustomDatePicker label='Holiday Date' name='holiday_date' setFieldValue={setFieldValue} required/>
              <CustomMultiSelect
                label='Branches'
                name='branch_ids'
                options={selectBranches}
                setFieldValue={setFieldValue}
                initVals={selectBranches.filter(br => values.branch_ids.includes(br.value))}
              />
              <CustomCheckbox label='Is Recurring' name='recurring'/>
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

export default HolidayForm;