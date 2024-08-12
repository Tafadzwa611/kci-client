import React from 'react';
import { Form, Formik } from 'formik';
import {
  Modal,
  ModalSubmit,
  NonFieldErrors,
  CustomDatePicker,
  CustomSelect,
  Fetcher
} from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { scheduleStrategies } from './data';
import { removeEmptyValues } from '../../../utils/utils';

function DisburseLoan({setOpen, url, setLoanDetails, loan, updateLoanList, setLoanData}) {
  const initialValues = {
    disbursement_date: '',
    interest_start_date: '',
    fund_account_id: '',
    loan_officer_id: loan.client_officer_id || '',
    first_repayment_date: loan.first_payment_date,
    schedule_strategy: loan.default_schedule_strategy
  };

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.patch(url, data, CONFIG);
      const newLoan = response.data;
      setLoanDetails(newLoan);
      setOpen(false);
      if (setLoanData && updateLoanList) {
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

  return (
    <Modal open={true} setOpen={setOpen} title={'Disburse Loan'}>
      <Fetcher urls={['/acc-api/cash-and-cash-equivalents/', `/usersapi/staff/?loan_officers_only=1`]}>
        {({data}) => (
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ errors, isSubmitting, setFieldValue }) => (
              <Form>
                <NonFieldErrors errors={errors}>
                  <div className='create_modal_container'>
                    <div>
                      <CustomSelect label='Default Loan Schedule Strategy' name='schedule_strategy' required>
                        <option value=''>------</option>
                        {scheduleStrategies[loan.repayment_cycle].map(strategy => <option key={strategy} value={strategy}>{strategy}</option>)}
                      </CustomSelect>
                      <CustomDatePicker
                        label='First Repayment Date'
                        name='first_repayment_date'
                        setFieldValue={setFieldValue}
                        required
                      />
                      <CustomDatePicker
                        label='Disbursement Date'
                        name='disbursement_date'
                        setFieldValue={setFieldValue}
                        required
                        allowKeyDown
                      />
                      {loan.product_type === 'Dynamic Term Loan' && (
                        <CustomDatePicker
                          label='Interest Start Date'
                          name='interest_start_date'
                          setFieldValue={setFieldValue}
                          required
                          allowKeyDown
                        />
                      )}
                      <CustomSelect label='Fund Account' name='fund_account_id' required>
                        <option value=''>------</option>
                        {data[0].filter(acc => acc.currency_id == loan.currency_id).map(acc => <option key={acc.id} value={acc.id}>{acc.general_ledger_name}</option>)}
                      </CustomSelect>
                      <CustomSelect label='Loan Officer & Branch' name='loan_officer_id'>
                        <option value=''>------</option>
                        {data[1].map(user => <option key={user.id} value={user.id}>{`${user.first_name} ${user.last_name} - ${user.branch__name}`}</option>)}
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

export default DisburseLoan;