import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomMultiSelect,
  CustomInput,
  CustomTextField,
  CustomSelect,
  CustomDatePicker,
  CustomCheckbox,
  Fetcher,
  ModalSubmit,
  Modal
} from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../utils/utils';

const AddPayment = ({loanId, setLoan, currencyId, setOpen, subLoans, clientType, updateLoanList, setLoanData}) => {
  const onSubmit = async (values, actions) => {
    const data = removeEmptyValues(values);
    data.cash_account_id = data.fund_account.value;
    if (!values.manually_allocate) {
      delete data.manual_allocation
    }
    if (data.sub_loan_ids) {
      data.sub_loan_ids = data.sub_loan_ids.map(sub_loan_id => sub_loan_id.value);
    }
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post(`/loansapi/add_payment/${loanId}/`, data, CONFIG);
      const newLoan = response.data;
      setLoan(newLoan);
      setOpen(false);
      actions.resetForm();
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

  const selectOpts = subLoans.filter(loan => loan.id !== null);

  const initialValues = {
    send_sms_notification: false,
    cash_account_id: '',
    payment_type: 'Installment',
    payment_date: '',
    amount_paid: '',
    manually_allocate: false,
    manual_allocation: {principal: '', interest: '', fees: '', penalty: ''},
    sub_loan_id: '',
    receipt_number: '',
    notes: '',
  };

  return (
    <Modal open={true} setOpen={setOpen} title={'Add Payment'}>
      <Fetcher urls={['/acc-api/cash-accounts-list/']}>
        {({data}) => (
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, errors, isSubmitting, setFieldValue }) => (
              <Form>
                <NonFieldErrors errors={errors}>
                  <div className='create_modal_container'>
                    <div>
                      <CustomInput label='Amount Paid' name='amount_paid' type='number' required/>
                      <CustomCheckbox label='Manually Allocate' name='manually_allocate'/>
                      {values.manually_allocate && <>
                        <CustomInput label='Principal Paid' name='manual_allocation.principal' type='number' required/>
                        <CustomInput label='Interest Paid' name='manual_allocation.interest' type='number' required/>
                        <CustomInput label='Fees Paid' name='manual_allocation.fees' type='number' required/>
                        <CustomInput label='Penalty Paid' name='manual_allocation.penalty' type='number' required/>
                      </>}
                      <CustomDatePicker label='Payment Date' name='payment_date' setFieldValue={setFieldValue} required/>
                      <CustomMultiSelect
                        label='Fund Account'
                        name='fund_account'
                        isMulti={false}
                        setFieldValue={setFieldValue}
                        options={data[0].accounts.filter(account => !account.suspended && account.currency_id == currencyId).map(account => (
                          {label: `${account.label} - ${account.branch}`, value: account.value}
                        ))}
                        required
                      />
                      {clientType === 'Groups (solidarity)' ?
                      <CustomSelect label='Sub Loan' name='sub_loan_id' required>
                        <option value=''>------</option>
                        {selectOpts.map(subLoan => <option key={subLoan.id} value={subLoan.id}>{subLoan.fullname}</option>)}
                      </CustomSelect> : null}
                      <CustomInput label='Receipt Number' name='receipt_number' type='text'/>
                      <CustomTextField label='Description' name='notes' type='text'/>
                      <CustomCheckbox label='Send SMS notification to client' name='send_sms_notification'/>
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

export default AddPayment;