import React from 'react';

function DirectorsTable({dirList}) {
  return (
    <div className='form-group row text-light' style={{marginTop: '15px'}}>
      <label className='col-sm-2 control-label'>Company Directors</label>
      <table className='table table-bordered table-head-fixed text-nowrap' id='chart' width='100%'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Identification Number</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Date Of Birth</th>
          </tr>
        </thead>
        <tbody>
          {dirList.length > 0 ? dirList.map((director, idx) => (
            <tr key={idx}>
            <td>{director.first_name}</td>
            <td>{director.last_name}</td>
            <td>{director.identification_number}</td>
            <td>{director.phone_number}</td>
            <td>{director.gender}</td>
            <td>{director.date_of_birth}</td>
          </tr>
          )):
          <tr><td colSpan={7} style={{textAlign: 'center'}}>No data in table.</td></tr>}
        </tbody>
      </table>
    </div>
  )
}

export default DirectorsTable;