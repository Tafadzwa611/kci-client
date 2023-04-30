import React from 'react';
import { statusClasses, getDuration } from './data';

function MainTable({loanData, handleClick}) {
  const {loans} = loanData;

  return (
    <>
      <div style={{display:'block'}}>
        <div style={{padding:'0', border:'none'}}>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div className='table__height'>
              <table className='table' id='loans'>
                <thead>
                  <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                    <th>Client_Name</th>
                    <th>Group_Name</th>
                    <th>Loan_Number</th>
                    <th>Status</th>
                    <th>Date_Disbursed</th>
                    <th>Interest_Rate</th>
                    <th>Loan_Duration</th>
                    <th>Principal</th>
                    <th>Interest</th>
                    <th>Penalty</th>
                    <th>Fees</th>
                    <th>Principal_Amount_Due</th>
                    <th>Interest_Amount_Due</th>
                    <th>Penalty_Amount_Due</th>
                    <th>Fees_Due</th>
                    <th>Amount_Due_At_Maturity</th>
                    <th>Amount_Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map(loan => {
                    return (
                      <tr className='tr-class' key={loan.id}>
                        <td className='td-class'><div title={loan.client}><span id={loan.client_pk}>{loan.client_name}</span></div></td>
                        <td className='td-class'><div title={loan.group}><span id={loan.group_pk}>{loan.group_name}</span></div></td>
                        <td>
                          <span onClick={handleClick} id={loan.id} style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>{loan.loan_id}</span>
                        </td>
                        <td>
                          <span className={statusClasses[loan.status]}>{loan.status}</span>
                        </td>
                        <td>{loan.db_date}</td>
                        <td>{loan.interest_rate}%{loan.interest_interval}</td>
                        <td>{getDuration(loan.repayment_cycle, loan.number_of_repayments)}</td>
                        <td>{parseFloat(loan.principal).toFixed(2)}</td>
                        <td>{parseFloat(loan.total_loan_interest).toFixed(2)}</td>
                        <td>{parseFloat(loan.total_loan_penalty).toFixed(2)}</td>
                        <td>{parseFloat(loan.total_loan_non_deduc_fees).toFixed(2)}</td>
                        <td>{parseFloat(loan.principal_amount_due).toFixed(2)}</td>
                        <td>{parseFloat(loan.interest_amount_due).toFixed(2)}</td>
                        <td>{parseFloat(loan.penalty).toFixed(2)}</td>
                        <td>{parseFloat(loan.non_deductable_fees).toFixed(2)}</td>
                        <td>{parseFloat(loan.amount_due_at_maturity).toFixed(2)}</td>
                        <td>{parseFloat(loan.total_amount_paid).toFixed(2)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainTable;