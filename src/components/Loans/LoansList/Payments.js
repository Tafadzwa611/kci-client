import React, { useState, useRef } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {
  SuccessBtn,
  NonFieldErrors,
  CustomInput,
  CustomTextField,
  SubmitButton,
  CustomSelect,
  CustomDatePicker,
  Fetcher
} from '../../../common';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../utils/utils';
import DeletePayment from './DeletePayment';

const MODAL_STATES = {
  reverse: 'reverse',
  edit: 'edit',
  refund: 'refund',
  none: false,
};

function Payments({payments, client_name, loanId, setLoan, currencyId}) {
  const {reverse, none } = MODAL_STATES;
  const [modal, setModal] = useState(none);
  const [form, setForm] = useState(null);
  const paymentId = useRef(null);
  const [payId, setPayId] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const showDeleteModal = (evt) => {
    paymentId.current = evt.target.id;
    setModal(reverse);
  }

  const handleClick = (e) => {
    setPayId(e.target.id);
    setSelectedPayment(payments.find(payment => payment.id == e.target.id))
  }

  console.log(selectedPayment)

  return (
    <>
      <div className="add__security__container" style={{paddingTop:'4px', paddingBottom:"4px"}}>
        <SuccessBtn handler={() => setForm('add')} value={'Add Payment'}/>
        {form === 'add' ?  <PaymentForm loanId={loanId} currencyId={currencyId} setLoan={setLoan} /> : null}
      </div>
      {modal == reverse && <DeletePayment paymentId={payId} setOpen={setModal} setLoan={setLoan} setPayId={setPayId} />}
      <div style={{display:"flex", justifyContent:"flex-end", marginBottom:"1rem"}}>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='btn btn-default'
          table='payments'
          filename={`${client_name}'s payments`}
          sheet='tablexls'
          buttonText='Download as XLS'
        />
      </div>
      <div style={{overflowX:'auto', maxHeight:"600px", padding:"1.5rem"}} className="miniLoanDetails-container">
        <div className={payId ? "table-responsive journal__table-container-journals-payments" : "table-responsive full__table"}>
          <table className="table" id="payments">
            <thead>
              {payId ?
                <tr className="journal-details header" style={{position:'sticky', top:'0'}}>
                  <th className="schedule__table">Date_Recorded</th>
                  <th className="schedule__table">Collection_Date</th>
                </tr>:
                <tr className="journal-details header" style={{position:'sticky', top:'0'}}>
                  <th className="schedule__table">Date_Recorded</th>
                  <th className="schedule__table">Collection_Date</th>
                  <th className="schedule__table">Collected_by</th>
                  <th className="schedule__table">Principal Paid</th>
                  <th className="schedule__table">Interest Paid</th>
                  <th className="schedule__table">Penalty Paid</th>
                  <th className="schedule__table">Fees Paid</th>
                  <th className="schedule__table">To_Be Refunded</th>
                  <th className="schedule__table">Total Amount_Paid</th>
                </tr>
              }
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id}>
                  {payId ?
                    <>
                      <td className="schedule__table">
                        {payment.date_recorded}
                      </td>
                      <td className="schedule__table">{payment.cdate_created}</td>
                    </>:
                    <>
                      <td className="schedule__table">
                        <span onClick={handleClick} id={payment.id} style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>
                          {payment.date_recorded}
                        </span>
                      </td>
                      <td className="schedule__table">{payment.cdate_created}</td>
                      <td className="schedule__table">{payment.user_name}</td>
                      <td className="schedule__table">{payment.principal_amount_paid}</td>
                      <td className="schedule__table">{payment.interest_amount_paid}</td>
                      <td className="schedule__table">{payment.penalty}</td>
                      <td className="schedule__table">{payment.fees}</td>
                      <td className="schedule__table">{payment.money_to_be_refunded}</td>
                      <td className="schedule__table">{payment.amount_paid}</td>
                    </>
                  }
                </tr>
              ))}
            </tbody>
          </table>
          {payId &&
            <div style={{position:"sticky", top:"0", width:"100%"}}>
              <div style={{display:"flex", flexDirection:"column", padding:"1.5rem"}} className="j-details-container">

                <div style={{marginBottom:"1.5rem", display:"flex", justifyContent:"space-between"}}>
                  <button><a onClick={e => setPayId(null)} className="btn btn-default" style={{borderRadius:"0"}}>Close</a></button>
                  <div style={{display:'flex', columnGap:'3px'}}>
                    <button className='btn btn-olive' id={selectedPayment.id} onClick={showDeleteModal}>Reverse</button>
                    <button className='btn btn-olive'>Edit</button>
                    <button className='btn btn-olive'>Print</button>
                    <button className='btn btn-olive'>Refund</button>
                  </div>
                </div>
                <div style={{display:"flex", width:"100%", justifyContent:"space-between"}}>

                  <div>
                      <ul style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                          <li>Date Recorded: {selectedPayment.date_recorded}</li>
                          <li>Collection Date: {selectedPayment.cdate_created}</li>
                          <li>Collected by: {selectedPayment.user_name}</li>
                          <li>Branch Collected: {selectedPayment.branch_name}</li>
                          <li>Account: {selectedPayment.fund_account_name}</li>
                      </ul>
                  </div>

                  <div>
                      <ul style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                          <li>Principal Paid: {selectedPayment.principal_amount_paid}</li>
                          <li>Interest Paid: {selectedPayment.interest_amount_paid}</li>
                          <li>Penalty Paid: {selectedPayment.penalty}</li>
                          <li>Fees Paid: {selectedPayment.fees}</li>
                          <li>Total Amount Paid: {selectedPayment.amount_paid}</li>
                      </ul>
                  </div>

                  <div>
                      <ul style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>

                          <li>To Be Refunded: {selectedPayment.money_to_be_refunded}</li>
                          <li>Receipt Number: {selectedPayment.receipt_number}</li>
                          <li>Notes: {selectedPayment.notes}</li>
                      </ul>
                  </div>

                </div>

              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

const PaymentForm = ({loanId, setLoan, currencyId}) => {
  const onSubmit = async (values, actions) => {
    const data = removeEmptyValues(values);
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post(`/loansapi/add_payment/${loanId}/`, data, CONFIG);
      setLoan(response.data);
      actions.resetForm();
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

  const initialValues = {
    cash_account_id: '',
    payment_type: 'Installment',
    payment_date: '',
    amount_paid: '',
    receipt_number: '',
    notes: '',
  };

  return (
    <Fetcher urls={['/acc-api/cash-and-cash-equivalents/']}>
      {({data}) =>(
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting, errors, setFieldValue }) => (
            <Form>
              <NonFieldErrors errors={errors}>
                <CustomInput label='Amount Paid' name='amount_paid' type='number' required/>
                <CustomDatePicker label='Payment Date' name='payment_date' setFieldValue={setFieldValue} required/>
                <CustomSelect label='Fund Account' name='cash_account_id' required>
                  <option value=''>------</option>
                  {data[0].filter(acc => acc.currency_id == currencyId).map(acc => <option key={acc.id} value={acc.id}>{acc.general_ledger_name}</option>)}
                </CustomSelect>
                <CustomInput label='Receipt Number' name='receipt_number' type='text'/>
                <CustomTextField label='Description' name='description' type='text'/>
                <div style={{display:'flex', justifyContent: 'flex-end', paddingBottom:"1.5rem"}}> 
                  <SubmitButton isSubmitting={isSubmitting}/>
                </div>
              </NonFieldErrors>
            </Form>
          )}
        </Formik>
      )}
    </Fetcher>
  )
}

export default Payments;