import React from 'react';
import 'react-virtualized/styles.css';
// import '../payments_report/payments_report.css';
import {AutoSizer, MultiGrid} from 'react-virtualized';


const headerCols = [
    { name: 'status', displayName: 'Status', width: 120 },
    { name: 'uploader_fullname', displayName: 'Uploaded By', width: 200 },
    { name: 'ref_col', displayName: 'Excel Reference Col', width: 150 },
    { name: 'amount_col', displayName: 'Excel Amount Col', width: 120 },
    { name: 'field_name', displayName: 'Database Reference Field', width: 300 },
    { name: 'started_at', displayName: 'Started At', width: 200 },
    { name: 'completed_at', displayName: 'Completed At', width: 200 }
];

const DBREFS = {
    loan_id: 'Loan Number',
    client__client_id: 'Client Number',
    client__ec_number: 'Client EC Number',
    client__identification_number: 'Client ID Number'
};

function PaymentsReportList({reports}) {
    const heightCount = reports.length + 1;
    const rowHeight = 40;
    const height = heightCount*rowHeight < 690 ? heightCount*rowHeight : 690;

    const renderHeaderColumns = columnIndex => {
        const headerCol = headerCols[columnIndex];
        return <div key={headerCol.name}>{headerCol.displayName}</div>
  }

    const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
        if (rowIndex === 0) {
            return <div key={key} style={style}>{renderHeaderColumns(columnIndex)}</div>
        } else {
            const columnName = headerCols[columnIndex].name;
            if (columnName === 'field_name') {
                return <div key={key} style={style}>{DBREFS[reports[rowIndex-1][columnName]]}</div>
        }else if (columnName === 'status') {
            const id = reports[rowIndex-1]['id'];
            return (
            <div key={key} style={style}>
                <a href={`/reports/reportsapp/#/paymentsreport/${id}`}>{reports[rowIndex-1][columnName]}</a>
            </div>
            )
        }
        return <div key={key} style={style}>{reports[rowIndex-1][columnName]}</div>
        }
    }

        return (
            <div className='card-body react-virtualized-table'>
            <AutoSizer>
                {({ width }) => (
                <MultiGrid
                    cellRenderer={cellRenderer}
                    fixedRowCount={1}
                    height={height}
                    width={width}
                    columnCount={headerCols.length}
                    columnWidth={({ index }) => headerCols[index].width}
                    rowCount={heightCount}
                    rowHeight={rowHeight}
                />
                )}
            </AutoSizer>
            </div>
        )
}

export default PaymentsReportList;