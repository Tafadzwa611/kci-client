import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function SubLoans({loans, client_name}) {
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
    <>
      <div style={{display:"flex", justifyContent:"flex-end", marginBottom:"1rem"}}>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='btn btn-default client__details'
          table='loans'
          filename={`${client_name}'s loans`}
          sheet='tablexls'
          buttonText='Download as XLS'
        />
      </div>
      <table className="table" id="loans">
        <thead>
          <tr className="journal-details schedule__tables">
            <th className="schedule__table"><b>Client Name</b></th>
            <th className="schedule__table"><b>Loan ID</b></th>
            <th className="schedule__table"><b>Principal</b></th>
            <th className="schedule__table"><b>Interest</b></th>
            <th className="schedule__table"><b>Status</b></th>
          </tr>
        </thead>
        <tbody>
          {sortedLoans.map(loan => (
            loan.id ?
              <tr key={loan.client_id}>
                <td className="schedule__table">{loan.fullname}</td>
                <td className="schedule__table">{loan.loan_id}</td>
                <td className="schedule__table">{loan.principal}</td>
                <td className="schedule__table">{loan.interest}</td>
                <td className="schedule__table">{loan.status}</td>
              </tr>:
            <tr key={loan.client_id}>
              <td className="schedule__table">{loan.fullname}</td>
              <td className="schedule__table" colSpan={4} >Unallocated</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default SubLoans;