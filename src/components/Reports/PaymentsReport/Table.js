import React from 'react';
import { useVirtual, Table } from "@af-utils/react-table";

const columns = [
  {key: "Client_Name", width: "100" },
  {key: "Phone_Number", width: "100"},
  {key: "Account_No", width: "100"},
  {key: "Payment_Branch", width: "100"},
  {key: "Loan_Branch", width: "100"},
  {key: "Collected_By", width: "100"},
  {key: "Product_Name", width: "100"},
  {key: "Principal", width: "100"},
  {key: "Interest",width: "100"},
  {key: "Penalty", width: "100"},
  {key: "Overpayment", width: "100"},
  {key: "Total_Paid", width: "100"},
  {key: "Value_Date", width: "100"},
  {key: "Entry_Date", width: "100" },
  {key: "Receipt_Number", width: "100"},
  {key: "Payment_Channel", width: "100"},
  {key: "Disbursement_Channel", width: "100"}
];

const PaymentsTable = ({payments}) => {
    const model = useVirtual({
        itemCount: payments.length
    });

    const getRowData = i => {
      const payment = payments[i];
      return {
        "Client_Name": payment.client_name,
        "Phone_Number": payment.phone_number,
        "Account_No": payment.loan_account,
        "Payment_Branch": payment.payment_branch,
        "Loan_Branch": payment.loan_branch,
        "Collected_By": payment.collected_by_name,
        "Product_Name": payment.product_name,
        "Principal": payment.principal,
        "Interest": payment.interest,
        "Penalty": payment.penalty,
        "Overpayment": payment.overpayment,
        "Total_Paid": payment.total_paid,
        "Value_Date": payment.value_date,
        "Entry_Date": payment.entry_date,
        "Receipt_Number": payment.receipt_number,
        "Payment_Channel": payment.payment_channel,
        "Disbursement_Channel": payment.loan_fund_account,
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

export default PaymentsTable;


