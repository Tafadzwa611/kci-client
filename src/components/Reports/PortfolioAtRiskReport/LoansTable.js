import React from 'react';
import { Link } from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Pager from './Pager';

function LoansTable({loans, currency, loggedInUser, par_name, params, setLoans}) {
  return (
    <div className='row'>
      <div className='col-12'>
        <div>
          <TableHeader loans={loans} params={params} setLoans={setLoans} />
          <div className='table-responsive p-0' style={{maxHeight: '600px', marginTop:"1rem"}}>
            <table className='table' id='ageing_analyis_report'>
              <thead>
                <tr className="journal-details header">
                  <th>Loan #</th>
                  <th>Client</th>
                  <th>Client_Phone_Number</th>
                  <th>Last_Default_Date</th>
                  <th>Total_Principal_Due</th>
                  <th>Total_Interest_Due</th>
                  <th>Total_Penalty_Due</th>
                  <th>Overdue_Balance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loans.loans_in_arrears.length > 0 ? loans.loans_in_arrears.map(loan => {
                  return (
                    <tr className='tr-class' key={loan.id}>
                      <td>
                        <span style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>
                          <Link to={`/loans/viewloans/loandetails/cli/${loan.is_sub_loan ? loan.main_loan : loan.id}`}>
                            {loan.loan_id} {loan.is_sub_loan ? <button className='badge badge-info'>Solidarity</button> : null}
                          </Link>
                        </span>
                      </td>
                      <td className='td-class'>
                        <div title={loan.client}>
                          {loan.client.length >14 ? `${loan.client.slice(0, 15)}...`: loan.client}
                        </div>
                      </td>
                      <td>{currency} {loan.client_phone_number}</td>
                      <td>{convertDate(loan.last_default_date)} <em>({days(loan.last_default_date)} days late.)</em></td>
                      <td>{currency} {loan.principal_amount_due}</td>
                      <td>{currency} {loan.interest_amount_due}</td>
                      <td>{currency} {loan.penalty}</td>
                      <td>{currency} {loan.amount_due}</td>
                      <td><small className={statusClasses[loan.status]} style={{margin: '3px'}}>{loan.status}</small></td>
                    </tr>
                  )
                }) : <tr><td colSpan={10} style={{textAlign: 'center'}}>No loans could be found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function convertDate(date_str) {
  if (date_str === '' || date_str === null) {
    return date_str
  }
  const temp_date = date_str.split(/[//-]/);
  if (date_str.includes('-')) {
    return temp_date[2] + ' ' + months[Number(temp_date[1]) - 1] + ' ' + temp_date[0]
  }
  return temp_date[1] + ' ' + months[Number(temp_date[0]) - 1] + ' ' + temp_date[2]
}

const days = (dateStr) => {
  let date_1 = new Date(dateStr);
  let date_2 = new Date();
  let difference = date_1.getTime() - date_2.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return Math.abs(TotalDays);
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
        <Pager
          nextPageNumber={loans.next_page_num}
          params={params}
          loadMoreLoans={() => console.log('loadMoreLoans')}
          loadingMore={false}
          prevPageNumber={loans.prev_page_num}
          setLoans={setLoans}
        />
        <div style={{marginTop:'6px'}}>Showing {loans.loans_in_arrears.length} of {loans.count} loans.</div>
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
export default LoansTable;