import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  ButtonDefault,
  CustomInput,
  SubmitButton,
  CustomSelect,
  CustomCheckbox
} from '../../../../common';
import { useBranches } from '../../../../contexts/BranchesContext';

function UnitForm({initialValues, onSubmit, back}) {
  const {branches} = useBranches();

  return (
    <>
      <ButtonDefault value={'Back'} handler={back} />
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='divider divider-info'>
                <span>Holiday Info</span>
              </div>
              <CustomInput label='Name' name='name' type='text' required/>
              <CustomSelect label='Branch' name='branch_id' required>
                {branches.map(br => <option key={br.id} value={br.id}>{br.name}</option>)}
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

export default UnitForm;