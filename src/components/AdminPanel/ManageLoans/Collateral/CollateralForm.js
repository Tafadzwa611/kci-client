import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  ButtonDefault,
  CustomInput,
  SubmitButton
} from '../../../../common';

function FeeForm({ initialValues, onSubmit, back }) {
  return (
    <div className='sf-page'>
      <div style={{ marginBottom: 12 }}>
        <ButtonDefault value={'Back'} handler={back} />
      </div>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form className='sf-form'>
            <NonFieldErrors errors={errors}>
              <div className='sf-shell'>
                <div className='sf-shell-head'>
                  <div className='sf-shell-title'>Fee</div>
                  <div className='sf-shell-subtitle'>
                    Enter the fee details below and save when finished.
                  </div>
                </div>

                <div className='sf-shell-body'>
                  <section className='sf-section'>
                    <div className='sf-section-head'>
                      <div className='sf-section-title'>Fee information</div>
                      <div className='sf-section-hint'>
                        Provide the basic information required for this fee record.
                      </div>
                    </div>

                    <div className='sf-section-body sf-stack'>
                      <CustomInput label='Name' name='name' type='text' required />
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

export default FeeForm;