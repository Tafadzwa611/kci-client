import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomSelect,
  CustomInput,
  CustomDatePicker,
  CustomSelectRemote,
  SubmitButton
} from '../../../common';
import { scheduleStrategies } from './data';
import Fee from './Fee';

function ClientForm({product}) {
  const initialValues = {
    loan_product_id: product.id,
    client_id: '',
    principal: '',
    interest_rate: '',
    application_date: '',
    number_of_repayments: '',
    first_repayment_date: '',
    schedule_strategy: product.schedule_strategy,
    reason_for_loan: '',
    fees: product.fees.map(fee => ({fee_name: fee.fee_name, value: fee.value})),
    files: []
  };

  const onSubmit = (values, actions) => {
    console.log(values);
    console.log(actions);
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({isSubmitting, setFieldValue, errors, values}) => (
        <Form>
          <NonFieldErrors errors={errors}>
            <div className='divider divider-info'>
              <span>Loan Details</span>
            </div>
            <CustomSelectRemote
              label='Client'
              url='/clientsapi/search_client/'
              setFieldValue={setFieldValue}
              queryParamName='query'
              placeholder='Search Client'
              name='client_id'
              required
            />
            <CustomInput label='Principal' name='principal' type='number' required/>
            <small><em>Minimum = {product.minimum_principal_amount} Maximum = {product.maximum_principal_amount}</em></small>
            <CustomInput label='Interest Rate' name='interest_rate' type='number' required/>
            <small><em>Minimum = {product.minimum_interest_rate} Maximum = {product.maximum_interest_rate}</em></small>
            <CustomDatePicker label='Application Date' name='application_date' setFieldValue={setFieldValue} required/>
            <CustomInput label='Number of Repayments' name='number_of_repayments' type='number' required/>
            <small><em>Minimum = {product.minimum_loan_duration} Maximum = {product.maximum_loan_duration}</em></small>
            <CustomDatePicker label='First Repayment Date' name='first_repayment_date' setFieldValue={setFieldValue} required/>
            <CustomSelect label='Default Loan Schedule Strategy' name='schedule_strategy' required>
              <option value=''>------</option>
              {scheduleStrategies[product.loan_duration_time_unit].map(strategy => <option key={strategy} value={strategy}>{strategy}</option>)}
            </CustomSelect>
            <CustomSelect label='Reason For Loan' name='reason_for_loan' required>
              <option value=''>------</option>
              <option value='CONSUMER'>CONSUMER</option>
              <option value='COMMERCIAL - Agriculture'>COMMERCIAL - Agriculture</option>
              <option value='COMMERCIAL - Manufacturing'>COMMERCIAL - Manufacturing</option>
              <option value='COMMERCIAL - Mining'>COMMERCIAL - Mining</option>
              <option value='COMMERCIAL - Housing'>COMMERCIAL - Housing</option>
              <option value='COMMERCIAL - Distribution & Services'>COMMERCIAL - Distribution & Services</option>
              <option value='COMMERCIAL - Retail'>COMMERCIAL - Retail</option>
              <option value='COMMERCIAL - Transport'>COMMERCIAL - Transport</option>
              <option value='COMMERCIAL - Health'>COMMERCIAL - Health</option>
              <option value='COMMERCIAL - Education'>COMMERCIAL - Education</option>
              <option value='COMMERCIAL - Cross Border Traders'>COMMERCIAL - Cross Border Traders</option>
              <option value='COMMERCIAL - Construction'>COMMERCIAL - Construction</option>
              <option value='COMMERCIAL - Vendors'>COMMERCIAL - Vendors</option>
              <option value='OTHER'>OTHER</option>
            </CustomSelect>
            <div className='divider divider-info'>
              <span>Loan Fees</span>
            </div>
            {product.fees.map((fee, index) => <Fee key={index} setFieldValue={setFieldValue} fee={fee} values={values}/>)}
            <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
            <div style={{display:'flex', justifyContent: 'flex-end'}}> 
              <SubmitButton isSubmitting={isSubmitting}/>
            </div>
          </NonFieldErrors>
        </Form>
      )}
    </Formik>
  )
}

export default ClientForm;