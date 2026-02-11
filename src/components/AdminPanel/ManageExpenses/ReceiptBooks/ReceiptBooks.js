import React from 'react';
import { Link } from 'react-router-dom';
import {
  getParams
} from '../../../../utils/utils';
import { useBranches } from '../../../../contexts/BranchesContext';
import { useCurrencies } from '../../../../contexts/CurrenciesContext';
import axios from 'axios';
import { Form, Formik } from 'formik';
import {
  CustomSelectFilter,
  SubmitButtonFilter
} from '../../../../common';


function ReceiptBooks() {
  const [receiptBooks, setReceiptBooks] = React.useState([]);

  return (
    <div>
      <div style={{margin:'20px 0'}}>
        <button type='button' className='btn btn-success'>
          <Link to='/users/admin/manageexps/add-receipt-book'>Add Receipt Book</Link>
        </button>
      </div>
      <Filter setReceiptBooks={setReceiptBooks} />
      <div style={{paddingTop: '2rem'}}></div>
      <div className='table-responsive font-12'>
        <table className='table table-hover'>
          <tbody>
            <tr className='journal-details header'>
              <th>Date_Created</th>
              <th>Created_By</th>
              <th>Branch</th>
              <th>Name</th>
              <th>Currency</th>
              <th>Start_Number</th>
              <th>End_Number</th>
              <th>Next_Number</th>
              <th>Is_Active</th>
              <th>Mode</th>
              <th>Applications</th>
              <th>Action</th>
            </tr>
            {receiptBooks.map((bd) => (
              <tr className='table-row' key={bd.id}>
                <td>{bd.date_created}</td>
                <td>{bd.created_by.name}</td>
                <td>{bd.branch.name}</td>
                <td>{bd.name}</td>
                <td>{bd.currency.name}</td>
                <td>{bd.start_number}</td>
                <td>{bd.end_number}</td>
                <td>{bd.next_number}</td>
                <td>{bd.is_active ? 'Yes' : 'No'}</td>
                <td>{{1: 'Auto', 2: 'Manual'}[bd.mode]}</td>
                <td>
                  {bd.allowed_apps.map(app => (
                    {
                      1: 'Loans',
                      2: 'Payments',
                      3: 'Expenses'
                    }[app]
                    )
                  ).join(', ')}
                </td>
                <td>
                  <Link to={`/users/admin/manageexps/receipt-book-details/${bd.id}`}>
                    View
                  </Link><br/>
                  <Link to={`/users/admin/manageexps/update-receipt-book/${bd.id}`}>
                    Edit
                  </Link><br/>
                  <Link to={`/users/admin/manageexps/delete-receipt-book/${bd.id}`}>
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

function Filter({setReceiptBooks}) {
  const {branches} = useBranches();
  const {currencies} = useCurrencies();

  const onSubmit = async (values, actions) => {
    try {
      const params = getParams(values);
      const response = await axios.get('/loansapi/receipt_books/', {params: params});
      setReceiptBooks(response.data);
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
    <Formik initialValues={{ branch_id: '', currency_id: '', is_active: true }} onSubmit={onSubmit}>
      {({isSubmitting}) => (
        <div className='search_background'>
          <div className='row-containers' style={{border:'none'}}>
            <Form>
              <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                <div className='row-payments-container' style={{width:'19%'}}>
                  <CustomSelectFilter label='Branch' name='branch_id' required>
                    <option value=''>------</option>
                    {branches.map(branch => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  </CustomSelectFilter>
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

export default ReceiptBooks;