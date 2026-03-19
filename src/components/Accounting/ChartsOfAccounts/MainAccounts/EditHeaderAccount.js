import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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

function EditHeaderAccount() {
  const params = useParams();

  return (
    <Fetcher urls={[`/acc-api/get_header_account/${params.headerAccountId}/`]}>
      {({ data }) => <EditHeaderAccountForm headerAccount={data[0]} />}
    </Fetcher>
  );
}

const EditHeaderAccountForm = ({ headerAccount }) => {
  const navigate = useNavigate();

  const initialValues = {
    general_ledger_code: headerAccount.general_ledger_code,
    general_ledger_name: headerAccount.general_ledger_name,
    account_type: headerAccount.account_type,
    date_created: headerAccount.account_date,
    description: headerAccount.description || ''
  };

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };
      const data = removeEmptyValues(values);
      await axios.put(`/acc-api/update_header_account/${headerAccount.id}/`, data, CONFIG);
      navigate({
        pathname: `/accounting/viewaccounting/chartsofaccounts/headeraccount/${headerAccount.id}`
      });
    } catch (error) {
      console.log(error);
      if (error.message === 'Network Error') {
        actions.setErrors({ responseStatus: 'Network Error' });
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else {
        actions.setErrors({ responseStatus: error.response.status });
      }
    }
  };

  return (
    <div className='sf-page'>
      <div style={{ marginBottom: 12 }}>
        <button type='button' className='btn btn-default max'>
          <Link to={`/accounting/viewaccounting/chartsofaccounts/headeraccount/${headerAccount.id}`}>
            Back
          </Link>
        </button>
      </div>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, errors, setFieldValue }) => (
          <Form className='sf-form'>
            <NonFieldErrors errors={errors}>
              <div className='sf-shell'>
                <div className='sf-shell-head'>
                  <div className='sf-shell-title'>Header Account</div>
                  <div className='sf-shell-subtitle'>
                    Update the header account details, account type, date, and description.
                  </div>
                </div>

                <div className='sf-shell-body'>
                  <section className='sf-section'>
                    <div className='sf-section-head'>
                      <div className='sf-section-title'>Header account information</div>
                      <div className='sf-section-hint'>
                        Edit the ledger name, code, account classification, and supporting description.
                      </div>
                    </div>

                    <div className='sf-section-body sf-stack'>
                      <CustomInput
                        label='General Ledger Name'
                        name='general_ledger_name'
                        type='text'
                        required
                      />

                      <CustomInput
                        label='General Ledger Code'
                        name='general_ledger_code'
                        type='text'
                        required
                      />

                      <CustomSelect label='Account Type' name='account_type'>
                        <option value=''>------</option>
                        <option value='ASSET'>ASSET</option>
                        <option value='LIABILITY'>LIABILITY</option>
                        <option value='EQUITY'>EQUITY</option>
                        <option value='INCOME'>INCOME</option>
                        <option value='EXPENSE'>EXPENSE</option>
                      </CustomSelect>

                      <CustomDatePicker
                        label='Account Date'
                        name='date_created'
                        setFieldValue={setFieldValue}
                        required
                      />

                      <CustomTextField label='Description' name='description' />
                    </div>
                  </section>
                </div>

                <div className='sf-shell-footer'>
                  <SubmitButton isSubmitting={isSubmitting} />
                </div>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditHeaderAccount;