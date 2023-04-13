// import React from 'react';
// import 'react-virtualized/styles.css';
// // import '../payments_report/payments_report.css';
// import {AutoSizer, MultiGrid} from 'react-virtualized';


// const headerCols = [
//   { name: 'status', displayName: 'Status', width: 500 },
//   { name: 'reference', displayName: 'Reference', width: 200 },
//   { name: 'amount_paid', displayName: 'Amount Paid', width: 150 },
//   { name: 'payment__loan__loan_id', displayName: 'Loan', width: 150 }
// ];

// function Payments({payments}) {
//   console.log(payments);
//   const heightCount = payments.length + 1;
//   const rowHeight = 40;
//   const height = 690;

//   const renderHeaderColumns = columnIndex => {
//     const headerCol = headerCols[columnIndex];
//     return <div key={headerCol.name}>{headerCol.displayName}</div>;
//   }

//   const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
//     if (rowIndex === 0) {
//       return <div key={key} style={style}>{renderHeaderColumns(columnIndex)}</div>
//     } else {
//       const columnName = headerCols[columnIndex].name;
//       if (columnName === 'status') {
//         const failReason = payments[rowIndex-1]['fail_reason'];
//         return <div key={key} style={style}><b>{payments[rowIndex-1][columnName]}</b> {failReason}</div>
//       }else if (columnName === 'payment__loan__loan_id') {
//         const id = payments[rowIndex-1]['payment__loan__id'];
//         return (
//           <div key={key} style={style}>
//             <a href={`/loans/loan_detail/${id}`}>{payments[rowIndex-1][columnName]}</a>
//           </div>
//         )
//       }
//       return <div key={key} style={style}>{payments[rowIndex-1][columnName]}</div>
//     }
//   }

//   return (
//     <div className='react-virtualized-table'>
//       <AutoSizer>
//         {({ width }) => (
//           <MultiGrid
//             cellRenderer={cellRenderer}
//             fixedRowCount={1}
//             height={height}
//             width={width}
//             columnCount={headerCols.length}
//             columnWidth={({ index }) => headerCols[index].width}
//             rowCount={heightCount}
//             rowHeight={rowHeight}
//           />
//         )}
//       </AutoSizer>
//     </div>
//   )
// }

// export default Payments;


import React from 'react';
import { useVirtual, Table } from "@af-utils/react-table";

const columns = [
  {key: "Status"},
  {key: "Reference"},
  {key: "Amount_Paid"},
  {key: "Loan"},
];

const Payments = ({payments}) => {

  const model = useVirtual({
      itemCount: payments.length
  });

  const getRowData = i => {
    const payment = payments[i];
    return {
        "Status": payment.status,
        "Reference": payment.reference,
        "Amount_Paid": payment.amount_paid,
        "Loan": payment.payment__loan__loan_id,
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

export default Payments;

