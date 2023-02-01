import React from 'react';
import { convertDate } from '../../Accounting/Journals/utils';


function TableHeader({aggregateData, minDate, maxDate}) {
  return (
    <div>
      <table className="table" style={{marginTop:"2rem"}}>
        <tbody>

          <tr>
            <td>From:</td>
            <td>{convertDate(minDate)}</td>
          </tr>
          <tr>
            <td>To:</td>
            <td>{convertDate(maxDate)}</td>
          </tr>
          <tr>
            <td>Report Run Date:</td>
            <td>{convertDate(aggregateData.report_run_date)} {aggregateData.report_run_time}</td>
          </tr>
          <tr>
            <td>Number Of Payments:</td>
            <td>{aggregateData.number_of_payments}</td>
          </tr>
          <tr>
            <td>Number Of Loans:</td>
            <td>{aggregateData.number_of_loans}</td>
          </tr>
          <tr>
            <td>Total Repaid Amount:</td>
            <td>{aggregateData.total_amount_paid}</td>
          </tr>
          <tr>
            <td>Total Principal Repaid:</td>
            <td>{aggregateData.total_principal_paid}</td>
          </tr>
          <tr>
            <td>Total Interest Repaid:</td>
            <td>{aggregateData.total_interest_paid}</td>
          </tr>
          <tr>
            <td>Total Penalty Repaid:</td>
            <td>{aggregateData.total_penalty_paid}</td>
          </tr>
          <tr>
            <td>Total Overpayment:</td>
            <td>{aggregateData.total_overpayment}</td>
          </tr>

        </tbody>
      </table>
    </div>
  )
}

export default TableHeader;