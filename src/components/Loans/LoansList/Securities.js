import React from 'react';
import {
  Fetcher,
  NonFieldErrors,
  CustomInput,
  CustomSelect,
  SubmitButton
} from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Formik } from 'formik';
import { useCurrencies } from '../../../contexts/CurrenciesContext';

const thStyle2 = {border: 'none', borderBottom: '1px solid #c1d0d7'};

function Securities({collaterals, setLoan, loanId}) {
  const onClick = async (evt) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.delete(`/loansapi/delete_loan_collateral/${evt.target.value}/`, CONFIG);
      setLoan(curr => ({...curr, collaterals: curr.collaterals.filter(collateral => collateral.id != evt.target.value)}));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th style={thStyle2}><b>Type</b></th>
            <th style={thStyle2}><b>Description</b></th>
            <th style={thStyle2}><b>Value</b></th>
            <th style={thStyle2}><b>Added By</b></th>
            <th style={thStyle2}><b>Date Added</b></th>
            <th style={thStyle2}><b>Action</b></th>
          </tr>
        </thead>
        <tbody>
          {collaterals.map(collateral => (
            <tr key={collateral.id}>
              <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{collateral.collateral_type_name}</td>
              <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{collateral.product_name}</td>
              <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{collateral.value}</td>
              <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{collateral.user_name}</td>
              <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{collateral.date_added}</td>
              <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>
                <button value={collateral.id} onClick={onClick} className='badge badge-danger'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
      <AddSecurity setLoan={setLoan} loanId={loanId}/>
    </>
  )
}

const AddSecurity = ({setLoan, loanId}) => {
  const {currencies} = useCurrencies();
  const initialValues = {collateral_type_id: '', product_name: '', value: '', currency_id: ''};

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post(`/loansapi/add_loan_collateral/${loanId}/`, values, CONFIG);
      setLoan(curr => ({...curr, collaterals: [response.data, ...curr.collaterals]}));
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

  return (
    <Fetcher urls={['/loansapi/list_collateral_types/']}>
      {({data}) => (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting, errors }) => (
            <Form>
              <NonFieldErrors errors={errors}>
                <CustomSelect label='Collateral Type' name='collateral_type_id' required>
                  <option value=''>------</option>
                  {data[0].map(collateralType => <option key={collateralType.id} value={collateralType.id}>{collateralType.name}</option>)}
                </CustomSelect>
                <CustomInput label='Description' name='product_name' type='text' required/>
                <CustomSelect label='Currency' name='currency_id' required>
                  <option value=''>------</option>
                  {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                </CustomSelect>
                <CustomInput label='Value' name='value' type='number' required/>
                <div style={{display:'flex', justifyContent: 'flex-end'}}> 
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

export default Securities;