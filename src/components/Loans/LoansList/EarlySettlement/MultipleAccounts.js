import React from 'react';
import { Form, Formik } from 'formik';
import {
  ModalSubmit,
  NonFieldErrors,
  CustomDatePicker,
  CustomSelect,
  CustomInput,
  ButtonSuccess,
  ButtonDefault
} from '../../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { updateLoanList } from './utils';

function MultipleAccounts({data, loan, setLoan, interestDate, setInterestDate, setOpen, setLoanData}) {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post(`/loansapi/early_settlement/${loan.id}/`, values, CONFIG);
      const newLoan = response.data;
      setLoan(newLoan);
      setOpen(false);
      if (setLoanData) {
        updateLoanList(newLoan, setLoanData);
      }
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
  };

  const initialValues = {
    date_of_settlement: interestDate,
    amount_paid_list: [{'cash_account_id': '', 'amount': '', 'component': ''}]
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, errors, isSubmitting, setFieldValue }) => (
        <Form>
          <NonFieldErrors errors={errors}>
            <div className='create_modal_container'>
              <div>
                <div style={{display:'grid', rowGap:'0.25rem'}}>
                  <div>Principal Balance: {loan.principal_amount_due}</div>
                  <div>Fees Balance: {loan.non_deductable_fees}</div>
                  <div>Penalty Balance: {loan.penalty}</div>
                  <div>Interest Balance Until Next Installment {data[1].next_installment_date}: {data[1].interest_until_next_installment}</div>
                  <div>Daily Pro Rata Interest: {data[1].pro_rata_interest}</div>
                  <div>Daily Pro Rata Interest Balance: {data[1].pro_rata_interest_balance}</div>
                </div>
                <CustomDatePicker
                  label='Early Settlement'
                  name='date_of_settlement'
                  required
                  setFieldValue={(field, value) => {
                    setFieldValue(field, value);
                    setInterestDate(value);
                  }}
                />
                {values.amount_paid_list.map((amount, index) => (
                  <Component
                    key={index}
                    index={index}
                    currencyId={loan.currency_id}
                    amount={amount}
                    currencies={data[0]}
                    amount_paid_list={values.amount_paid_list}
                    setFieldValue={setFieldValue}
                  />
                ))}
                <AddComponent amount_paid_list={values.amount_paid_list} setFieldValue={setFieldValue}/>
              </div>
              <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
            </div>
          </NonFieldErrors>
        </Form>
      )}
    </Formik>
  )
}

const Component = ({currencies, index, currencyId, amount_paid_list, setFieldValue}) => {
  const remove = (evt) => {
    evt.preventDefault();
    setFieldValue('amount_paid_list', amount_paid_list.filter((_, idx) => index !== idx));
  }

  return (
    <>
      <CustomSelect label='Component' name={`amount_paid_list[${index}].component`} required>
        <option value=''>------</option>
        <option value='principal'>Principal</option>
        <option value='interest'>Interest</option>
        <option value='penalty'>Penalty</option>
        <option value='fees'>Fees</option>
      </CustomSelect>
      <CustomSelect label='Fund Account' name={`amount_paid_list[${index}].cash_account_id`} required>
        <option value=''>------</option>
        {currencies.filter(acc => acc.currency_id == currencyId).map(acc => <option key={acc.id} value={acc.id}>{acc.general_ledger_name}</option>)}
      </CustomSelect>
      <CustomInput label='Amount Paid' name={`amount_paid_list[${index}].amount`} type='number' required/>
      {index !== 0 && 
      <div style={{marginTop:'10px'}}>
        <ButtonDefault value={'Remove Amount'} handler={remove}/>
      </div>}
      <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
    </>
  )
}

function AddComponent({setFieldValue, amount_paid_list}) {
  const add = (evt) => {
    evt.preventDefault();
    const component = {'cash_account_id': '', 'amount': '', 'component': ''};
    setFieldValue('amount_paid_list', [...amount_paid_list, component]);
  }

  return (
    <div style={{marginTop:'10px'}}>
      <ButtonSuccess value={'Add Amount'} handler={(evt) => add(evt)} />
    </div>
  )
}

export default MultipleAccounts;