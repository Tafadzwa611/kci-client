import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomInput,
  CustomDatePicker,
  Fetcher,
  SubmitButton,
  CustomMultiSelect,
  CustomCheckbox,
  CustomSelect
} from '../../../../common';
import { useNavigate } from 'react-router-dom';
import { useBranches } from '../../../../contexts/BranchesContext';


function AddBranch() {
  const initialValues = {
    name: '',
    geographical_location: '',
    branch_code: '',
    date_of_opening: '',
    coa_branch_id: '',
    is_rural: false,
    loan_products: [],
    currencies: [],
  };
  const navigate = useNavigate();
  const { branches } = useBranches();

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const data = {
        ...values,
        available_product_ids: values.loan_products.map(lp => lp.value),
        available_currency_ids: values.currencies.map(c => c.value),
      };
      const response = await axios.post('/usersapi/add_branch/', data, CONFIG);
      navigate({pathname: `/users/admin/managebranches/branch/${response.data.id}`});
      window.location.reload();
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
      <Fetcher urls={['/loansapi/loan_products_list/', '/usersapi/currencieslist/']}>
        {({data}) => (
          <div className='sf-page'>
            <div style={{ marginBottom: 12 }}>
              <button type='button' className='btn btn-default max'>
                <Link to='/users/admin/managebranches'>Back</Link>
              </button>
            </div>

            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {({ isSubmitting, setFieldValue, errors }) => (
                <Form autoComplete='off' className='sf-form'>
                  <NonFieldErrors errors={errors}>
                    <div className='sf-shell'>
                      <div className='sf-shell-head'>
                        <div className='sf-shell-title'>Branch</div>
                        <div className='sf-shell-subtitle'>
                          Create a branch profile with its location, code, opening date, available loan products, and rural status.
                        </div>
                      </div>

                      <div className='sf-shell-body'>
                        <section className='sf-section'>
                          <div className='sf-section-head'>
                            <div className='sf-section-title'>Branch information</div>
                            <div className='sf-section-hint'>
                              Enter the branch details and select any loan products available for this branch.
                            </div>
                          </div>

                          <div className='sf-section-body sf-stack'>
                            <CustomInput label='Name' name='name' type='text' required />
                            <CustomInput label='Geographical Location' name='geographical_location' type='text' />
                            <CustomInput label='Branch Code' name='branch_code' type='text' maxLength='5' required />
                            <CustomDatePicker
                              label='Date of Opening'
                              name='date_of_opening'
                              setFieldValue={setFieldValue}
                              required
                            />
                            <CustomMultiSelect
                              label='Loan Products'
                              setFieldValue={setFieldValue}
                              name='loan_products'
                              options={data[0].map(loanProduct => ({
                                value: loanProduct.id,
                                label: loanProduct.name
                              }))}
                            />
                            <CustomMultiSelect
                              label='Currencies'
                              setFieldValue={setFieldValue}
                              name='currencies'
                              options={data[1].map(currency => ({
                                value: currency.id,
                                label: currency.fullname
                              }))}
                            />
                            <CustomSelect label='Chart Of Accounts' name='coa_branch_id' required>
                            <option value=''>-----</option>
                              {branches.map(br => (
                                <option key={br.id} value={br.id}>
                                  {br.name}
                                </option>
                              ))}
                            </CustomSelect>
                            <CustomCheckbox label='Is Rural' name='is_rural' />
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
        )}
      </Fetcher>
    </>
  )
}

export default AddBranch;