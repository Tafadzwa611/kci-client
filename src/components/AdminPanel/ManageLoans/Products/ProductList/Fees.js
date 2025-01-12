import React from "react";

function Fees({fees, allow_editing_fees_on_loan_creation}) {
  return (
    <>
      <ul style={{paddingRight:"1rem"}}>
      {allow_editing_fees_on_loan_creation ? (
        <li>Allow Editing Fees On Loan Creation: <span className="badge badge-success">Yes</span></li>
        ): (
        <li>Allow Editing Fees On Loan Creation: <span className="badge badge-danger">No</span></li>
      )}
      </ul>
      <table className="table">
        <tbody>
          <tr className="journal-details header">
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
    </>
  )
}

export default Fees;