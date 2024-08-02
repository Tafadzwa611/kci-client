import React, { useState } from 'react';
import {
  Fetcher,
  Modal,
  SuccessBtn,
  CustomInput,
  CustomCheckbox,
  ModalSubmit,
  CustomMultiSelect,
  NonFieldErrors
} from '../../../../common';
import { useCurrencies } from '../../../../contexts/CurrenciesContext';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';

function LoanControls() {
  return (
    <Fetcher urls={['/loansapi/loan_controls/']}>
      {({data}) => <List initControls={data[0]} />}
    </Fetcher>
  )
}

const List = ({initControls}) => {
  const [loanControls, setLoanControls] = useState(initControls);
  const [openModal, setOpenModal] = useState(false);
  const {currencies} = useCurrencies();

  return (
    <>
      <SuccessBtn handler={() => setOpenModal(true)} value={'Update Controls'}/>
      <UpdateLoanControls
        open={openModal}
        setOpen={setOpenModal}
        loanControls={loanControls}
        setLoanControls={setLoanControls}
      />
      <div style={{display:'block'}}>
        <div style={{padding:'0', border:'none'}}>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div className='table__height'>
              <table className='table'>
                <thead>
                  <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                    <th style={{textAlign:'start'}}>Control</th>
                    <th style={{textAlign:'start'}}>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Maximum Number Of Running Loans Allowed Per Client</td>
                    <td>{loanControls.max_num_of_loans ? loanControls.max_num_of_loans : 'Not Set'}</td>
                  </tr>
                  <tr>
                    <td>Maximum Number Of Running Loans Allowed Per Group</td>
                    <td>{loanControls.max_num_of_group_loans ? loanControls.max_num_of_group_loans : 'Not Set'}</td>
                  </tr>
                  <tr>
                    <td>Allow Group Members To Guarantee Group Loan</td>
                    <td>{loanControls.allow_group_member_as_guarantor ? 'Yes' : 'No'}</td>
                  </tr>
                  <tr>
                    <td>Request OTP On Loan Approval</td>
                    <td>{loanControls.request_otp_on_approval ? 'Yes' : 'No'}</td>
                  </tr>
                  <tr>
                    <td>Allow Clients With Running Loans To Guarantee</td>
                    <td>{loanControls.allow_clients_with_running_loans_to_guarantee ? 'Yes' : 'No'}</td>
                  </tr>
                  <tr>
                    <td>Allow Groups With Running Loans To Guarantee</td>
                    <td>{loanControls.allow_groups_with_running_loans_to_guarantee ? 'Yes' : 'No'}</td>
                  </tr>
                  <tr>
                    <td>Two Man Rules</td>
                    <td>
                      {loanControls.two_man_rules.map(rule => <div key={rule}>{rule}</div>)}
                    </td>
                  </tr>
                  <tr>
                    <td>Maximum Exposure</td>
                    <td>
                      {loanControls.max_currencies_exposure.map(exp => {
                        const currency = currencies.find(currency => currency.id == exp.currency_id);
                        return <div key={exp.currency_id}>{currency.fullname} {currency.shortname} {exp.max_exposure}</div>
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td>Groups Maximum Exposure</td>
                    <td>
                      {loanControls.group_max_currencies_exposure.map(exp => {
                        const currency = currencies.find(currency => currency.id == exp.currency_id);
                        return <div key={exp.currency_id}>{currency.fullname} {currency.shortname} {exp.max_exposure}</div>
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const UpdateLoanControls = ({open, setOpen, loanControls, setLoanControls}) => {
  const {currencies} = useCurrencies();
  currencies.sort((a, b) => a.id - b.id);
  const initialValues = {
    max_num_of_loans: loanControls.max_num_of_loans || '',
    max_num_of_group_loans: loanControls.max_num_of_group_loans || '',
    allow_group_member_as_guarantor: loanControls.allow_group_member_as_guarantor,
    request_otp_on_approval: loanControls.request_otp_on_approval,
    allow_clients_with_running_loans_to_guarantee: loanControls.allow_clients_with_running_loans_to_guarantee,
    allow_groups_with_running_loans_to_guarantee: loanControls.allow_groups_with_running_loans_to_guarantee,
    two_man_rules: loanControls.two_man_rules,
    max_currencies_exposure: currencies.map(currency => {
      const exp = loanControls.max_currencies_exposure.find(exp => exp.currency_id == currency.id);
      const max_exposure = exp ? exp.max_exposure: '';
      return {currency_id: currency.id, max_exposure: max_exposure}
    }),
    group_max_currencies_exposure: currencies.map(currency => {
      const exp = loanControls.group_max_currencies_exposure.find(exp => exp.currency_id == currency.id);
      const max_exposure = exp ? exp.max_exposure: '';
      return {currency_id: currency.id, max_exposure: max_exposure}
    })
  };

  const onSubmit = async (values, actions) => {
    const data = {
      allow_group_member_as_guarantor: values.allow_group_member_as_guarantor,
      request_otp_on_approval: values.request_otp_on_approval,
      allow_clients_with_running_loans_to_guarantee: values.allow_clients_with_running_loans_to_guarantee,
      allow_groups_with_running_loans_to_guarantee: values.allow_groups_with_running_loans_to_guarantee,
      two_man_rules: values.two_man_rules.map(rule => rule.value),
      ...(values.max_num_of_loans && {max_num_of_loans: values.max_num_of_loans}),
      ...(values.max_num_of_group_loans && {max_num_of_group_loans: values.max_num_of_group_loans}),
      ...(values.max_currencies_exposure && {currency_exposures: values.max_currencies_exposure.filter(exp => exp.max_exposure)}),
      ...(values.group_max_currencies_exposure && {group_currency_exposures: values.group_max_currencies_exposure.filter(exp => exp.max_exposure)}),
    };
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.put('/loansapi/update_loan_controls/', data, CONFIG);
      setLoanControls({
        ...values,
        two_man_rules: values.two_man_rules.map(rule => rule.value),
        max_currencies_exposure: values.max_currencies_exposure.filter(exp => exp.max_exposure),
        group_max_currencies_exposure: values.group_max_currencies_exposure.filter(exp => exp.max_exposure),
      });
      setOpen(false);
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
    <Modal open={open} setOpen={setOpen} title={'Update Loan Controls'}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, errors, setFieldValue, values }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='create_modal_container'>
                <div>
                  <CustomInput label='Maximum Number Of Running Loans Allowed Per Client' name='max_num_of_loans' step='1' type='number'/>
                  <CustomInput label='Maximum Number Of Running Loans Allowed Per Group' name='max_num_of_group_loans' step='1' type='number'/>
                  <CustomCheckbox label='Allow Group Members To Guarantee Group Loan' name='allow_group_member_as_guarantor'/>
                  <CustomCheckbox label='Request OTP On Loan Approval' name='request_otp_on_approval'/>
                  <CustomCheckbox label='Allow Clients With Running Loans To Guarantee' name='allow_clients_with_running_loans_to_guarantee'/>
                  <CustomCheckbox label='Allow Groups With Running Loans To Guarantee' name='allow_groups_with_running_loans_to_guarantee'/>
                  <CustomMultiSelect
                    label='Two Man Rules'
                    name='two_man_rules'
                    setFieldValue={setFieldValue}
                    initVals={values.two_man_rules.map(rule => ({label: rule, value: rule}))}
                    options={[
                      {label: 'Loan Approval', value: 'Loan Approval'},
                      {label: 'Loan Disbursement', value: 'Loan Disbursement'},
                      {label: 'Loan Rejection', value: 'Loan Rejection'},
                      {label: 'Loan Deletion', value: 'Loan Deletion'},
                    ]}
                  />
                  {currencies.map((currency, idx) => (
                    <CustomInput key={idx} label={`${currency.fullname} Max Exposure`} name={`max_currencies_exposure[${idx}].max_exposure`} type='number'/>
                  ))}
                  {currencies.map((currency, idx) => (
                    <CustomInput key={idx} label={`${currency.fullname} Group Max Exposure`} name={`group_max_currencies_exposure[${idx}].max_exposure`} type='number'/>
                  ))}
                </div>
                <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default LoanControls;