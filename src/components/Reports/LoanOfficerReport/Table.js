import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Table = ({report}) => {
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem'}}>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='btn btn-default'
          table='lo-report'
          filename='Report'
          sheet='tablexls'
          buttonText='Download as XLS'
        />
      </div>
      <div className='table-container' style={{padding: '0', paddingTop: '1rem', border: 'none'}}>
        <div className='table-responsive font-12' style={{maxHeight: '600px'}}>
          <table className='table' id='lo-report'>
            <thead className='clients-report-table'>
              <tr className='journal-details fees__report_thead'>
                <th style={{textAlign:'left'}}>Loan_Officer</th>
                <th style={{textAlign:'left'}}>Loan_Officer_Branch</th>
                <th style={{textAlign:'left'}}>Loans_Disbursed</th>
                <th style={{textAlign:'left'}}>Principal_Disbursed</th>
                <th style={{textAlign:'left'}}>Interest_Expected</th>
                <th style={{textAlign:'left'}}>Total_Penalty_Accrued</th>
                <th style={{textAlign:'left'}}>Total_Fees_Expected</th>
                <th style={{textAlign:'left'}}>Total</th>
                <th style={{textAlign:'left'}}>Principal_Outstanding</th>
                <th style={{textAlign:'left'}}>Interest_Outstanding</th>
                <th style={{textAlign:'left'}}>Penalty_Outstanding</th>
                <th style={{textAlign:'left'}}>Fees_Outstanding</th>
                <th style={{textAlign:'left'}}>Total_Outstanding</th>
                <th style={{textAlign:'left'}}>Loans_In_Arrears</th>
                <th style={{textAlign:'left'}}>Principal_At_Risk</th>
                <th style={{textAlign:'left'}}>Loans_Written_Off</th>
                <th style={{textAlign:'left'}}>Principal_Written_Off</th>
              </tr>
            </thead>
            <tbody>
              {report.map(officer => {
                return (
                  <tr key={officer.loan_officer_id} className='table-row'>
                    <td style={{textAlign:'left'}}>{officer.loan_officer__first_name} {officer.loan_officer__last_name}</td>
                    <td style={{textAlign:'left'}}>{officer.loan_officer__branch__name}</td>
                    <td style={{textAlign:'left'}}>{officer.num_of_loans}</td>
                    <td style={{textAlign:'left'}}>{officer.principal_disbursed}</td>
                    <td style={{textAlign:'left'}}>{officer.total_interest_expected}</td>
                    <td style={{textAlign:'left'}}>{officer.total_penalty_expected}</td>
                    <td style={{textAlign:'left'}}>{officer.total_fees_expected}</td>
                    <td style={{textAlign:'left'}}>{officer.total_expected}</td>
                    <td style={{textAlign:'left'}}>{officer.principal_balance}</td>
                    <td style={{textAlign:'left'}}>{officer.interest_balance}</td>
                    <td style={{textAlign:'left'}}>{officer.penalty_balance}</td>
                    <td style={{textAlign:'left'}}>{officer.fees_balance}</td>
                    <td style={{textAlign:'left'}}>{officer.total_balance}</td>
                    <td style={{textAlign:'left'}}>{officer.num_of_loans_in_arrears}</td>
                    <td style={{textAlign:'left'}}>{officer.principal_at_risk}</td>
                    <td style={{textAlign:'left'}}>{officer.num_of_loans_written_off}</td>
                    <td style={{textAlign:'left'}}>{officer.principal_written_off}</td>
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

export default Table;