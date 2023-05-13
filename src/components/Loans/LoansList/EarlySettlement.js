import React, { useState } from 'react';
import {
  Modal,
  ModalSubmit,
  NonFieldErrors,
  CustomDatePicker,
  CustomSelect,
  CustomInput,
  Fetcher
} from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Formik } from 'formik';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';

function EarlySettlement({setLoan, setOpen, loanId, currencyId}) {
  const {loggedInUser} = useLoggedInUser();
  const today = new Date();
  const dt = loggedInUser.date_format.replace('dd', today.getDate()).replace('mm', today.getMonth()+1).replace('yyyy', today.getFullYear());
  const [interestDate, setInterestDate] = useState(dt);

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post(`/loansapi/early_settlement/${loanId}/`, values, CONFIG);
      setLoan(response.data);
      setOpen(false);
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

  const initialValues ={
    date_of_settlement: interestDate,
    cash_account_id: '',
    interest_amount_paid: '',
    fees_amount_paid: '',
    penalty_amount_paid: '',
  };

  return (
    <Modal open={true} setOpen={setOpen} title={'Early Settlement'}>
      <Fetcher urls={['/acc-api/cash-and-cash-equivalents/', `/loansapi/pro_rata_data/${loanId}/?interest_date=${interestDate}`]}>
        {({data}) => (
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ errors, isSubmitting, setFieldValue }) => (
              <Form>
                <NonFieldErrors errors={errors}>
                  <div className='create_modal_container'>
                    <div>
                      <CustomDatePicker
                        label='Early Settlement'
                        name='date_of_settlement'
                        setFieldValue={(field, value) => {
                          setFieldValue(field, value);
                          setInterestDate(value);
                        }}
                        required
                      />
                      <CustomInput
                        label='Interest Amount Paid'
                        name='interest_amount_paid'
                        type='number'
                        required
                      />
                      <div>Pro Rata Interest: {data[1].pro_rata_interest}</div>
                      <div>Pro Rata Interest Balance: {data[1].pro_rata_interest_balance}</div>
                      <CustomInput
                        label='Fees Amount Paid'
                        name='fees_amount_paid'
                        type='number'
                        required
                      />
                      <CustomInput
                        label='Penalty Amount Paid'
                        name='penalty_amount_paid'
                        type='number'
                        required
                      />
                      <CustomSelect label='Fund Account' name='cash_account_id' required>
                        <option value=''>------</option>
                        {data[0].filter(acc => acc.currency_id == currencyId).map(acc => <option key={acc.id} value={acc.id}>{acc.general_ledger_name}</option>)}
                      </CustomSelect>
                    </div>
                    <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
                  </div>
                </NonFieldErrors>
              </Form>
            )}
          </Formik>
        )}
      </Fetcher>
    </Modal>
  )
}

export default EarlySettlement;