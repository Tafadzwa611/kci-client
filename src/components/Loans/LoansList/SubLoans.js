import React from 'react';

const thStyle2 = {border: 'none', borderBottom: '1px solid #c1d0d7'};
function SubLoans({loans}) {
  const sortedLoans = loans.sort((a, b) => {
    if (a.id === null) {
      return 1;
    }
    if (b.id === null) {
      return -1;
    }
    return 0;
  });

  return (
    <table>
      <thead>
        <tr>
          <th style={thStyle2}><b>Client Name</b></th>
          <th style={thStyle2}><b>Loan ID</b></th>
          <th style={thStyle2}><b>Principal</b></th>
          <th style={thStyle2}><b>Interest</b></th>
          <th style={thStyle2}><b>Status</b></th>
        </tr>
      </thead>
      <tbody>
        {sortedLoans.map(loan => (
          loan.id ?
            <tr key={loan.client_id}>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{loan.fullname}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{loan.loan_id}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{loan.principal}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{loan.interest}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{loan.status}</td>
          </tr>:
          <tr key={loan.client_id}>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{loan.fullname}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}} colSpan={4} >Unallocated</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SubLoans;