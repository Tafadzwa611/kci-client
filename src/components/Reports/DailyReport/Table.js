import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Table = ({report}) => {
  return (
    <>
      <div style={{display:'flex', justifyContent:'flex-end', marginTop:'1.5rem'}}>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='btn btn-default'
          table='daily-report'
          filename='Daily Report'
          sheet='tablexls'
          buttonText='Download as XLS'
        />
      </div>
      <div className='table-container font-12' style={{border:'none', padding:'0', marginTop:'1rem'}}>
        <div className='table-responsive' style={{maxHeight:'800px'}}>
          <table className='table' id='daily-report'>
            <tbody>
              <tr>
                <td colSpan={2}><b>Loans Info</b></td>
              </tr>
              <tr>
                <td>Number Of Loans Disbursed</td>
                <td>{report.loans_data.num_of_loans_disbursed}</td>
              </tr>
              <tr>
                <td>Principal Disbursed</td>
                <td>{report.loans_data.principal_disbursed}</td>
              </tr>
              <tr>
                <td>Number Of Loans Awaiting Disbursement</td>
                <td>{report.loans_data.num_of_loans_awaiting_disbursement}</td>
              </tr>
              <tr>
                <td colSpan={2}><b>Payments Info</b></td>
              </tr>
              <tr>
                <td>Number Of Payments</td>
                <td>{report.payments_data.payments}</td>
              </tr>
              <tr>
                <td>Amount Paid</td>
                <td>{report.payments_data.amount_paid}</td>
              </tr>
              <tr>
                <td>Principal Paid</td>
                <td>{report.payments_data.principal_paid}</td>
              </tr>
              <tr>
                <td>Interest Paid</td>
                <td>{report.payments_data.interest_paid}</td>
              </tr>
              <tr>
                <td>Fees Paid</td>
                <td>{report.payments_data.fees_paid}</td>
              </tr>
              <tr>
                <td>Penalty Paid</td>
                <td>{report.payments_data.penalty_paid}</td>
              </tr>
              <tr>
                <td colSpan={2}><b>Clients Info</b></td>
              </tr>
              <tr>
                <td>New Clients</td>
                <td>{report.clients_data.new_clients}</td>
              </tr>
              <tr>
                <td>New Clients Pending Approval</td>
                <td>{report.clients_data.new_clients_pending_approval}</td>
              </tr>
              <tr>
                <td>New Active Clients</td>
                <td>{report.clients_data.new_active_clients}</td>
              </tr>
              <tr>
                <td>Total Clients</td>
                <td>{report.clients_data.total_clients}</td>
              </tr>
              <tr>
                <td colSpan={2}><b>Groups Info</b></td>
              </tr>
              <tr>
                <td>New Groups</td>
                <td>{report.groups_data.new_groups}</td>
              </tr>
              <tr>
                <td>New Groups Pending Approval</td>
                <td>{report.groups_data.new_groups_pending_approval}</td>
              </tr>
              <tr>
                <td>New Active Groups</td>
                <td>{report.groups_data.new_active_groups}</td>
              </tr>
              <tr>
                <td>Total Groups</td>
                <td>{report.groups_data.total_groups}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Table;