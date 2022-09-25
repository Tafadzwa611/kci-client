import React from 'react';

function LoansTable({loans, currencyIso}) {
  return (
    <div className='row'>
      <div className='col-12'>
        <div>
              <span>Loans List</span>
          <div className='table-responsive p-0' style={{maxHeight: '600px'}}>
            <table className='table'>
              <thead>
                <tr className="journal-details header">
                  <th>Loan #</th>
                  <th>Client</th>
                  <th>Last Default Date</th>
                  <th>Total Principal Due</th>
                  <th>Total Interest Due</th>
                  <th>Total Penalty Due</th>
                  <th>Overdue Balance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loans.length > 0 ? loans.map(loan => {
                  return (
                    <tr className='tr-class' key={loan.id}>
                      <td><a href={`/loans/loan_detail/${loan.id}`}>{loan.loan_id}</a></td>
                      <td className='td-class'>
                        <div title={loan.client}>
                          {loan.client.length >14 ? `${loan.client.slice(0, 15)}...`: loan.client}
                        </div>
                      </td>
                      <td>{convertDate(loan.last_default_date)} <em>({days(loan.last_default_date)} days late.)</em></td>
                      <td>{currencyIso} {loan.principal_amount_due}</td>
                      <td>{currencyIso} {loan.interest_amount_due}</td>
                      <td>{currencyIso} {loan.penalty}</td>
                      <td>{currencyIso} {loan.amount_due}</td>
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
    'Arrears': 'badge badge-info-light',
    'Open': 'badge badge-info',
    'Over Paid': 'badge badge-warning',
    'Defaulted': 'badge badge-danger',
    'Rejected': 'badge badge-danger',
    'Written-Off': 'badge badge-dark',
}

export default LoansTable;