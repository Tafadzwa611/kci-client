import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const TableHeader = ({tableName, length, totalCount, pageNum, numOfpages}) => {
  return (
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Showing {length} of {totalCount} rows.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {pageNum} of {numOfpages}</div>
        <div>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='btn btn-default'
            table={tableName}
            filename={tableName}
            sheet='tablexls'
            buttonText='Download as XLS'
          />
        </div>
      </div>
    </div>
  )
}

export default TableHeader;