import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { statusClasses, getDuration } from './data';

function MainTable({loanData, handleClick}) {
  const {loans, count} = loanData;

  return (
    <>
      <div className='table-header'>
        <div>
          Showing {loans.length} of {count} loans.
        </div>
        <div>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='btn btn-default'
            table='loans'
            filename='loans'
            sheet='tablexls'
            buttonText='Download as XLS'
          />
        </div>
      </div>
      <div style={{display:'block'}}>
        <div style={{padding:'0', border:'none'}}>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div className='table__height'>
              <table className='table' id='loans'>
                <thead>
                  <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                    <th>Client</th>
                    <th>Loan_Number</th>
                    <th>Date_Disbursed</th>
                    <th>Interest_Rate</th>
                    <th>Repayment_Cycle</th>
                    <th>Loan_Duration</th>
                    <th>Principal</th>
                    <th>Interest</th>
                    <th>Penalty</th>
                    <th>Principal_Amount_Due</th>
                    <th>Interest_Amount_Due</th>
                    <th>Penalty_Amount_Due</th>
                    <th>Amount_Due_At_Maturity</th>
                    <th>Amount_Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map(loan => {
                    return (
                      <tr className='tr-class' key={loan.id}>
                        <td className='td-class'>
                          <div title={loan.client}>
                            <span id={loan.client_id}>
                              {loan.client}
                            </span>
                          </div>
                        </td>
                        <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: '5px'}}>
                          <span onClick={handleClick} id={loan.id} style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>{loan.loan_id}</span>
                          <span className={statusClasses[loan.status]} style={{marginBottom:'3px'}}>{loan.status}</span>
                        </td>
                        <td>{loan.loan_added_on}</td>
                        <td>{loan.interest_rate}%</td>
                        <td>{loan.repayment_cycle}</td>
                        <td>{getDuration(loan.repayment_cycle, loan.number_of_repayments)}</td>
                        <td>{parseFloat(loan.principal).toFixed(2)}</td>
                        <td>{parseFloat(loan.interest).toFixed(2)}</td>
                        <td>{parseFloat(loan.penalty_reference).toFixed(2)}</td>
                        <td>{parseFloat(loan.principal_amount_due).toFixed(2)}</td>
                        <td>{parseFloat(loan.interest_amount_due).toFixed(2)}</td>
                        <td>{parseFloat(loan.penalty).toFixed(2)}</td>
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