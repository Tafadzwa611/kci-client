
import React from 'react';
import { FixedSizeList as List } from 'react-window';
import {AutoSizer, MultiGrid} from 'react-virtualized';
import 'react-virtualized/styles.css';


const headercolumns = [
  {name: "client_name", displayName: "Client Name", width: 200},
  { name: "phone_number", displayName: "Phone Number", width: 120 },
  { name: "loan_account", displayName: "Account No", width: 120 },
  { name: "payment_branch", displayName: "Payment Branch", width: 120 },
  { name: "loan_branch", displayName: "Loan Branch", width: 120 },
  { name: "collected_by_name", displayName: "Collected By", width: 200 },
  { name: "product_name", displayName: "Product Name", width: 200 },
  { name: "principal", displayName: "Principal", width: 85 },
  { name: "interest", displayName: "Interest", width: 85 },
  { name: "penalty", displayName: "Penalty", width: 85 },
  { name: "overpayment", displayName: "Overpayment", width: 100 },
  { name: "total_paid", displayName: "Total Paid", width: 85 },
  { name: "value_date", displayName: "Value Date", width: 85 },
  { name: "entry_date", displayName: "Entry Date", width: 85 },
  { name: "receipt_number", displayName: "Receipt Number", width: 120 },
  { name: "payment_channel", displayName: "Payment Channel", width: 150 },
  { name: "loan_fund_account", displayName: "Disbursement Channel", width: 150}
];

function PaymentsTable({payments}) {
  const heightcount = payments.length + 1;

  const renderHeaderColumns = columnIndex => {
    const addone = headercolumns[columnIndex];
    return <div key={addone.name}>{addone.displayName}</div>;
  };

  const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    if (rowIndex === 0) {
      return <div key={key} style={style}>{renderHeaderColumns(columnIndex)}</div>
    } else {
      const columnName = headercolumns[columnIndex].name;
      return <div key={key} style={style}>{payments[rowIndex-1][columnName]}</div>
    }
  };

  return (
    <div className='react-virtualized-table text-light' style={{height:"700px", marginTop:"2rem"}}>
      <AutoSizer>
        {({ width }) => (
          <MultiGrid
            cellRenderer={cellRenderer}
            fixedRowCount={1}
            height={690}
            width={width}
            columnCount={headercolumns.length}
            columnWidth={({ index }) => headercolumns[index].width}
            rowCount={heightcount}
            rowHeight={50}
          />
        )}
      </AutoSizer>
    </div>
  )
}

export default PaymentsTable;