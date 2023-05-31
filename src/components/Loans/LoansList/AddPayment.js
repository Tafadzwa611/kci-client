import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomInput,
  CustomTextField,
  CustomSelect,
  CustomMultiSelect,
  CustomDatePicker,
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

  const selectOpts = subLoans.filter(loan => loan.id !== null).map(loan => ({value: loan.id, label: loan.fullname}));

  const initialValues = {
    cash_account_id: '',
    payment_type: 'Installment',
    payment_date: '',
    amount_paid: '',
    sub_loan_ids: '',
    receipt_number: '',
    notes: '',
  };

  return (
    <Modal open={true} setOpen={setOpen} title={'Add Payment'}>
      <Fetcher urls={['/acc-api/cash-and-cash-equivalents/']}>
        {({data}) => (
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ errors, isSubmitting, setFieldValue }) => (
              <Form>
                <NonFieldErrors errors={errors}>
                <div className='create_modal_container'>
                  <div>
                    <CustomInput label='Amount Paid' name='amount_paid' type='number' required/>
                    <CustomDatePicker label='Payment Date' name='payment_date' setFieldValue={setFieldValue} required/>
                    <CustomSelect label='Fund Account' name='cash_account_id' required>
                      <option value=''>------</option>
                      {data[0].filter(acc => acc.currency_id == currencyId).map(acc => <option key={acc.id} value={acc.id}>{acc.general_ledger_name}</option>)}
                    </CustomSelect>
                    {clientType === 'Groups (solidarity)' && <CustomMultiSelect label='Sub Loan(s)' name='sub_loan_ids' options={selectOpts} setFieldValue={setFieldValue} required/>}
                    <CustomInput label='Receipt Number' name='receipt_number' type='text'/>
                    <CustomTextField label='Description' name='notes' type='text'/>
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