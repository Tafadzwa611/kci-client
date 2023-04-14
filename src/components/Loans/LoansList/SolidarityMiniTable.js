import React from 'react';

function SolidarityMiniTable({loanData, handleClick, selectedLoanId}) {
  const {loans, count} = loanData;

  return (
    <>
      <div style={{display:'block'}}>
        <div style={{padding:'0', border:'none'}}>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div className='table__height'>
              <table className='table' id='loans'>
                <thead>
                  <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                    <th>Group Name</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map(loan => {
                    return (
                      <tr className='tr-class' key={loan.id}>
                        <td>
                          {(selectedLoanId==loan.id) ?
                            <span onClick={handleClick} id={loan.id} style={{fontSize:'0.75rem', cursor:'pointer', color: 'red'}} className='link'>{loan.group_name}</span>:
                            <span onClick={handleClick} id={loan.id} style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>{loan.group_name}</span>
                          }
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

export default SolidarityMiniTable;