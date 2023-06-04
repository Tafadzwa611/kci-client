import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function MainTable({otherIncomeData, handleClick}) {
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
                    <th style={{textAlign:"start"}}>Other_Income_Type</th>
                    <th style={{textAlign:"start"}}>Other_Income_Name</th>
                    <th style={{textAlign:"start"}}>Other_Income_Date</th>
                    <th style={{textAlign:"start"}}>Date_Created</th>
                    <th style={{textAlign:"start"}}>Other_Income_Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {otherincomes.map(income => {
                    return (
                      <tr key={income.id}>
                        <td style={{verticalAlign:"middle"}}>{income.inc_type}</td>
                        <td style={{verticalAlign:"middle"}}><span onClick={handleClick} id={income.id} style={{fontSize:"0.75rem", cursor:"pointer"}} className="link">{income.otherincome_name}</span></td>
                        <td style={{verticalAlign:"middle"}}>{income.db_income_date}</td>
                        <td style={{verticalAlign:"middle"}}>{income.db_date_created}</td>
                        <td style={{verticalAlign:"middle"}}>{income.currency} {income.income_amount}</td>
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