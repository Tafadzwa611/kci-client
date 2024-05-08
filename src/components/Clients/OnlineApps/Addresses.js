import React from 'react';

function Addresses({app}) {
  return (
    <div style={{display:'block'}}>
      <div style={{padding:'1.5rem'}} className='miniLoanDetails-container'>
        <div style={{border:'none'}}>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div className='table__height'>
              <table className='table' id='clients'>
                <thead>
                  <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                    <th style={{textAlign:'start'}}>Ownership</th>
                    <th style={{textAlign:'start'}}>Address</th>
                    <th style={{textAlign:'start'}}>City</th>
                    <th style={{textAlign:'start'}}>Country</th>
                  </tr>
                </thead>
                <tbody>
                  {app.address_list.map(addr => {
                      return (
                        <tr key={addr.address}>
                          <td>{addr.ownership}</td>
                          <td>{addr.address}</td>
                          <td>{addr.city}</td>
                          <td>{addr.country}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Addresses;