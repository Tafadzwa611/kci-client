import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function SolidarityMainTable({loanData, handleClick}) {
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
                    <th>Group Name</th>
                    <th>Principal</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map(loan => {
                    return (
                      <tr className='tr-class' key={loan.id}>
                        <td>
                          <span onClick={handleClick} id={loan.id} style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>
                            {loan.group_name}
                          </span>
                        </td>
                        <td>{loan.principal}</td>
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

export default SolidarityMainTable;