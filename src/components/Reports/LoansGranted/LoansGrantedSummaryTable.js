import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function LoansGrantedSummaryTable({report}) {
  return (
    <>
      <div className='table-header'>
        <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
          <div style={{marginTop:'6px'}}></div>
        </div>
        <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
          <div>
            <ReactHTMLTableToExcel
              id='test-table-xls-button'
              className='btn btn-default'
              table='loans-granted-summary'
              filename='loans-granted-summary'
              sheet='tablexls'
              buttonText='Download as XLS'
            />
          </div>
        </div>
      </div>
      <div className='table-container' style={{padding:'0', border:'none'}}>
        <div className='table-responsive font-12' style={{maxHeight:'600px'}}>
          <table className='table' style={{width:'100%'}} id='loans-granted-summary'>
            <thead className='clients-report-table'>
              <tr className='journal-details fees__report_thead'>
                <th>Branch</th>
                <th>Month</th>
                <th>Principal</th>
                <th>Interest</th>
                {report.fee_names.map(fee_name => (
                  <th key={fee_name}>{fee_name}</th>
                ))}
                <th>Claimable Balance</th>
              </tr>
            </thead>
            <tbody>
              {report.months.map((month, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <b>{month.branch_name}</b>
                    </td>
                    <td>{month.month_year}</td>
                    <td>
                      <b>{month.principal}</b>
                    </td>
                    <td>
                      <b>{month.interest}</b>
                    </td>
                    {report.fee_names.map(fee_name => (
                      <td key={fee_name}>
                        <b>{month[fee_name]}</b>
                      </td>
                    ))}
                    <td>
                      <b>{month.claimable_balance}</b>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default LoansGrantedSummaryTable;