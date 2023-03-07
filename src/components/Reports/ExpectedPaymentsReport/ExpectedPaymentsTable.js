import React from 'react';
import { useVirtual, Table } from "@af-utils/react-table";

const columns = [
  {key: "Client_Name"},
  {key: "Client_ID"},
  {key: "Account_No"},
  {key: "Expected"},
  {key: "Paid"},
  {key: "Expected_Princ"},
  {key: "Expected_Int"},
  {key: "Expected_Pen"},
  {key: "Princ_Paid"},
  {key: "Int_Paid"},
  {key: "Pen_Paid"},
  {key: "Loan_Status"},
  {key: "Branch"},
  {key: "Date"},
  {key: "Loan_Officer"},
  {key: "Loan_Product"}
];

const ExpectedPaymentsTable = ({installments}) => {
    const model = useVirtual({
        itemCount: installments.length
    });

    const getRowData = i => {
      const installment = installments[i];
      return {
        "Client_Name": installment.client_name,
        "Client_ID": installment.client_id,
        "Account_No": installment.loan_number,
        "Expected": installment.installment,
        "Paid": installment.amount_paid,
        "Expected_Princ": installment.expected_principal,
        "Expected_Int": installment.expected_interest,
        "Expected_Pen": installment.expected_penalty,
        "Princ_Paid": installment.principal_paid,
        "Int_Paid": installment.interest_paid,
        "Pen_Paid": installment.penalty_paid,
        "Loan_Status": installment.status,
        "Branch": installment.branch,
        "Date": installment.installment_date,
        "Loan_Officer": installment.loan_officer,
        "Loan_Product": installment.loan_product,
      }
    }

    return (
      <div className="text-light">
        <Table
            model={model}
            className="h-full basic-table-container"
            getRowData={getRowData}
            columns={columns}
        />
      </div>
    );
};

export default ExpectedPaymentsTable;