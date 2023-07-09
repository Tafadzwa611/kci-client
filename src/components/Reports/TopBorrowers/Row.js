import React, { useState } from 'react';


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
};

function Row({client, idx, currency, showLoans}) {

  return (
    <>
      <tr key={client.id} className="journal-details">
        <td style={{textAlign: 'left'}}><p style={{fontWeight: "bold"}}>{idx+1}</p></td>
        <td style={{textAlign: 'left'}}>{client.fullname}</td>
        <td style={{textAlign: 'right'}}>{client.branch}</td>
        <td style={{textAlign: 'right'}}>{currency} {client.sum_principal}</td>
        <td style={{textAlign: 'right'}}>{currency} {client.sum_principal_amount_due}</td>
      </tr>
      {showLoans && client.loans.map(loan => {
        return (
          <tr key={loan.loan_id}>
            <td></td>
            <td></td>
            <td style={{textAlign: 'right'}}>
              {loan.loan_id} <small className={statusClasses[loan.status]} style={{margin: '3px'}}>{loan.status}</small>
            </td>
            <td style={{textAlign: 'right'}}>{currency} {loan.principal}</td>
            <td style={{textAlign: 'right'}}>{currency} {loan.principal_amount_due}</td>
          </tr>
        )
      })}
    </>
  )
}

export default Row;