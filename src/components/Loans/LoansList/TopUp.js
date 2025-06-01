import React from 'react';
import { Form, Formik } from 'formik';
import {
  Modal,
  ModalSubmit,
  NonFieldErrors,
  CustomDatePicker,
  // CustomSelect,
  CustomInput,
  CustomCheckbox,
  CustomMultiSelect,
  Fetcher
} from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';

function TopUp({loan, setLoanDetails, setOpen, setLoanData, updateLoanList}) {
  const initialValues = {
    topup_amount: '',
    topup_date: '',
    apply_fees: false,
    fund_account_id: ''
  };

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      values.fund_account_id = values.fund_account.value;
      const response = await axios.patch(`/loansapi/loan_topup/${loan.id}/`, values, CONFIG);
      const newLoan = response.data;
      setLoanDetails(newLoan);
      setOpen(false);
      if (setLoanData && updateLoanList) {
        updateLoanList(newLoan, setLoanData);
      }
    } catch (error) {
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
    <Modal open={true} setOpen={setOpen} title={'Top-Up Loan'}>
      <Fetcher urls={['/acc-api/cash-accounts-list/']}>
        {({data}) => (
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ errors, isSubmitting, setFieldValue }) => (
              <Form>
                <NonFieldErrors errors={errors}>
                <div className='create_modal_container'>
                  <div>
                    <CustomDatePicker label='Top-Up Date' name='topup_date' setFieldValue={setFieldValue} required/>
                    <CustomInput label='Topup Amount' name='topup_amount' type='number' required/>
                    {/* <CustomSelect label='Fund Account' name='fund_account_id' required>
                      <option value=''>------</option>
                      {data[0].filter(acc => acc.currency_id == loan.currency_id).map(acc => <option key={acc.id} value={acc.id}>{acc.general_ledger_name}</option>)}
                    </CustomSelect> */}
                    <CustomMultiSelect
                      label='Fund Account'
                      name='fund_account'
                      isMulti={false}
                      setFieldValue={setFieldValue}
                      options={data[0].accounts.filter(account => !account.suspended && account.currency_id == loan.currency_id).map(account => (
                        {label: `${account.label} - ${account.branch}`, value: account.value}
                      ))}
                      required
                    />
                    <CustomCheckbox label='Apply Fees' name='apply_fees'/>
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

export default TopUp;