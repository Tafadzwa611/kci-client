import React from 'react';
import { Form, Formik } from 'formik';
import {
  ModalSubmit,
  NonFieldErrors,
  CustomDatePicker,
  CustomSelect,
  CustomInput
} from '../../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { updateLoanList } from './utils';

function SingleAccount({loan, interestDate, setLoan, setOpen, setInterestDate, data, setLoanData}) {
  const onSubmit = async (values, actions) => {
    try {
      const payload = {
        'date_of_settlement': values.date_of_settlement,
        'amount_paid_list': [
            {'cash_account_id': values.cash_account_id, 'amount': values.principal_amount_paid, 'component': 'principal'},
            {'cash_account_id': values.cash_account_id, 'amount': values.interest_amount_paid, 'component': 'interest'},
            {'cash_account_id': values.cash_account_id, 'amount': values.penalty_amount_paid, 'component': 'penalty'},
            {'cash_account_id': values.cash_account_id, 'amount': values.fees_amount_paid, 'component': 'fees'},
        ]
      }
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post(`/loansapi/early_settlement/${loan.id}/`, payload, CONFIG);
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
  }

  const initialValues = {
    date_of_settlement: interestDate,
    cash_account_id: '',
    principal_amount_paid: loan.principal_amount_due,
    interest_amount_paid: '',
    fees_amount_paid: '',
    penalty_amount_paid: '',
    use_multi_accounts: false,
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ errors, isSubmitting, setFieldValue }) => (
        <Form>
          <NonFieldErrors errors={errors}>
            <div className='create_modal_container'>
              <div>
                <CustomDatePicker
                  label='Early Settlement'
                  name='date_of_settlement'
                  required
                  setFieldValue={(field, value) => {
                    setFieldValue(field, value);
                    setInterestDate(value);
                  }}
                />
                <CustomInput label='Principal Amount Paid' name='principal_amount_paid' type='number' required disabled/>
                <CustomInput label='Interest Amount Paid' name='interest_amount_paid' type='number' required/>
                <div style={{marginTop:'1.5rem' ,display:'flex', flexDirection:'column', rowGap:'0.25rem'}}>
                  <div>Interest Balance Until Next Installment {data[1].next_installment_date}: {data[1].interest_until_next_installment}</div>
                  <div>Daily Pro Rata Interest: {data[1].pro_rata_interest}</div>
                  <div>Daily Pro Rata Interest Balance: {data[1].pro_rata_interest_balance}</div>
                </div>
                <CustomInput label='Fees Amount Paid' name='fees_amount_paid' type='number' required/>
                <CustomInput label='Penalty Amount Paid' name='penalty_amount_paid' type='number' required/>
                <CustomSelect label='Fund Account' name='cash_account_id' required>
                  <option value=''>------</option>
                  {data[0].filter(acc => acc.currency_id == loan.currency_id).map(acc => <option key={acc.id} value={acc.id}>{acc.general_ledger_name}</option>)}
                </CustomSelect>
              </div>
              <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
            </div>
          </NonFieldErrors>
        </Form>
      )}
    </Formik>
  )
}

export default SingleAccount;