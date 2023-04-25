import React from 'react';

const thStyle2 = {border: 'none', borderBottom: '1px solid #c1d0d7'};
function Penalties({penalties}) {
  return (
    <table>
      <thead>
        <tr>
          <th style={thStyle2}><b>Penalty Date</b></th>
          <th style={thStyle2}><b>Reason for Penalty</b></th>
          <th style={thStyle2}><b>Amount</b></th>
          <th style={thStyle2}><b>Amount Paid</b></th>
          <th style={thStyle2}><b>Amount Due</b></th>
          <th style={thStyle2}><b>Status</b></th>
          <th style={thStyle2}><b>Action</b></th>
        </tr>
      </thead>
      <tbody>
        {penalties.map(penalty => (
          <tr key={penalty.id}>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{penalty.cdate_created}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{penalty.description}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{penalty.amount_for_fixed_amount_penalty}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{penalty.amount_paid}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{penalty.amount_due}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{penalty.status}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>Action</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Penalties;