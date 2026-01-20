import React from 'react';
import { Form, Formik } from 'formik';
import {
  Modal,
  ModalSubmit,
  NonFieldErrors,
  CustomDatePicker,
  CustomSelect,
  CustomCheckbox,
  Fetcher,
  CustomInput,
  CustomMultiSelect
} from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { scheduleStrategies } from './data';
import { removeEmptyValues } from '../../../utils/utils';

const COOLDOWN_SECONDS = 300;

function DisburseLoan({setOpen, url, setLoanDetails, loan, updateLoanList, setLoanData, lcontrols}) {
  const [isSending, setIsSending] = React.useState(false);
  const [cooldownLeft, setCooldownLeft] = React.useState(0);
  const intervalRef = React.useRef();

  const initialValues = {
    send_sms_notification: false,
    disbursement_date: '',
    interest_start_date: '',
    fund_account_id: '',
    receipt_number: '',
    otp: '',
    loan_officer_id: '',
    first_repayment_date: loan.first_payment_date,
    schedule_strategy: loan.default_schedule_strategy
  };

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      data.fund_account_id = data.fund_account.value;
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
                      <CustomSelect label='Loan Officer & Branch' name='loan_officer_id'>
                        <option value=''>------</option>
                        {data[1].map(user => <option key={user.id} value={user.id}>{`${user.first_name} ${user.last_name} - ${user.branch__name}`}</option>)}
                      </CustomSelect>
                      <div style={{marginTop:'1rem'}}>
                        Client/Group Officer: {loan.client_officer}
                      </div>
                      {lcontrols.request_receipt_number ? (
                        <CustomInput
                          label='Receipt Number'
                          name='receipt_number'
                          type='text'
                          required
                        />
                      ) : null}
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
                      <CustomCheckbox label='Notify client/group via SMS' name='send_sms_notification'/>
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