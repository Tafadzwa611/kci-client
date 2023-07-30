import React from 'react';


function Summary({summary}) {
  return (
    <div style={{margin:'2rem 0'}}>
      <div>
        <div style={{display:'grid', marginTop:'1.5rem', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: '10px'}}>
          <div>
            <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
              <li><b>Disbursement Info</b></li>
              <li>Principal Disbursed: {summary.principal_disbursed}</li>
              <li>Projected Loan Interest Earnings: {summary.projected_interest_earnings}</li>
              <li>Number Of Loans Disbursed: {summary.num_of_loans_disbursed}</li>
              <li>Average Loan Amount: {summary.avg_principal_disbursed}</li>
              <li>Number Of Unique Clients: {summary.num_of_unique_clients}</li>
              <li>Number Of Loans Pending Disbursal: {summary.num_of_loans_pending_disbursal}</li>
              <li>Portfolio Pending Disbursal: {summary.portfolio_pending_disbursal}</li>
            </ul>
          </div>

          <div>
            <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
              <li><b>Male Clients Disbursement Info</b></li>
              <li>Principal Disbursed To Male Clients: {summary.principal_disbursed_to_male_clients}</li>
              <li>Projected Loan Interest Earnings: {summary.projected_interest_earnings_on_male_client_loans}</li>
              <li>Number Of Loans Disbursed To Male Clients: {summary.num_of_loans_disbursed_to_male_clients}</li>
              <li>Average Loan Amount: {summary.avg_principal_disbursed_to_male_clients}</li>
              <li>Number Of Unique Male Clients: {summary.num_of_unique_male_clients}</li>
              <li>Number Of Loans Pending Disbursal: {summary.num_of_male_client_loans_pending_disbursal}</li>
              <li>Portfolio Pending Disbursal: {summary.portfolio_pending_disbursal_to_male_clients}</li>
            </ul>
          </div>

          <div>
            <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
              <li><b>Female Clients Disbursement Info</b></li>
              <li>Principal Disbursed To Female Clients: {summary.principal_disbursed_to_female_clients}</li>
              <li>Projected Loan Interest Earnings: {summary.projected_interest_earnings_on_female_client_loans}</li>
              <li>Number Of Loans Disbursed To Female Clients: {summary.num_of_loans_disbursed_to_female_clients}</li>
              <li>Average Loan Amount: {summary.avg_principal_disbursed_to_female_clients}</li>
              <li>Number Of Unique Female Clients: {summary.num_of_unique_female_clients}</li>
              <li>Number Of Loans Pending Disbursal: {summary.num_of_female_client_loans_pending_disbursal}</li>
              <li>Portfolio Pending Disbursal: {summary.portfolio_pending_disbursal_to_female_clients}</li>
            </ul>
          </div>

          <div>
            <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
              <li><b>Groups Disbursement Info</b></li>
              <li>Principal Disbursed To Groups: {summary.principal_disbursed_to_groups}</li>
              <li>Projected Loan Interest Earnings: {summary.projected_interest_earnings_on_group_loans}</li>
              <li>Number Of Loans Disbursed To Groups: {summary.num_of_loans_disbursed_to_groups}</li>
              <li>Average Loan Amount: {summary.avg_principal_disbursed_to_groups}</li>
              <li>Number Of Unique Groups: {summary.num_of_unique_groups}</li>
              <li>Number Of Loans Pending Disbursal: {summary.num_of_group_loans_pending_disbursal}</li>
              <li>Portfolio Pending Disbursal: {summary.portfolio_pending_disbursal_to_groups}</li>
            </ul>
          </div>
        </div>
        <div style={{display:'grid', marginTop:'1.5rem', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: '10px'}}>
          <div>
            <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
              <li><b>Running Loans Info</b></li>
              <li>Principal Outstanding: {summary.outstanding_principal}</li>
              <li>Average Principal Outstanding: {summary.avg_outstanding_principal}</li>
              <li>Principal Outstanding At Risk: {summary.outstanding_principal_at_risk}</li>
              <li>Number Of Running Loans: {summary.number_of_running_loans}</li>
              <li>Number Of Loans In Arrears: {summary.number_of_loans_in_arrears}</li>
            </ul>
          </div>

          <div>
            <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
              <li><b>Male Clients Running Loans Info</b></li>
              <li>Principal Outstanding: {summary.outstanding_principal_disbursed_to_male_clients}</li>
              <li>Average Principal Outstanding: {summary.avg_outstanding_principal_disbursed_to_male_clients}</li>
              <li>Principal Outstanding At Risk: {summary.outstanding_principal_at_risk_for_male_clients}</li>
              <li>Number Of Running Loans: {summary.number_of_running_loans_for_male_clients}</li>
              <li>Number Of Loans In Arrears: {summary.number_of_loans_in_arrears_for_male_clients}</li>
            </ul>
          </div>

          <div>
            <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
              <li><b>Female Clients Running Loans Info</b></li>
              <li>Principal Outstanding: {summary.outstanding_principal_disbursed_to_female_clients}</li>
              <li>Average Principal Outstanding: {summary.avg_outstanding_principal_disbursed_to_female_clients}</li>
              <li>Principal Outstanding At Risk: {summary.outstanding_principal_at_risk_for_female_clients}</li>
              <li>Number Of Running Loans: {summary.number_of_running_loans_for_female_clients}</li>
              <li>Number Of Loans In Arrears: {summary.number_of_loans_in_arrears_for_female_clients}</li>
            </ul>
          </div>

          <div>
            <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
              <li><b>Groups Running Loans Info</b></li>
              <li>Principal Outstanding: {summary.outstanding_principal_disbursed_to_groups}</li>
              <li>Average Principal Outstanding: {summary.avg_outstanding_principal_disbursed_to_groups}</li>
              <li>Principal Outstanding At Risk: {summary.outstanding_principal_at_risk_for_groups}</li>
              <li>Number Of Running Loans: {summary.number_of_running_loans_for_groups}</li>
              <li>Number Of Loans In Arrears: {summary.number_of_loans_in_arrears_for_groups}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Summary;