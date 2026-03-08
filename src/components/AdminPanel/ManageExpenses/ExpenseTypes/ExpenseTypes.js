import React from 'react';
import axios from 'axios';
import { removeEmptyValues, getParams } from '../../../../utils/utils';
import { useBranches } from '../../../../contexts/BranchesContext';
import { Form, Formik } from 'formik';
import {
  CustomSelectFilter,
  SubmitButtonFilter
} from '../../../../common';
import { Link } from 'react-router-dom';

function ExpenseTypes() {
  const [expenseTypes, setExpenseTypes] = React.useState(null);

  React.useEffect(() => {
    document.title = 'Expense Types - Admin Panel';
  }, []);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('/expensesapi/expensetypeslist/?header=1');
      setExpenseTypes(response.data);
    }
    fetch();
  }, []);

  if (!expenseTypes) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div style={{margin:'20px 0'}}>
        <button type='button' className='btn btn-success'>
          <Link to='/users/admin/manageexps/addtype'>Add Expense Type</Link>
        </button>
      </div>
      <Filter setExpenseTypes={setExpenseTypes} />
      <div style={{paddingTop: '2rem'}}></div>
      <div className='table-responsive font-12'>
        <table className='table table-hover'>
          <tbody>
            <tr className='journal-details header'>
              <th>Name</th>
              <th>Date_Created</th>
              <th>Currency_Name</th>
              <th>Branch_Name</th>
              <th>Created_By</th>
              <th>Expense_Account_Name</th>
              <th>Payable_Account_Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>  
            {expenseTypes.map((et) => (
              <tr className='table-row' key={et.id}>
                <td>{et.name}</td>
                <td>{et.account_date}</td>
                <td>{et.currency_shortname}</td>
                <td>{et.branch_name ? et.branch_name : 'Consolidated'}</td>
                <td>{et.created_by_name}</td>
                <td>{et.expense_account_name}</td>
                <td>{et.payable_account_name}</td>
                <td>{et.is_active ? 'Active' : 'Inactive'}</td>
                <td>
                  {!et.branch_id && (
                    <Link to={`/users/admin/manageexps/edittypes/${et.id}`}>
                      Edit
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Filter({setExpenseTypes}) {
  const {branches} = useBranches();

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);
      const url = (
        params.size === 0 ? 
        '/expensesapi/expensetypeslist/?header=1' : 
        '/expensesapi/expensetypeslist/'
      );
      const response = await axios.get(url, {params: params});
      setExpenseTypes(response.data);
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
    <Formik initialValues={{branch_id: ''}} onSubmit={onSubmit}>
      {({isSubmitting}) => (
        <div className='search_background'>
          <div className='row-containers' style={{border:'none'}}>
            <Form>
                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                  <div className='row-payments-container' style={{width:'19%'}}>
                    <CustomSelectFilter label='Branch' name='branch_id'>
                      <option value=''>------</option>
                      {branches.map(branch => <option key={branch.id} value={branch.id}>{branch.name}</option>)}
                    </CustomSelectFilter>
                  </div>
                </div>
                <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
                  <SubmitButtonFilter isSubmitting={isSubmitting}/>
                </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default ExpenseTypes;
