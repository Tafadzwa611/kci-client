import React, { useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from 'axios';

function LoansTable({loans, currency, params, setLoans}) {
  return (
    <div className='row'>
      <div className='col-12'>
        <div>
          <TableHeader loans={loans} params={params} setLoans={setLoans} />
          <div className='table-responsive p-0' style={{maxHeight: '600px', marginTop:"1rem"}}>
            <table className='table' id='ageing_analyis_report'>
              <thead>
                <tr className="journal-details header" style={{position:'sticky', top:'0'}}>
                  <th>Loan_#</th>
                  <th>Client</th>
                  <th>Client_Phone_Number</th>
                  <th>Group</th>
                  <th>Group_Phone_Number</th>
                  <th>Branch</th>
                  <th>Last_Default_Date</th>
                  <th>Days_In_Arrears</th>
                  <th>Principal_At_Risk ({currency})</th>
                  <th>Overdue_Balance ({currency})</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loans.loans_in_arrears.map(loan => {
                  return (
                    <tr className='tr-class' key={loan.loan_id}>
                      <td>{loan.loan_num}</td>
                      <td>{loan.client_fullname}</td>
                      <td>{loan.client_phone_number}</td>
                      <td>{loan.group_name}</td>
                      <td>{loan.group_phone_number}</td>
                      <td>{loan.branch_name}</td>
                      <td>{loan.last_default_date}</td>
                      <td>{loan.days_in_arrears}</td>
                      <td>{loan.principal_at_risk}</td>
                      <td>{loan.overdue_balance}</td>
                      <td><small className={statusClasses[loan.status]} style={{margin: '3px'}}>{loan.status}</small></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const statusClasses = {
  'Fully Paid': 'badge badge-success',
  'Early Settlement': 'badge badge-success',
  'Restructured': 'badge badge-dark',
  'Processing': 'badge badge-info-lighter',
  'Arrears': 'badge badge-danger',
  'Approved': 'badge badge-info-light',
  'Open': 'badge badge-info',
  'Over Paid': 'badge badge-warning',
  'Defaulted': 'badge badge-danger',
  'Rejected': 'badge badge-danger',
  'Written-Off': 'badge badge-dark',
}

const TableHeader = ({loans, params, setLoans}) => {
  return (
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager nextPageNumber={loans.next_page_num} params={params} prevPageNumber={loans.prev_page_num} setLoans={setLoans}/>
        <div style={{marginTop:'12px'}}>Showing {loans.loans_in_arrears.length} of {loans.count} loans.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {loans.number} of {loans.num_of_pages}</div>
        <div>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='btn btn-default'
            table='ageing_analyis_report'
            filename='ageing_analyis_report'
            sheet='tablexls'
            buttonText='Download as XLS'
          />
        </div>
      </div>
    </div>
  )
}

const Pager = ({prevPageNumber, nextPageNumber, setLoans, params}) => {
  const [errors, setErrors] = useState(null);

  const onClick = async (evt) => {
    try {
      const pageNum = evt.target.innerText === 'Next' ? nextPageNumber : prevPageNumber;
      params.set('page_num', pageNum);
      const response = await axios.get('/reportsapi/ageing-report/', {params: params});
      setLoans(response.data);
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
      {prevPageNumber && <><button className='btn btn-default' onClick={onClick}>Back</button><br/></>}
      {nextPageNumber ? <button className='btn btn-default' onClick={onClick}>Next</button>: null}
    </div>
  )
}

export default LoansTable;