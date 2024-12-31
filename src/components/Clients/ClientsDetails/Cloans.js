import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import {
  CustomSelectFilter,
  SubmitButtonFilter,
  NonFieldErrors
} from '../../../common';
import axios from 'axios';
import { useCurrencies } from '../../../contexts/CurrenciesContext';

export const statusClasses = {
  'Fully Paid': 'badge badge-success',
  'Early Settlement': 'badge badge-success',
  'Refinanced': 'badge badge-success',
  'Restructured': 'badge badge-dark',
  'Processing': 'badge badge-info-lighter',
  'Arrears': 'badge badge-danger',
  'Approved': 'badge badge-info-light',
  'Open': 'badge badge-info',
  'Over Paid': 'badge badge-warning',
  'Defaulted': 'badge badge-danger',
  'Rejected': 'badge badge-danger',
  'Written-Off': 'badge badge-dark',
};

function Cloans({client}) {
  const [clientsLoansData, setClientsLoansData] = useState({
    count: 0,
    next_page_num: null,
    prev_page_num: null,
    number: null,
    num_of_pages: null,
    loans: []
  });
  const [params, setParams] = useState(null);

  return (
    <>
      <div style={{padding:'1.5rem'}} className='miniLoanDetails-container'>
        <Filter client={client} setClientsLoansData={setClientsLoansData} setParams={setParams} />
      </div>
        <TableHeader loanData={clientsLoansData} params={params} setLoanData={setClientsLoansData} client={client}/>
        <ClientLoans clientsLoansData={clientsLoansData} />
    </>
  )
}

const ClientLoans = ({clientsLoansData}) => {
  return (
    <div style={{display:'block'}}>
      <div style={{padding:'1.5rem'}} className='miniLoanDetails-container'>
        <div style={{border:'none'}}>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div className='table__height'>
              <table className='table' id='sms'>
                <thead>
                  <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                    <th style={{textAlign:'start'}}>Account Number</th>
                    <th style={{textAlign:'start'}}>Product</th>
                    <th style={{textAlign:'start'}}>Currency</th>
                    <th style={{textAlign:'start'}}>Disbursement Date</th>
                    <th style={{textAlign:'start'}}>Maturity Date</th>
                    <th style={{textAlign:'start'}}>Balance</th>
                    <th style={{textAlign:'start'}}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {clientsLoansData.loans.map(loan => {
                    return (
                      <tr key={loan.id}>
                        <td>
                          <span style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>
                            <Link to={`/loans/viewloans/loandetails/cli/${loan.is_sub_loan ? loan.main_loan : loan.id}`}>
                              {loan.loan_id} {loan.is_sub_loan ? <button className='badge badge-info'>Solidarity</button> : null}
                            </Link>
                          </span>
                        </td>
                        <td>{loan.loan_product__name}</td>
                        <td>{loan.currency__shortname}</td>
                        <td>{loan.db_date}</td>
                        <td>{loan.final_date}</td>
                        <td>{loan.total_balance}</td>
                        <td><button className={statusClasses[loan.status]}>{loan.status}</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TableHeader = ({loanData, params, setLoanData, client}) => {
  return (
    <div className='table-header' style={{padding:'1rem 0px 0.5rem'}}>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager
          nextPageNumber={loanData.next_page_num}
          params={params}
          loadMoreLoans={() => console.log('loadMoreLoans')}
          loadingMore={false}
          prevPageNumber={loanData.prev_page_num}
          setLoanData={setLoanData}
          client={client}
        />
        <div style={{marginTop:'6px'}}>Showing {loanData.loans.length} of {loanData.count} loans.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {loanData.number} of {loanData.num_of_pages}</div>
      </div>
    </div>
  )
}

const Pager = ({
  prevPageNumber,
  nextPageNumber,
  setLoanData,
  params,
  client
}) => {
  const [errors, setErrors] = useState(null);

  const onClick = async (evt) => {
    try {
      const pageNum = evt.target.innerText === 'Next' ? nextPageNumber : prevPageNumber;
      const response = await axios.get((`/clientsapi/get_client_loans/${client.id}/?currency_id=${params.currency_id}&page_num=${pageNum}`));
      setLoanData(response.data);
    } catch (error) {
      if (error.message === 'Network Error') {
        setErrors({detail: 'Network Error'});
      } else {
        setErrors({detail: 'Server Error'});
      }
    }
  }

  return (
    <div className='footer-container font-12 text-light' style={{display:'flex', columnGap:'3px'}}>
      {errors && JSON.stringify(errors)}
      {prevPageNumber && <><button className='btn btn-default client__details' onClick={onClick}>Back</button><br/></>}
      {nextPageNumber && <button className='btn btn-default client__details' onClick={onClick}>Next</button>}
    </div>
  )
}


const Filter = ({ client, setClientsLoansData, setParams}) => {
  const initialValues = {
    page_num: 1,
    currency_id: ''
  };

  const {currencies} = useCurrencies();


  const onSubmit = async (values, actions) => {
    try {
      setParams(values);
      const response = await axios.get((`/clientsapi/get_client_loans/${client.id}/?currency_id=${values.currency_id}&page_num=${values.page_num}`));
      setClientsLoansData(response.data);
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
      {({isSubmitting, errors}) => (
        <div className='search_background'>
          <div className='row-containers' style={{border:'none'}}>
            <Form>
              <NonFieldErrors errors={errors}>
                <div className='row row-payments row-loans'>
                  <div className='row-payments-container' style={{width:'90%'}}>
                    <CustomSelectFilter label='Currency' name='currency_id' required>
                        <option value=''>------</option>
                        {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                    </CustomSelectFilter>
                  </div>
                  <SubmitButtonFilter isSubmitting={isSubmitting}/>
                </div>
              </NonFieldErrors>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Cloans