import React from 'react';
import { Form, Formik } from 'formik';
import {
  Modal,
  ModalSubmit,
  NonFieldErrors,
  CustomDatePicker,
  Fetcher,
  CustomInput,
  CustomMultiSelect
} from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../utils/utils';
import { useReceiptBooks } from '../../../contexts/ReceiptBooksContext';

const COOLDOWN_SECONDS = 300;

function DisburseLoan({setOpen, url, setLoanDetails, loan, updateLoanList, setLoanData, lcontrols}) {
  const [isSending, setIsSending] = React.useState(false);
  const [cooldownLeft, setCooldownLeft] = React.useState(0);
  const intervalRef = React.useRef();
  const { receiptBooks } = useReceiptBooks();

   const receiptBooksObj = Object.fromEntries(receiptBooks.map(rb => [rb.id, rb]));

  const initialValues = {
    send_sms_notification: false,
    disbursement_date: '',
    interest_start_date: '',
    fund_account_id: '',
    receipt_number: '',
    otp: '',
    loan_officer_id: '',
    estab_fee_paid: '',
    receipt_book: '',
    first_repayment_date: loan.first_payment_date
  };

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      data.fund_account_id = data.fund_account.value;
      if (data.receipt_book) {
        data.receipt_book_id = data.receipt_book.value;
      }
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

  const startCooldown = () => {
    setCooldownLeft(COOLDOWN_SECONDS);

    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setCooldownLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  const disabled = isSending || cooldownLeft > 0;

  const handleRequestOtp = async () => {
    if (disabled) return;

    setIsSending(true);
    try {
      await axios.get(`/loansapi/request_approval_otp/${loan.id}/`);
      startCooldown();
    } catch (err) {
      console.error("Failed to request OTP:", err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Modal open={true} setOpen={setOpen} title={'Disburse Loan'}>
      <Fetcher urls={['/acc-api/cash-accounts-list/', `/usersapi/staff/?loan_officers_only=1`]}>
        {({data}) => (
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ errors, isSubmitting, setFieldValue }) => (
              <Form>
                <NonFieldErrors errors={errors}>
                  <div className='create_modal_container'>
                    <div>
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
                      <CustomInput
                        label='Establishment Fee Paid'
                        name='estab_fee_paid'
                        type='number'
                      />
                      <CustomMultiSelect
                        label='Receipt Book'
                        name='receipt_book'
                        isMulti={false}
                        setFieldValue={(fieldName, selectedOpts) => {
                          setFieldValue(fieldName, selectedOpts);
                          const selectedRb = receiptBooksObj[selectedOpts.value];
                          if (selectedRb.mode == 1) {
                            setFieldValue('receipt_number', '');
                          }
                        }}
                        options={receiptBooks.filter(rb => rb.is_active && rb.currency.id == loan.currency_id).map(rb => (
                          {label: `${rb.name} - ${rb.branch.name} - ${{1: 'AUTO', 2: 'MANUAL'}[rb.mode]}`, value: rb.id}
                        ))}
                      />
                      <CustomInput
                        label='Receipt Number'
                        name='receipt_number'
                        type='text'
                      />
                      {lcontrols.request_otp_on_db ? (
                        <>
                          <CustomInput
                            label='OTP'
                            name='otp'
                            type='text'
                            required
                          />
                          <button className='btn btn-info' onClick={handleRequestOtp} disabled={disabled}>
                            {isSending
                              ? "Sending..."
                              : cooldownLeft > 0
                                ? `Send OTP (${cooldownLeft}s)`
                                : "Send OTP"}
                          </button>
                        </>
                      ) : null}
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