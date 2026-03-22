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

function UnitForm({ initialValues, onSubmit, back }) {
  const { branches } = useBranches();

  return (
    <div className='sf-page'>
      <div style={{ marginBottom: 12 }}>
        <ButtonDefault value={'Back'} handler={back} />
      </div>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form autoComplete='off' className='sf-form'>
            <NonFieldErrors errors={errors}>
              <div className='sf-shell'>
                <div className='sf-shell-head'>
                  <div className='sf-shell-title'>Unit</div>
                  <div className='sf-shell-subtitle'>
                    Capture the unit details, assign it to a branch, and set whether it is active.
                  </div>
                </div>

                <div className='sf-shell-body'>
                  <section className='sf-section'>
                    <div className='sf-section-head'>
                      <div className='sf-section-title'>Unit information</div>
                      <div className='sf-section-hint'>
                        Enter the unit name, choose its branch, and update its active status.
                      </div>
                    </div>

                    <div className='sf-section-body sf-stack'>
                      <CustomInput label='Name' name='name' type='text' required />

                      <CustomSelect label='Branch' name='branch_id' required>
                        {branches.map(br => (
                          <option key={br.id} value={br.id}>
                            {br.name}
                          </option>
                        ))}
                      </CustomSelect>

                      <CustomCheckbox label='Is Active' name='is_active' />
                    </div>
                  </section>
                </div>

                <div className='sf-shell-footer'>
                  <SubmitButton isSubmitting={isSubmitting} />
                </div>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UnitForm;