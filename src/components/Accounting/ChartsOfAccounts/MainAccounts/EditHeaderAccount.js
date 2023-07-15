import React from 'react';
import {
  Fetcher,
  CustomInput,
  CustomSelect,
  NonFieldErrors,
  CustomTextField,
  CustomDatePicker,
  SubmitButton
} from '../../../../common';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../../utils/utils';
import { useNavigate, useParams } from 'react-router-dom';

function EditHeaderAccount() {
  const params = useParams();

  return (
    <Fetcher urls={[`/acc-api/get_header_account/${params.headerAccountId}/`]}>
      {({data}) => <EditHeaderAccountForm headerAccount={data[0]}/>}
    </Fetcher>
  )
}

const EditHeaderAccountForm = ({headerAccount}) => {
  const navigate = useNavigate();
  const initialValues = {
    general_ledger_code: headerAccount.general_ledger_code,
    general_ledger_name: headerAccount.general_ledger_name,
    account_type: headerAccount.account_type,
    date_created: headerAccount.account_date,
    description: headerAccount.description || '',
  }

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const data = removeEmptyValues(values);
      await axios.put(`/acc-api/update_header_account/${headerAccount.id}/`, data, CONFIG);
      navigate({pathname: `/accounting/viewaccounting/chartsofaccounts/headeraccount/${headerAccount.id}`});
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

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting, errors, setFieldValue}) => (
        <Form>
          <NonFieldErrors errors={errors}>
            <div className='divider divider-info'>
              <span>Header Account Information</span>
            </div>
            <CustomInput label='General Ledger Name' name='general_ledger_name' type='text' required/>
            <CustomInput label='General Ledger Code' name='general_ledger_code' type='text' required/>
            <CustomSelect label='Account Type' name='account_type'>
              <option value=''>------</option>
              <option value='ASSET'>ASSET</option>
              <option value='LIABILITY'>LIABILITY</option>
              <option value='EQUITY'>EQUITY</option>
              <option value='INCOME'>INCOME</option>
              <option value='EXPENSE'>EXPENSE</option>
            </CustomSelect>
            <CustomDatePicker label='Account Date' name='date_created' setFieldValue={setFieldValue} required/>
            <CustomTextField label='Description' name='description'/>
            <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
            <div style={{display:'flex', justifyContent: 'flex-end'}}> 
              <SubmitButton isSubmitting={isSubmitting}/>
            </div>
          </NonFieldErrors>
        </Form>
      )}
    </Formik>
  )
}

export default EditHeaderAccount;