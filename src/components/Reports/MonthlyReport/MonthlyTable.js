import React, { Fragment } from 'react';
import { SecondRow } from './TableRows';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


const MonthlyTable = ({report, loggedInUser}) => {
  return (
    <>
      <div style={{display:"flex", justifyContent:"flex-end", margin:"1rem 0"}}>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='btn btn-default'
          table='monthly-report'
          filename={`Monthly Report for ${loggedInUser.company_name} extracted on ${new Date()}`}
          sheet='tablexls'
          buttonText='Download as XLS'
        />
      </div>
      <div style={{maxHeight: '600px', overflowX:"auto"}}>
        <table className='table' id='monthly-report' width='100%'>
          <thead>
            <tr className="journal-details fees__report_thead" style={{position:"sticky", top:"0"}}>
              <th className='text-right'>Month</th>
              <th className='text-right'>Loan_Count</th>
              <th className='text-right'>Principal_Disbursed</th>
              <th className='text-right'>Total_Interest_Expected</th>
              <th className='text-right'>Payment_Count</th>
              <th className='text-right'>Total_Payments</th>
              <th className='text-right'>Principal_Paid</th>
              <th className='text-right'>Interest_Paid</th>
              <th className='text-right'>Penalty_Paid</th>
              <th className='text-right'>Overpayment</th>
              <th className='text-right'>Accrued_Penalty_Count</th>
              <th className='text-right'>Accrued_Penalty_Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='text-bold text-left' colSpan={12}>Loans Report</td>
            </tr>
            <tr>
              <td colSpan={12} title={`Monthly Report for ${loggedInUser.company_name} extracted on ${new Date()}`} className='text-bold text-left' style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '5px'}}>
                {`Monthly Report for ${loggedInUser.company_name} extracted on ${new Date()}`}
              </td>
            </tr>
            {/* <tr>
              <td colSpan={12} title={selectedBranches.length == 0 ? 'All Branches' : selectedBranches.map(branch => ` ${branch.name}`)} className='text-bold text-left' style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '5px'}}>
                Branches: {selectedBranches.length == 0 ? 'All Branches' : selectedBranches.map(branch => ` ${branch.name}`)}
              </td>
            </tr> */}
            <tr>
              <td className='text-bold text-left' colSpan={12}>Currency: {report.currency}</td>
            </tr>
            {report.report.map((monthlyReport, index) => {
              return (
                <SecondRow key={index} monthlyReport={monthlyReport}/>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default MonthlyTable;