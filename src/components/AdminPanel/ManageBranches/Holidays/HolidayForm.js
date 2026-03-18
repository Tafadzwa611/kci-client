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

function HolidayForm({ initialValues, onSubmit, back }) {
  const { branches } = useBranches();
  const selectBranches = branches.map(br => ({ label: br.name, value: br.id }));

  return (
    <div className='sf-page'>
      <div style={{ marginBottom: 12 }}>
        <ButtonDefault value={'Back'} handler={back} />
      </div>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, errors, setFieldValue, values }) => (
          <Form autoComplete='off' className='sf-form'>
            <NonFieldErrors errors={errors}>
              <div className='sf-shell'>
                <div className='sf-shell-head'>
                  <div className='sf-shell-title'>Holiday</div>
                  <div className='sf-shell-subtitle'>
                    Capture holiday details, select the holiday date, assign branches, and mark whether it recurs.
                  </div>
                </div>

                <div className='sf-shell-body'>
                  <section className='sf-section'>
                    <div className='sf-section-head'>
                      <div className='sf-section-title'>Holiday information</div>
                      <div className='sf-section-hint'>
                        Enter the holiday name, choose the date, assign branches, and set recurrence if needed.
                      </div>
                    </div>

                    <div className='sf-section-body sf-stack'>
                      <CustomInput label='Name' name='description' type='text' required />

                      <CustomDatePicker
                        label='Holiday Date'
                        name='holiday_date'
                        setFieldValue={setFieldValue}
                        required
                      />

                      <CustomMultiSelect
                        label='Branches'
                        name='branch_ids'
                        options={selectBranches}
                        setFieldValue={setFieldValue}
                        initVals={selectBranches.filter(br => values.branch_ids.includes(br.value))}
                      />

                      <CustomCheckbox label='Is Recurring' name='recurring' />
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

export default HolidayForm;