import React from 'react';
import { useVirtual, Table } from "@af-utils/react-table";

const columns = [
  {key: "Loan #"},
  {key: "Collection_Date"},
  {key: "Collected_By"},
  {key: "Payment_Type"},
  {key: "Method"},
  {key: "Client"},
  {key: "Amount_Paid"}
];

const PaymentList = ({payments}) => {
  // console.log(payments)
  const model = useVirtual({
      itemCount: payments.length
  });

  // console.log(model);

  const getRowData = i => {
    const payment = payments[i];
    return {
        "Loan #": payment.loan,
        "Collection_Date": payment.date_created,
        "Collected_By": payment.collected_by,
        "Payment_Type": payment.payment_type,
        "Method": payment.payment_method,
        "Client": payment.client,
        "Amount_Paid": payment.amount_paid,
    }
  }

  return (
    <div className="text-light view__payments" style={{paddingTop:"2rem"}}>
      <Table
        model={model}
        className="h-full basic-table-container"
        getRowData={getRowData}
        columns={columns}
      />
    </div>
  );
};

export default PaymentList;

