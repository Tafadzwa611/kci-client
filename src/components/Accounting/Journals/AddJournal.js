import React, { useState } from 'react';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { Form, Formik, useField } from 'formik';
import CustomSelectRemoteJournal from './CustomSelectRemoteJournal';
import {
  NonFieldErrors,
  CustomSelect,
  CustomInput,
  CustomDatePicker,
  CustomTextField,
  CustomCheckbox,
  SubmitButton,
  Fetcher
} from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';

function AddJournal() {
  const {currencies} = useCurrencies();
  const navigate = useNavigate();
  const [journalIds, setJournalIds] = useState([]);

  const onSubmit = async (values, actions) => {
    const data = {
      currency_id: values.currency_id,
      account_debited_id: values.account_debited.id,
      account_credited_id: values.account_credited.id,
      amount: values.amount,
      txn_date: values.txn_date,
      narrative: values.narrative
    };
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post('/acc-api/create-journal/', data, CONFIG);
      if (Object.keys(response.data).length === 1 && values.redirect) {
        navigate({pathname: `/accounting/viewaccounting/journals/journal/${response.data.id}`});
      }else {
        setJournalIds(curr => [response.data, ...curr]);
        actions.resetForm();
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

  const initialValues = {
    currency_id: '',
    branch_debited_id: '',
    branch_credited_id: '',
    account_debited: '',
    account_credited: '',
    amount: '',
    txn_date: '',
    narrative: '',
    redirect: true
  };

  return (
    <>
      <div>
        <button type='button' className='btn btn-default max'>
          <Link to='/accounting/viewaccounting/journals'>Back</Link>
        </button>
      </div>
      <Fetcher urls={['/usersapi/branch-list/']}>
        {({data}) => (
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ isSubmitting, errors, setFieldValue, values }) => (
              <Form>
                <NonFieldErrors errors={errors}>
                  <div className='divider divider-info'>
                    <span>Journal Information</span>
                  </div>
                  {journalIds.map((journalId, idx) => <Notification key={idx} journalId={journalId}/>)}
                  <CustomSelect
                    label='Currency'
                    name='currency_id'
                    onChange={(evt) => {
                      setFieldValue('account_debited', '');
                      setFieldValue('account_credited', '');
                      setFieldValue('currency_id', evt.target.value);
                    }}
                    required>
                    <option value=''>------</option>
                    {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                  </CustomSelect>
                  <div style={{display:'flex', columnGap:'1%'}}>
                    <CustomSelectForm
                      label='Branch Debited'
                      name='branch_debited_id'
                      onChange={(evt) => {
                        setFieldValue('account_debited', '');
                        setFieldValue('branch_debited_id', evt.target.value);
                      }}
                      required
                    >
                      <option value=''>------</option>
                      {data[0].map(br => <option key={br.id} value={br.id}>{br.name}</option>)}
                    </CustomSelectForm>
                    {values.currency_id && values.branch_debited_id ?
                    <CustomSelectRemoteJournal
                      label='Account Debited'
                      url='/acc-api/search_account/'
                      selected={values.account_debited}
                      params={[
                        {key: 'currency_id', value: values.currency_id},
                        {key: 'branch_ids', value: values.branch_debited_id}
                      ]}
                      setFieldValue={setFieldValue}
                      queryParamName='query'
                      placeholder='Search Account'
                      name='account_debited'
                      required
                    /> : null}
                  </div>
                  <div style={{display:'flex', columnGap:'1%'}}>
                    <CustomSelectForm
                      label='Branch Credited'
                      name='branch_credited_id'
                      onChange={(evt) => {
                        setFieldValue('account_credited', '');
                        setFieldValue('branch_credited_id', evt.target.value);
                      }}
                      required
                    >
                      <option value=''>------</option>
                      {data[0].map(br => <option key={br.id} value={br.id}>{br.name}</option>)}
                    </CustomSelectForm>
                    {values.currency_id && values.branch_credited_id ?
                    <CustomSelectRemoteJournal
                      label='Account Credited'
                      url='/acc-api/search_account/'
                      selected={values.account_credited}
                      params={[
                        {key: 'currency_id', value: values.currency_id},
                        {key: 'branch_ids', value: values.branch_credited_id}
                      ]}
                      setFieldValue={setFieldValue}
                      queryParamName='query'
                      placeholder='Search Account'
                      name='account_credited'
                      required
                    /> : null}
                  </div>
                  <CustomInput label='Amount' name='amount' type='number' step='0.00001' required/>
                  <CustomDatePicker label='Date' name='txn_date' setFieldValue={setFieldValue} required/>
                  <CustomTextField label='Narrative' name='narrative' required/>
                  {values.branch_debited_id === values.branch_credited_id ? <CustomCheckbox label='Redirect' name='redirect'/> : null}
                  <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
                  <div style={{display:'flex', justifyContent: 'flex-end'}}> 
                    <SubmitButton isSubmitting={isSubmitting}/>
                  </div>
                </NonFieldErrors>
              </Form>
            )}
          </Formik>
        )}
      </Fetcher>
    </>
  )
}

const Notification = ({journalId}) => {
  if (Object.keys(journalId).length === 1) {
    return (
      <div className='success__submit' style={{display:'flex', columnGap:'5px'}}>
        <div>
          Journal created
        </div>
        <Link to={`/accounting/viewaccounting/journals/journal/${journalId.id}`}>
          View Journal
        </Link>
      </div>
    )
  }
  return (
    <div className='success__submit' style={{display:'flex', columnGap:'5px'}}>
      <div>
        Journals created
      </div>
      <Link to={`/accounting/viewaccounting/journals/journal/${journalId.debit_journal_id}`}>
        View Debit Journal
      </Link>
      <Link to={`/accounting/viewaccounting/journals/journal/${journalId.credit_journal_id}`}>
        View Credit Journal
      </Link>
    </div>
  ) 
}

const CustomSelectForm = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className='custom-background' style={{marginTop:'1.5rem', width:'24%'}}>
      <label className='form-label'>{label}{props.required && <span style={{color: 'red'}}>&#42;</span>}</label>
      <div style={{width:'100%'}}>
        <select {...field} {...props} className={`custom-select-form ${meta.touched && meta.error ? 'input-error' : ''}`} style={{width:'100%'}}/>
        {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
      </div>
    </div>
  );
}

export default AddJournal;