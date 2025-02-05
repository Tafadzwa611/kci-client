import React from "react";

function Fees({fees, allow_editing_fees_on_loan_creation}) {
  return (
    <>
      <ul style={{padding:"1rem 0"}}>
      {allow_editing_fees_on_loan_creation ? (
        <li>Allow Editing Fees On Loan Creation: <span className="badge badge-success">Yes</span></li>
        ): (
        <li>Allow Editing Fees On Loan Creation: <span className="badge badge-danger">No</span></li>
      )}
      </ul>
      <div className="miniLoanDetails-container" style={{padding:'1.5rem'}}>
        <table className="table">
          <tbody>
            <tr className="journal-details header client__details">
              <th>Name</th>
              <th>Fee_Calculation</th>
              <th>Is_Mandatory</th>
              <th>Fee_Type</th>
              <th>Value</th>
            </tr>
            {fees.map(fee => {
              return (
                <tr key={fee.id}>
                  <td>{fee.name}</td>
                  <td>{fee.fee_calculation}</td>
                  <td>{fee.is_mandatory ? "Yes" : "No"}</td>
                  <td>{fee.fee_type}</td>
                  <td>{fee.value}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Fees;