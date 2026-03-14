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
  ModalSubmit,
  Modal
} from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../utils/utils';
import { useCash } from '../../../contexts/CashContext';
import { useReceiptBooks } from '../../../contexts/ReceiptBooksContext';
import { useLoanControls } from '../../../contexts/LoanControlsContext';


const AddPayment = ({loanId, setLoan, currencyId, setOpen, subLoans, clientType, updateLoanList, setLoanData}) => {
  const { loanControls } = useLoanControls();
  const { receiptBooks } = useReceiptBooks();
  const [selectedRb, setSelectedRb] = React.useState({});

  const receiptBooksObj = Object.fromEntries(receiptBooks.map(rb => [rb.id, rb]));

  const onSubmit = async (values, actions) => {
    const data = removeEmptyValues(values);

    if (loanControls.use_receipt_book) {
      data.receipt_book_id = values.receipt_book.value;
    }

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
      const updates = response.data;
      if (!updates.payment) {
        setLoan(curr => ({
          ...curr,
          requests: [updates, ...curr.requests]
        }));
        setOpen(false);
        actions.resetForm();
        return
      }
      setLoan(currentLoan => {
        currentLoan.status = updates.status;
        currentLoan.installments = updates.installments;
        currentLoan.txns = updates.txns;
        currentLoan.payments.unshift(updates.payment);
        currentLoan.principal_amount_due = updates.principal_amount_due;
        currentLoan.interest_amount_due = updates.interest_amount_due;
        currentLoan.non_deductable_fees = updates.non_deductable_fees;
        currentLoan.balance = updates.balance;
        currentLoan.money_to_be_refunded = updates.money_to_be_refunded;
        currentLoan.total_amount_paid = updates.total_amount_paid;
        return {...currentLoan};
      });
      setOpen(false);
      actions.resetForm();
      if (setLoanData && updateLoanList) {
        updateLoanList(updates, setLoanData);
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

  const { cash } = useCash();

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
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, errors, isSubmitting, setFieldValue }) => (
          <Form>
            <div className='create_modal_container'>
              <div>
                <CustomInput label='Amount Paid' name='amount_paid' type='number' required/>
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
                  options={cash.accounts.filter(account => !account.suspended && account.currency_id == currencyId).map(account => (
                    {label: `${account.label} - ${account.branch}`, value: account.value}
                  ))}
                  required
                />
                {clientType === 'Groups (solidarity)' ?
                <CustomSelect label='Sub Loan' name='sub_loan_id' required>
                  <option value=''>------</option>
                  {selectOpts.map(subLoan => <option key={subLoan.id} value={subLoan.id}>{subLoan.fullname}</option>)}
                </CustomSelect> : null}
                {loanControls.use_receipt_book ? (
                  <>
                    <CustomMultiSelect
                      label='Receipt Book'
                      name='receipt_book'
                      isMulti={false}
                      setFieldValue={(fieldName, selectedOpts) => {
                        setFieldValue(fieldName, selectedOpts);
                        const selectedRb = receiptBooksObj[selectedOpts.value];
                        setSelectedRb(selectedRb);
                        if (selectedRb.mode == 1) {
                          setFieldValue('receipt_number', '');
                        }
                      }}
                      options={receiptBooks.filter(rb => rb.is_active && rb.currency.id == currencyId).map(rb => (
                        {label: `${rb.name} - ${rb.branch.name} - ${{1: 'AUTO', 2: 'MANUAL'}[rb.mode]}`, value: rb.id}
                      ))}
                      required
                    />
                    {selectedRb.mode === 2 && (
                      <CustomInput
                        label='Receipt Number'
                        name='receipt_number'
                        type='text'
                        required
                      />
                    )}
                  </>
                  ) : (
                    <CustomInput label='Receipt Number' name='receipt_number' type='text'/>
                )}
                <CustomTextField label='Description' name='notes' type='text'/>
                <CustomCheckbox label='Send SMS notification to client' name='send_sms_notification'/>
                <NonFieldErrors errors={errors}/>
              </div>
              <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default AddPayment;