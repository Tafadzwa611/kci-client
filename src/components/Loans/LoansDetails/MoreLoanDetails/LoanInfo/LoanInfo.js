import React from 'react'; 

const LoanInfo = (
  {
    loan,
  }) => {
    console.log(loan)
    return (
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", marginTop:"1.5rem"}}>

          <div>
            <ul style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
              <li>Client Branch: {loan.client_branch}</li>
              <li>Loan Number: {loan.loan_id}</li>
              <li>Loan Branch: {loan.branch}</li>
              <li>Loan Application Date: {loan.application_date}</li>
              <li>Loan Disbursement Date:
                  {
                    (loan.status == 'Processing' || loan.status == 'Approved') ? 
                      <>Awaiting Disbursement</>
                    :
                      (loan.status == 'Rejected') ?
                      <>Rejected</>
                    :
                      <>{loan.loan_added_on}</>
                  }
              </li>
              <li>First Repayment Date: {loan.first_repayment_date}</li>
              <li>Loan Maturity Date: {loan.maturity_date}</li>
              <li>Client Email: {loan.client_email===null || loan.client_email==='' ? 'No email was provided' : loan.client_email}</li>
            </ul>
          </div>

          <div>
            <ul style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
              <li>Employer: {loan.client_employer===null || loan.client_employer==='' ? 'Employer was not provided' : loan.client_employer}</li>
              <li>EC Number: {loan.client_ec_number===null || loan.client_ec_number==='' ? 'Ec Number was not provided' : loan.client_ec_number}</li>
              <li>Job Position: {loan.client_job_position===null || loan.client_job_position==='' ? 'Job Position was not provided' : loan.client_job_position}</li>
              <li>Client Date Added: {loan.client_added_on}</li>
              <li>Work Address: {loan.client_work_address===null || loan.client_work_address==='' ? 'Work Address was not provided' : loan.client_work_address}</li>
              <li>Date of Birth: {loan.client_date_of_birth}</li>
              <li>Gender: {loan.client_gender}</li>
              <li>Mobile: {loan.client_phone_number}</li>
            </ul>
          </div>

        </div>
    )
}

export default LoanInfo;
