import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


function Summary({summary}) {
  return (
    <div className='search_background' style={{padding:'1.5rem', marginBottom:'20px'}}>
      <div className='table-responsive' style={{maxHeight: '600px'}}>
        <div style={{marginBottom:"1rem", float:"right"}}>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='download-table-xls-button btn btn-default'
            table='summary'
            filename='Report'
            sheet='tablexls'
            buttonText='Download as XLS'
          />
        </div>
        <table className='table' id="summary">
          <thead className="journal-details fees__report_thead">
            <tr>
            <th>Fee Name</th>
            <th>Total Fees Paid</th>
            </tr>
          </thead>
          <tbody>
            {summary.map(lf => (
              <tr key={lf.fee_name}>
                <td>{ lf.fee_name }</td>
                <td>{lf.amount__sum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Summary;