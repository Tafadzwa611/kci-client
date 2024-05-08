import React from 'react';

function Identity({app}) {
  return (
    <div style={{display:'block'}}>
      <div style={{padding:'1.5rem'}} className='miniLoanDetails-container'>
        <div style={{border:'none'}}>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div className='table__height'>
              <table className='table' id='clients'>
                <thead>
                  <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                    <th style={{textAlign:'start'}}>Id Number</th>
                    <th style={{textAlign:'start'}}>Id Template Name</th>
                    <th style={{textAlign:'start'}}>Id Issuer</th>
                    <th style={{textAlign:'start'}}>Id Format</th>
                  </tr>
                </thead>
                <tbody>
                  {app.id_nums.map(id => {
                    return (
                      <tr key={id.id_number}>
                        <td>{id.id_number}</td>
                        <td>{id.id_template__id_type}</td>
                        <td>{id.id_template__issuer}</td>
                        <td>{id.id_template__template}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Identity;