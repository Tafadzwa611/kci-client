import React from 'react';
import { Form, Formik } from 'formik';
import {
  Modal,
  ModalSubmit,
  NonFieldErrors,
  CustomInput,
  Fetcher,
  CustomDatePicker,
  CustomSelect
} from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';

const Refund = ({setOpen, selectedPayment, setLoan, payId, setSelectedPayment, currencyId}) => {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post(`/loansapi/refund/${selectedPayment.id}/`, values, CONFIG);
      setLoan(response.data);
      setOpen(false);
      const payment = response.data.payments.find(payment => payment.id == payId);
      if (payment) {
        setSelectedPayment(payment);
      }else {
        setSelectedPayment(null);
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
    <Modal open={true} setOpen={setOpen} title={'Refund'}>
      <Fetcher urls={['/acc-api/cash-and-cash-equivalents/']}>
        {({data}) => (
          <Formik initialValues={{refund_amount: '', value_date: '', cash_account_id: ''}} onSubmit={onSubmit}>
            {({ errors, setFieldValue, isSubmitting }) => (
              <Form>
                <NonFieldErrors errors={errors}>
                  <div className='create_modal_container'>
                    <div>
                      <CustomInput label='Refund Amount' name='refund_amount' type='number' required/>
                      <CustomDatePicker label='Refund Date' name='value_date' setFieldValue={setFieldValue} required/>
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

export default Refund;