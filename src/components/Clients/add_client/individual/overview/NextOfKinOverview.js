import React from 'react';

function NextOfKinOverview({nokList}) {
  return (
    <div className='form-group row text-light' style={{marginTop: '15px'}}>
      <label className='col-sm-1 control-label'>Next Of Kin List</label>
      <table className='table' id='chart' style={{width:"100%"}}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Relationship to Applicant</th>
            <th>Phone Number</th>
            <th>Physical Address</th>
            <th>City/Town</th>
            <th>Country</th>
            <th>Ownership</th>
          </tr>
        </thead>
        <tbody>
          {nokList.length > 0 ? nokList.map((nok, idx) => 
          (<tr key={idx}>
            <td>{nok.first_name}</td>
            <td>{nok.last_name}</td>
            <td>{nok.gender}</td>
            <td>{nok.relationship}</td>
            <td>{nok.phone_number}</td>
            <td>{nok.address}</td>
            <td>{nok.city}</td>
            <td>{nok.country}</td>
            <td>{nok.ownership}</td>
          </tr>)) : <tr><td colSpan={9} style={{textAlign: 'center'}}>No data in table.</td></tr>}
        </tbody>
      </table>
    </div>
  )
}

export default NextOfKinOverview;