import React from 'react';

function Summary({report}) {
  return (
    <div className='table-container' style={{padding:'0', border:'none'}}>
      <div className='table-responsive font-12' style={{maxHeight:'600px'}}>
        <table className='table' style={{width:'100%'}} id='loans-report'>
          <thead className='clients-report-table'>
            <tr className='journal-details fees__report_thead'>
              <th>Branch</th>
              <th>Month</th>
              <th>Principal</th>
              <th>Claimable_Balance</th>
              <th>Balance</th>
              <th>Current_Balance</th>
              <th>Penalty</th>
              <th>Interest_Penalty</th>
            </tr>
          </thead>
          <tbody>
          {report.summary.map((loan, idx) => {
            return (
              <tr key={idx}>
                {loan.month_year ? <td>{loan.branch_name}</td> : <td><b>{loan.branch_name}</b></td>}
                <td>{loan.month_year}</td>
                {loan.month_year ? <td>{loan.principal}</td> : <td><b>{loan.principal}</b></td>}
                {loan.month_year ? <td>{loan.claimable_balance}</td> : <td><b>{loan.claimable_balance}</b></td>}
                {loan.month_year ? <td>{loan.balance}</td> : <td><b>{loan.balance}</b></td>}
                {loan.month_year ? <td>{loan.current_balance}</td> : <td><b>{loan.current_balance}</b></td>}
                {loan.month_year ? <td>{loan.total_penalties}</td> : <td><b>{loan.total_penalties}</b></td>}
                {loan.month_year ? <td>{loan.interest_penalty}</td> : <td><b>{loan.interest_penalty}</b></td>}
              </tr>
            )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Summary;