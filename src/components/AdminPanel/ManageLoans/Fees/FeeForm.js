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
const FEE_TYPES = ['Deducted', 'Capitalized', 'Upfront Disbursement', 'Payment due', 'Manual fees', 'Installment fees'];

function FeeForm({initialValues, onSubmit, back}) {
  return (
    <>
      <ButtonDefault value={'Back'} handler={back} />
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, errors, values }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='divider divider-info'>
                <span>Fee Info</span>
              </div>
              <CustomInput label='Name' name='name' type='text' required/>
              <CustomSelect label='Type' name='fee_type' required>
                <option value=''>------</option>
                {FEE_TYPES.map(feeType => <option key={feeType} value={feeType}>{feeType}</option>)}
              </CustomSelect>
              <CustomSelect label='Fee Payment' name='fee_calculation' required>
                <option value=''>------</option>
                {FEE_TYPES_AND_PAYMENTS[values.fee_type].map(feePayment => <option key={feePayment} value={feePayment}>{feePayment}</option>)}
              </CustomSelect>
              <CustomCheckbox label='Is Mandatory' name='is_mandatory'/>
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

export default FeeForm;