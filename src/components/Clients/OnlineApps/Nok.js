import React from 'react';

function Nok({app}) {
  return (
    <div style={{display:'block'}}>
      <div style={{padding:'1.5rem'}} className='miniLoanDetails-container'>
        <div style={{border:'none'}}>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div className='table__height'>
              <table className='table' id='clients'>
                <thead>
                  <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                    <th style={{textAlign:'start'}}>Name</th>
                    <th style={{textAlign:'start'}}>Relationship</th>
                    <th style={{textAlign:'start'}}>Phone_Number</th>
                    <th style={{textAlign:'start'}}>Address</th>
                    <th style={{textAlign:'start'}}>City</th>
                    <th style={{textAlign:'start'}}>Country</th>
                    <th style={{textAlign:'start'}}>Ownership</th>
                    <th style={{textAlign:'start'}}>Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {app.next_of_kin_list.map(nok => {
                      return (
                        <tr key={nok.first_name}>
                          <td>{`${nok.first_name} ${nok.last_name}`}</td>
                          <td>{nok.relationship}</td>
                          <td>{nok.phone_number}</td>
                          <td>{nok.address}</td>
                          <td>{nok.city}</td>
                          <td>{nok.ownership}</td>
                          <td>{nok.country}</td>
                          <td>{nok.gender}</td>
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

export default Nok