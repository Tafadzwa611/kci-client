import React from 'react';
import axios from 'axios';
import {
  getParams
} from '../../../../utils/utils';
import { useBranches } from '../../../../contexts/BranchesContext';
import { useCurrencies } from '../../../../contexts/CurrenciesContext';
import {
  CustomDatePickerFilter,
  CustomSelectFilter,
  SubmitButtonFilter
} from '../../../../common';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';


function Budgets() {
  const [budgets, setBudgets] = React.useState([]);

  return (
    <div>
      <div style={{margin:'20px 0'}}>
        <button type='button' className='btn btn-success'>
          <Link to='/users/admin/manageexps/addbudget'>Add Budget</Link>
        </button>
      </div>
      <Filter setBudgets={setBudgets} />
      <div style={{paddingTop: '2rem'}}></div>
      <div className='table-responsive font-12'>
        <table className='table table-hover'>
          <tbody>
            <tr className='journal-details header'>
              <th>Date_Created</th>
              <th>Created_By</th>
              <th>Branch</th>
              <th>Month</th>
              <th>Currency</th>
              <th>Limit</th>
              <th>Expense_Account</th>
              <th>Action</th>
            </tr>
            {budgets.map((bd) => (
              <tr className='table-row' key={bd.id}>
                <td>{bd.date_created}</td>
                <td>{bd.created_by}</td>
                <td>{bd.branch.name}</td>
                <td>{bd.month}</td>
                <td>{bd.currency.name}</td>
                <td>{bd.limit}</td>
                <td>{bd.expense_account.general_ledger_name}</td>
                <td>
                  <Link to={`/users/admin/manageexps/budget-details/${bd.id}`}>
                    View
                  </Link><br/>
                  <Link to={`/users/admin/manageexps/delete-budget/${bd.id}`}>
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Filter({setBudgets}) {
  const {branches} = useBranches();
  const {currencies} = useCurrencies();

  const onSubmit = async (values, actions) => {
    try {
      const params = getParams(values);
      const response = await axios.get('/expensesapi/list_budgets/', {params: params});
      setBudgets(response.data);
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
    <Formik initialValues={{ branch_id: '', currency_id: '', min_date: '', max_date: '' }} onSubmit={onSubmit}>
      {({ isSubmitting, setFieldValue }) => (
        <div className='search_background'>
          <div className='row-containers sf-shellwrap'>
            <Form>
              <div className='row row-payments row-loans sf-card'>
                <div className='sf-row sf-row-3'>
                  <div className="row-payments-container sf-w-49">
                    <CustomDatePickerFilter
                      label="Min Date"
                      name="min_date"
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <div className="row-payments-container sf-w-49">
                    <CustomDatePickerFilter
                      label="Max Date"
                      name="max_date"
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <div className='row-payments-container sf-w-49'>
                    <CustomSelectFilter label='Branch' name='branch_id' required>
                      <option value=''>------</option>
                      {branches.map(branch => (
                        <option key={branch.id} value={branch.id}>
                          {branch.name}
                        </option>
                      ))}
                    </CustomSelectFilter>
                  </div>

                  <div className='row-payments-container sf-w-49'>
                    <CustomSelectFilter label='Currency' name='currency_id' required>
                      <option value=''>------</option>
                      {currencies.map(currency => (
                        <option key={currency.id} value={currency.id}>
                          {currency.fullname}
                        </option>
                      ))}
                    </CustomSelectFilter>
                  </div>
                </div>
              </div>

              <div className='sf-submit'>
                <SubmitButtonFilter isSubmitting={isSubmitting}/>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default Budgets;