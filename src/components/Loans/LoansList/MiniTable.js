import React from 'react';
import { statusClasses } from './data';

function MiniTable({loanData, handleClick, selectedLoanId}) {
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
                    <th>Loan</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map(loan => {
                    return (
                      <tr className='tr-class' key={loan.id}>
                        <td>
                          {(selectedLoanId==loan.id) ?
                            <span onClick={handleClick} id={loan.id} style={{fontSize:'0.75rem', cursor:'pointer', color: 'red'}} className='link'>{loan.loan_id}</span>:
                            <span onClick={handleClick} id={loan.id} style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>{loan.loan_id}</span>}
                            <span className={statusClasses[loan.status]}>{loan.status}</span>
                        </td>
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

export default MiniTable;