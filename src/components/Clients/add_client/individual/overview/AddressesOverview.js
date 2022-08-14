import React from 'react';

function AddressesOverview({addrList}) {
  return (
    <div className='form-group row text-light' style={{marginTop: '15px'}}>
      <label className='col-sm-1 control-label'>Address List</label>
      <table className='table table-bordered table-head-fixed text-nowrap' id='chart' width='100%'>
        <thead>
          <tr className="journal-details header">
            <th>Address</th>
            <th>City/Town</th>
            <th>Country</th>
            <th>Ownership</th>
          </tr>
        </thead>
        <tbody>
          {addrList.length > 0 ? addrList.map((addr, idx) => 
          (<tr key={idx}>
            <td>{addr.address}</td>
            <td>{addr.city}</td>
            <td>{addr.country}</td>
            <td>{addr.ownership}</td>
          </tr>)) : <tr><td colSpan={4} style={{textAlign: 'center'}}><p style={{color: 'red'}}>No addresses were added, at least one address is required.</p></td></tr>}
        </tbody>
      </table>
    </div>
  )
}

export default AddressesOverview;