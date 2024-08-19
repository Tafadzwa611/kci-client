import React from 'react';

function Table({approvals}) {
  return (
    <div style={{display: 'block'}}>
      <div style={{padding: '0', border: 'none'}}>
        <div style={{width: '100%', overflowX: 'auto'}}>
          <div className='table__height'>
            <table className='table' id='payments'>
              <thead>
                <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                  <th style={{textAlign: 'start'}}>Status</th>
                  <th style={{textAlign: 'start'}}>Reference</th>
                </tr>
              </thead>
            <tbody>
              {approvals.approvals ?
              <>
                {approvals.approvals.map(approval => {
                  return (
                    <tr key={approval.id}>
                      <td style={{verticalAlign:'middle'}}>{approval.status} {approval.fail_reason}</td>
                      <td style={{verticalAlign:'middle'}}>{approval.reference}</td>
                    </tr>
                  )
                })}
              </> : 
              <>
                <tr>
                  <td style={{textAlign:'center'}}>No Data</td>
                </tr>
              </>}
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table;