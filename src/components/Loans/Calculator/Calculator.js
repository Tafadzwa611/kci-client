import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  Fetcher,
  CustomSelect,
  CustomInput,
  SubmitButton,
  CustomDatePicker,
  ButtonDefault
} from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';

function Calculator() {
  const [data, setData] = useState(null);

  const initialValues = {
    loan_product_id: '',
    principal: '',
    interest_rate: '',
    application_date: '',
    number_of_repayments: '',
    first_repayment_date: '',
    schedule_strategy: '',
    loan_duration_time_unit: '',
    fees: []
  };

  useEffect(() => {
    const schedule = document.getElementById('schedule');
    schedule.scrollIntoView({ behavior: 'smooth' });
  }, [data]);

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post('/loansapi/loan_calc_api/', values, CONFIG);
      setData(response.data);
    } catch (error) {
      console.log(error);
      if (error.message === 'Network Error') {
        actions.setErrors({responseStatus: 'Network Error'});
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({responseStatus: error.response.status, ...error.response.data});
      } else {
        actions.setErrors({responseStatus: error.response.status});
      }
    }
  }

  const onChange = (evt, setFieldValue, products) => {
    const {value} = evt.target;
    const product = products.find(prod => prod.id == value) || null;
    setFieldValue('loan_product_id', value);
    if (product) {
      setFieldValue('loan_duration_time_unit', product.loan_duration_time_unit);
      setFieldValue('schedule_strategy', product.schedule_strategy);
      setFieldValue('fees', product.fees);
    }
  }

  return (
    <>
      <Fetcher urls={['/loansapi/loan_products_list/?allowed_in_user_branch_only=1']}>
        {({data}) => (
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({isSubmitting, setFieldValue, errors, values}) => (
              <Form>
                <NonFieldErrors errors={errors}>
                  <div className='divider divider-info'>
                    <span>Loan Product</span>
                  </div>
                  <CustomSelect label='Loan Product' name='loan_product_id' onChange={(evt) => onChange(evt, setFieldValue, data[0])} required>
                    <option value=''>------</option>
                    {data[0].map(product => (
                      <option key={product.id} value={product.id}>
                        ({product.currency})-{product.name}-{product.client_type}
                      </option>
                    ))}
                  </CustomSelect>
                  <CustomInput
                    label='Principal'
                    name='principal'
                    type='number'
                    required
                  />
                  <CustomInput
                    label='Interest Rate'
                    name='interest_rate'
                    type='number'
                    required
                  />
                  <CustomDatePicker label='Application Date' name='application_date' setFieldValue={setFieldValue} required/>
                  <CustomInput
                    label='Number of Repayments'
                    name='number_of_repayments'
                    type='number'
                    required
                  />
                  <CustomDatePicker label='First Repayment Date' name='first_repayment_date' setFieldValue={setFieldValue} required/>
                  <CustomSelect label='Loan Schedule Strategy' name='schedule_strategy' required>
                    <option value=''>------</option>
                    {values.loan_duration_time_unit ?
                    scheduleStrategies[values.loan_duration_time_unit].map(strategy => <option key={strategy} value={strategy}>{strategy}</option>) :
                    null}
                  </CustomSelect>
                  <div className='divider divider-info'>
                    <span>Loan Fees</span>
                  </div>
                  {values.fees.map((fee, index) => <Fee key={index} setFieldValue={setFieldValue} fee={fee} values={values}/>)}
                  <div style={{display:'flex', justifyContent: 'flex-end'}}> 
                    <SubmitButton isSubmitting={isSubmitting}/>
                  </div>
                </NonFieldErrors>
              </Form>
            )}
          </Formik>
        )}
      </Fetcher>
      <div id='schedule'>
      {data && <LoanSchedule data={data}/>}
      </div>
    </>
  )
}

const LoanSchedule = ({data}) => {
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
        <div className= 'schedule__check__section' style={{display: 'flex', columnGap: '1rem', alignItems: 'center'}}>
          <ul style={{paddingRight:'1rem'}}>
            <li style={{marginBottom: '0.25rem'}}>Total: {data.amount_due}</li>
            <li style={{marginBottom: '0.25rem'}}>Total Principal: {data.principal_amount_due}</li>
            <li style={{marginBottom: '0.25rem'}}>Total Interest: {data.interest_amount_due}</li>
            <li style={{marginBottom: '0.25rem'}}>Total Fees: {data.total_non_deduc_fees}</li>
            <li style={{marginBottom: '0.25rem'}}>Total Capitalized Fees: {data.total_capitalized_fees}</li>
            <li style={{marginBottom: '0.25rem'}}>Maturity Date: {data.repayment_dates_sequence.at(-1)}</li>
          </ul>
        </div>
      </div>
      <div style={{overflow: 'auto', maxHeight: '600px'}} className='miniLoanDetails-container'>
        <table className='table'>
          <thead>
            <tr className='journal-details schedule__tables' style={{position: 'sticky', top: '0'}}>
              <th className='schedule__table'><b>#</b></th>
              <th className='schedule__table schedule__installment__right'>Due Date</th>
              <th className='schedule__table'>Principal Expected</th>
              <th className='schedule__table'>Interest Expected</th>
              <th className='schedule__table'>Fees Expected</th>
              <th className='schedule__table schedule__installment__right'>Total Expected</th>
            </tr>
          </thead>
          <tbody>
            {data.amortization_table.map(installment => (
              <tr key={installment.Period}>
                <td className='schedule__table schedule__installment'>{installment.Period}</td>
                <td className='schedule__table schedule__installment schedule__installment__right'>{installment.Payment_Date}</td>
                <td className='schedule__table schedule__installment schedule__installment__right'>{installment.Principal}</td>
                <td className='schedule__table schedule__installment schedule__installment__right'>{installment.Interest}</td>
                <td className='schedule__table schedule__installment schedule__installment__right'>{installment.Fees}</td>
                <td className='schedule__table schedule__installment schedule__installment__right'>{installment.Installment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function Fee({fee, setFieldValue, values}) {
  return (
    <div>
      <div>Fee Name: {fee.name}</div>
      <div>Fee Type: {fee.fee_type}</div>
      <div> Fee Payment: {fee.value} {fee.fee_calculation}</div>
      {!fee.is_mandatory ?
        <div style={{marginTop:'10px'}}>
          <ButtonDefault
            value={'Remove Fee'}
            handler={(evt) => {
              evt.preventDefault();
              const feeName = fee.fee_name;
              setFieldValue('fees', values.fees.filter(fee => fee.fee_name !== feeName));
            }}
          />
        </div> :
        null
      }
    </div>
  )
}

const scheduleStrategies = {
  'Days': ['Everyday'],
  'Weeks': ['Every Mon', 'Every Tue', 'Every Wed', 'Every Thu', 'Every Fri', 'Every Sat', 'Every Sun', 'Every Seven Days'],
  '2 Weeks': ['Same Day', 'Biweek Interval'],
  'Months': ['Same Day', 'First Day Of Next Month', 'Last Day Of Next Month', 'Monthly Interval'],
  '2 Months': ['Same Day', 'Bimonth Interval'],
  '3 Months': ['Same Day', 'Quarter Interval'],
  '4 Months': ['Same Day', 'Quadrimester Interval'],
  '6 Months': ['Same Day', 'Semi-annual Interval'],
  'Years': ['Same Day', 'Year Interval'],
  '': []
};

export default Calculator;