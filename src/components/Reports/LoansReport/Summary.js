
import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


function Summary({report, intValues, loggedInUser}) {

  return (
    <div style={{margin:"2rem 0"}}>
      <div style={{margin:"1rem 0", display:"flex", justifyContent: "flex-end"}}>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='download-table-xls-button btn btn-default'
          table='summary'
          filename={`Loan report summary for ${loggedInUser.company_name} from ${intValues.minDate} to ${intValues.maxDate}`}
          sheet='tablexls'
          buttonText='Download as XLS'
        />
      </div>
      <div>
        <div style={{maxHeight: '500px', overflowY:"auto"}} className='search_background'>
          <table className='table' id='summary'>
            <thead>
              <tr className="journal-details schedule__tables" style={{position:"sticky", top:"0"}}>
                <th>Metric</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Loans Report Summary</td>
                <td></td>
              </tr>
              <tr>
                <td>
                  {`Loan report summary for ${loggedInUser.company_name} from ${intValues.minDate} to ${intValues.maxDate}`}
                </td>
                <td></td>
              </tr>
              {/* <tr>
                <td>
                  Branches: {selectedBranches.length == 0 ? 'All Branches' : selectedBranches.map(branch => ` ${branch.name}`)}
                </td>
                <td></td>
              </tr> */}
              <tr>
                <td>Number Male Clients With Open Loans <em>(All time)</em></td>
                <td>{report.number_of_male_clients_with_open_loans}</td>
              </tr>
              <tr>
                <td>Number Male Clients With Defaulted Loans <em>(All time)</em></td>
                <td>{report.number_of_male_clients_with_defaulted_loans}</td>
              </tr>
              <tr>
                <td>Number Of Active Male Clients <em>(All time)</em></td>
                <td>{report.number_of_active_male_clients}</td>
              </tr>

              <tr>
                <td>Number Female Clients With Open Loans <em>(All time)</em></td>
                <td>{report.number_of_female_clients_with_open_loans}</td>
              </tr>
              <tr>
                <td>Number Female Clients With Defaulted Loans <em>(All time)</em></td>
                <td>{report.number_of_female_clients_with_defaulted_loans}</td>
              </tr>
              <tr>
                <td>Number Of Active Female Clients <em>(All time)</em></td>
                <td>{report.number_of_active_female_clients}</td>
              </tr>

              <tr>
                <td>Number Of Loans Outstanding <em>(All time)</em></td>
                <td>{report.number_of_loans_outstanding}</td>
              </tr>
              <tr>
                <td>Value Of Loans Outstanding <em>(All time)</em></td>
                <td> {report.value_of_loans_outstanding}</td>
              </tr>
              <tr>
                <td>Average Value Of Loans Outstanding <em>(All time)</em></td>
                <td>{report.average_value_of_loans_outstanding}</td>
              </tr>

              <tr>
                <td>Number Of Loans Disbursed <em>(All time)</em></td>
                <td>{report.all_time_number_of_loans_disbursed}</td>
              </tr>
              <tr>
                <td>Value Of Loans Disbursed <em>(All time)</em></td>
                <td>{report.all_time_value_of_loans_disbursed}</td>
              </tr>

              <tr>
                <td>Penalties Accrued <em>(All time)</em></td>
                <td>{report.all_time_penalty_accrued}</td>
              </tr>

              <tr>
                <td>Penalties Due <em>(All time)</em></td>
                <td>{report.all_time_penalty_due}</td>
              </tr>

              <tr>
                <td>Number Of Loans Disbursed <em>(Range)</em></td>
                <td>{report.number_of_loans_disbursed}</td>
              </tr>
              <tr>
                <td>Value Of Loans Disbursed <em>(Range)</em></td>
                <td>{report.value_of_loans_disbursed}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Summary;