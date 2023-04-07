import React from 'react';
import { statusClasses } from './data';

function MiniTable({loanData, handleClick}) {
  const {loans, count} = loanData;

  return (
    <>
      <div className='table-header'>
        <div>
          Showing {loans.length} of {count} loans.
        </div>
      </div>
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
                        <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: '5px'}}>
                          <span onClick={handleClick} id={loan.id} style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>{loan.loan_id}</span>
                          <span className={statusClasses[loan.status]} style={{marginBottom:'3px'}}>{loan.status}</span>
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