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
import { useCurrencies } from '../../../../contexts/CurrenciesContext';

function CategoryForm({initialValues, onSubmit, back}) {
  const feeTypes = ['Deducted', 'Capitalized', 'Upfront Disbursement', 'Payment due', 'Manual fees'];
  const feePayments = ['Flat', 'Flat/Installments', '% Of DB Amount', '% Of DB Amount/Installments'];
  const {currencies} = useCurrencies();

  return (
    <>
      <ButtonDefault value={'Back'} handler={back} />
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='divider divider-info'>
                <span>Fee Info</span>
              </div>
              <CustomInput label='Name' name='name' type='text' required/>
              <CustomSelect label='Type' name='fee_type' required>
                <option value=''>------</option>
                {feeTypes.map(feeType => <option key={feeType} value={feeType}>{feeType}</option>)}
              </CustomSelect>
              <CustomSelect label='Fee Payment' name='fee_calculation' required>
                <option value=''>------</option>
                {feePayments.map(feePayment => <option key={feePayment} value={feePayment}>{feePayment}</option>)}
              </CustomSelect>
              <CustomSelect label='Currency' name='currency_id' required>
                <option value=''>------</option>
                {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
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

export default CategoryForm;