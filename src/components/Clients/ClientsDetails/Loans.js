import React from 'react';
import { Link } from 'react-router-dom';

export const statusClasses = {
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
};

function Loans({client}) {
  return (
    <div style={{padding:'1.5rem'}} className='miniLoanDetails-container'>
      <div style={{border:'none'}}>
        <div style={{width:'100%', overflowX:'auto'}}>
          <div className='table__height'>
            <table className='table' id='clients'>
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
                {client.loans.map(loan => {
                  return (
                    <tr key={loan.id}>
                      <td>
                        <span style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>
                          <Link to={`/loans/viewloans/loandetails/cli/${loan.id}`}>{loan.loan_id}</Link>
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
  )
}

export default Loans;