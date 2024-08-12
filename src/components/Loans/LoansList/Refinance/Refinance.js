import React, {useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Formik } from 'formik';
import {
  Fetcher,
  NonFieldErrors,
  CustomSelect,
  CustomDatePicker,
  CustomInput,
  CustomCheckbox,
  ModalSubmit,
  Modal
} from '../../../../common';
import { useNavigate } from 'react-router-dom';
import { isObjectEmpty } from '../../../../utils/utils';
import LoanFees from './LoanFees';

const SCHEDULESTRATEGIES = {
  'Days': ['Everyday'],
  'Weeks': ['Every Mon', 'Every Tue', 'Every Wed', 'Every Thu', 'Every Fri', 'Every Sat', 'Every Sun', 'Every Seven Days'],
  '2 Weeks': ['Same Day', 'Biweek Interval'],
  'Months': ['Same Day', 'First Day Of Next Month', 'Last Day Of Next Month', 'Monthly Interval'],
  '2 Months': ['Same Day', 'Bimonth Interval'],
  '3 Months': ['Same Day', 'Quarter Interval'],
  '4 Months': ['Same Day', 'Quadrimester Interval'],
  '6 Months': ['Same Day', 'Semi-annual Interval'],
  'Years': ['Same Day', 'Year Interval'],
  '': []
};

function Refinance({setOpen, loan}) {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [scheduleStrategies, setScheduleStrategies] = useState([]);

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post(`/loansapi/refinance/${loan.id}/`, values, CONFIG);
      navigate({pathname: `/loans/viewloans/loandetails/cli/${response.data.loan_id}`});
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
    loan_product_id: '',
    cash_account_id: '',
    db_date: '',
    first_repayment_date: '',
    num_of_installments: '',
    top_up_amount: '',
    interest_rate: '',
    interest_capitalized: '',
    penalties_capitalized: '',
    fees_capitalized: '',
    keep_same_loan_id: false,
    schedule_strategy: '',
    reason_for_loan: '',
    fees: []
  };

  const onChange = (evt, setFieldValue, products) => {
    const {value} = evt.target;
    setFieldValue('loan_product_id', value);
    const product = products.find(prod => prod.id == value) || {};
    setProduct(product);
    let scheduleStrategies;
    let fees;
    if (isObjectEmpty(product)) {
      scheduleStrategies = [];
      fees = [];
    }else {
      scheduleStrategies = SCHEDULESTRATEGIES[product.loan_duration_time_unit];
      fees = product.fees;
    }
    setFieldValue('fees', fees);
    setScheduleStrategies(scheduleStrategies);
  }

  return (
    <Modal open={true} title='Refinance' setOpen={setOpen}>
      <Fetcher urls={['/acc-api/cash-and-cash-equivalents/', '/loansapi/loan_products_list/?allowed_in_user_branch_only=1', '/usersapi/staff/?loan_officers_only=1']}>
        {({data}) => (
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, errors, isSubmitting, setFieldValue }) => (
              <Form>
                <NonFieldErrors errors={errors}>
                  <div className='create_modal_container'>
                    <div>
                      <CustomSelect label='Loan Product' name='loan_product_id' onChange={(evt) => onChange(evt, setFieldValue, data[1])} required>
                        <option value=''>------</option>
                        {data[1].filter(product => product.currency_id == loan.currency_id && product.client_type == loan.client_type).map(product => (
                          <option key={product.id} value={product.id}>
                            ({product.currency})-{product.name}-{product.client_type}
                          </option>
                        ))}
                      </CustomSelect>
                      <CustomSelect label='Fund Account' name='cash_account_id' required>
                        <option value=''>------</option>
                        {data[0].filter(acc => acc.currency_id == loan.currency_id).map(acc => <option key={acc.id} value={acc.id}>{acc.general_ledger_name}</option>)}
                      </CustomSelect>
                      <CustomDatePicker label='Refinance Date' name='db_date' setFieldValue={setFieldValue} required/>
                      <CustomDatePicker label='First Repayment Date' name='first_repayment_date' setFieldValue={setFieldValue} required/>
                      <CustomInput
                        label='Top Up Amount'
                        name='top_up_amount'
                        type='number'
                        min={product.minimum_principal_amount}
                        max={product.maximum_principal_amount}
                        required
                      />
                      <small><em>Minimum = {product.minimum_principal_amount} Maximum = {product.maximum_principal_amount}</em></small>
                      <CustomInput
                        label='Number Of Repayments'
                        name='num_of_installments'
                        type='number'
                        min={product.minimum_loan_duration}
                        max={product.maximum_loan_duration}
                        required
                      />
                      <small><em>Minimum = {product.minimum_loan_duration} Maximum = {product.maximum_loan_duration}</em></small>
                      <CustomInput
                        label='Interest Rate'
                        name='interest_rate'
                        type='number'
                        min={product.minimum_interest_rate}
                        max={product.maximum_interest_rate}
                        step={product.number_of_decimal_places}
                        required
                      />
                      <small><em>Minimum = {product.minimum_interest_rate} Maximum = {product.maximum_interest_rate}</em></small>
                      <CustomInput label='Interest Capitalized' name='interest_capitalized' type='number' required/>
                      <small><em>Total Interest Balance = {loan.interest_amount_due}</em></small>
                      <CustomInput label='Penalties Capitalized' name='penalties_capitalized' type='number' required/>
                      <small><em>Total Penalty Balance = {loan.penalty}</em></small>
                      <CustomInput label='Fees Capitalized' name='fees_capitalized' type='number' required/>
                      <small><em>Total Fees Balance = {loan.non_deductable_fees}</em></small>
                      <CustomCheckbox label='Keep Same Loan ID' name='keep_same_loan_id'/>
                      <CustomSelect label='Loan Schedule Strategy' name='schedule_strategy' required>
                        <option value=''>------</option>
                        {scheduleStrategies.map(strategy => <option key={strategy} value={strategy}>{strategy}</option>)}
                      </CustomSelect>
                      <CustomSelect label='Reason For Loan' name='reason_for_loan' required>
                        <option value=''>------</option>
                        <option value='CONSUMER'>CONSUMER</option>
                        <option value='COMMERCIAL - Agriculture'>COMMERCIAL - Agriculture</option>
                        <option value='COMMERCIAL - Manufacturing'>COMMERCIAL - Manufacturing</option>
                        <option value='COMMERCIAL - Mining'>COMMERCIAL - Mining</option>
                        <option value='COMMERCIAL - Housing'>COMMERCIAL - Housing</option>
                        <option value='COMMERCIAL - Distribution & Services'>COMMERCIAL - Distribution & Services</option>
                        <option value='COMMERCIAL - Retail'>COMMERCIAL - Retail</option>
                        <option value='COMMERCIAL - Transport'>COMMERCIAL - Transport</option>
                        <option value='COMMERCIAL - Health'>COMMERCIAL - Health</option>
                        <option value='COMMERCIAL - Education'>COMMERCIAL - Education</option>
                        <option value='COMMERCIAL - Cross Border Traders'>COMMERCIAL - Cross Border Traders</option>
                        <option value='COMMERCIAL - Construction'>COMMERCIAL - Construction</option>
                        <option value='COMMERCIAL - Vendors'>COMMERCIAL - Vendors</option>
                        <option value='OTHER'>OTHER</option>
                      </CustomSelect>
                      <CustomSelect label='Loan Officer & Branch' name='loan_officer_id'>
                        <option value=''>------</option>
                        {data[2].map(user => <option key={user.id} value={user.id}>{`${user.first_name} ${user.last_name} - ${user.branch__name}`}</option>)}
                      </CustomSelect>
                      {values.fees.map((fee, index) => <LoanFees key={index} setFieldValue={setFieldValue} fee={fee} values={values}/>)}
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

export default Refinance;