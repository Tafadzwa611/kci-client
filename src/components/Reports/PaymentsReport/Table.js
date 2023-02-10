import React from 'react';
import { useVirtual, Table } from "@af-utils/react-table";

const columns = [
  {key: "Client_Name"},
  {key: "Phone_Number"},
  {key: "Account_No"},
  {key: "Payment_Branch"},
  {key: "Loan_Branch"},
  {key: "Collected_By"},
  {key: "Product_Name"},
  {key: "Principal"},
  {key: "Interest",width: "100"},
  {key: "Penalty"},
  {key: "Overpayment"},
  {key: "Total_Paid"},
  {key: "Value_Date"},
  {key: "Entry_Date"},
  {key: "Receipt_Number"},
  {key: "Payment_Channel"},
  {key: "Disbursement_Channel"}
];

const PaymentsTable = ({payments}) => {
    const model = useVirtual({
        itemCount: payments.length
    });

    console.log(payments)

    const getRowData = i => {
      const payment = payments[i];
      console.log(payment)
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


