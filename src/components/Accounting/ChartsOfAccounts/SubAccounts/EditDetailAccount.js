import React from 'react';
import { Link } from 'react-router-dom';
import {
  CustomInput,
  NonFieldErrors,
  CustomTextField,
  SubmitButton,
  CustomCheckbox,
  Fetcher
} from '../../../../common';
import { Form, Formik } from 'formik';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../../utils/utils';
import { useNavigate } from 'react-router-dom';

function EditDetailAccount() {
  const params = useParams();
  return (
    <Fetcher urls={['/acc-api/main-accounts-list/', '/usersapi/branch-list/', `/acc-api/sub-account-details/${params.detailAccountId}/`]}>
      {({data}) => <EditDetailAccountForm headerAccounts={data[0]} branches={data[1]} detailAccount={data[2]}/>}
    </Fetcher>
  )
}

const EditDetailAccountForm = ({detailAccount}) => {
  const initialValues = {
    update_all_branches: true,
    general_ledger_name: detailAccount.general_ledger_name,
    general_ledger_code: detailAccount.general_ledger_code,
    suspended: detailAccount.suspended,
    description: detailAccount.description || '',
    header_account_id: detailAccount.header_account_id || ''
  };

  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const data = removeEmptyValues(values);
      await axios.put(`/acc-api/update_detail_account/${detailAccount.id}/`, data, CONFIG);
      navigate({pathname: `/accounting/viewaccounting/chartsofaccounts/detailaccount/${detailAccount.id}`});
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
    <>
      <div>
        <button type='button' className='btn btn-default max'>
          <Link to={`/accounting/viewaccounting/chartsofaccounts/detailaccount/${detailAccount.id}`}>Back</Link>
        </button>
      </div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, errors}) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='divider divider-info'>
                <span>Detail Account Information</span>
              </div>
              <CustomInput label='General Ledger Name' name='general_ledger_name' type='text' required/>
              <CustomInput label='General Ledger Code' name='general_ledger_code' type='text' required/>
              <CustomCheckbox label='Is Suspended' name='suspended'/>
              <CustomTextField label='Description' name='description'/>
              <CustomCheckbox label='Update All Branches' name='update_all_branches'/>
              <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
              <div style={{display:'flex', justifyContent: 'flex-end'}}> 
                <SubmitButton isSubmitting={isSubmitting}/>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default EditDetailAccount;