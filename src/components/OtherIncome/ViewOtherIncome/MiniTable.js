import React from 'react';

function MiniTable({otherIncomeData, handleClick, selectedIncomeId}) {
  const {otherincomes, count} = otherIncomeData;

  return (
    <>
      <div style={{display:'block'}}>
        <div style={{padding:'0', border:'none'}}>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div className='table__height'>
              <table className='table' id='loans'>
                <thead>
                  <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                    <th>Other_Income_Type</th>
                    <th>Other_Income_Name</th>
                  </tr>
                </thead>
                <tbody>
                  {otherincomes.map(income => {
                    return (
                      <tr className='tr-class' key={income.id}>
                        <td>
                            {income.inc_type}
                        </td>
                        <td>
                          {(selectedIncomeId==income.id) ?
                            <span onClick={handleClick} id={income.id} style={{fontSize:'0.75rem', cursor:'pointer', color: 'red'}} className='link'>{income.otherincome_name}</span>:
                            <span onClick={handleClick} id={income.id} style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>{income.otherincome_name}</span>
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

export default MiniTable;