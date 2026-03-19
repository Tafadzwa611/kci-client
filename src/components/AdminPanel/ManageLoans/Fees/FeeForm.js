import React from 'react';
import { Form, Formik } from 'formik';
import {
  CustomCheckbox,
  CustomSelect,
  NonFieldErrors,
  ButtonDefault,
  CustomInput,
  SubmitButton
} from '../../../../common';

const PAYMENTS_1 = ['Flat', '% Of DB Amount'];
const PAYMENTS_2 = ['Flat', 'Flat/Installments', '% Of DB Amount', '% Of DB Amount/Installments'];
const PAYMENTS_3 = ['% Of Installment'];

const FEE_TYPES_AND_PAYMENTS = {
  '': [],
  'Deducted': PAYMENTS_1,
  'Capitalized': PAYMENTS_1,
  'Upfront Disbursement': PAYMENTS_1,
  'Manual fees': PAYMENTS_1,
  'Payment due': PAYMENTS_2,
  'Installment fees': PAYMENTS_3,
};

const FEE_TYPES = [
  'Deducted',
  'Capitalized',
  'Upfront Disbursement',
  'Payment due',
  'Manual fees',
  'Installment fees'
];

function FeeForm({ initialValues, onSubmit, back }) {
  return (
    <div className='sf-page'>
      <div style={{ marginBottom: 12 }}>
        <ButtonDefault value={'Back'} handler={back} />
      </div>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, errors, values }) => (
          <Form className='sf-form'>
            <NonFieldErrors errors={errors}>
              <div className='sf-shell'>
                <div className='sf-shell-head'>
                  <div className='sf-shell-title'>Fee</div>
                  <div className='sf-shell-subtitle'>
                    Configure the fee details, select the fee type, and choose how the fee should be calculated.
                  </div>
                </div>

                <div className='sf-shell-body'>
                  <section className='sf-section'>
                    <div className='sf-section-head'>
                      <div className='sf-section-title'>Fee information</div>
                      <div className='sf-section-hint'>
                        Enter the fee name, type, payment calculation method, and whether the fee is mandatory.
                      </div>
                    </div>

                    <div className='sf-section-body sf-stack'>
                      <CustomInput label='Name' name='name' type='text' required />

                      <CustomSelect label='Type' name='fee_type' required>
                        <option value=''>------</option>
                        {FEE_TYPES.map(feeType => (
                          <option key={feeType} value={feeType}>
                            {feeType}
                          </option>
                        ))}
                      </CustomSelect>

                      <CustomSelect label='Fee Payment' name='fee_calculation' required>
                        <option value=''>------</option>
                        {FEE_TYPES_AND_PAYMENTS[values.fee_type].map(feePayment => (
                          <option key={feePayment} value={feePayment}>
                            {feePayment}
                          </option>
                        ))}
                      </CustomSelect>

                      <CustomCheckbox label='Is Mandatory' name='is_mandatory' />
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