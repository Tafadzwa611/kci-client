import React, { useState, useEffect } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Pager from './Pager';
import MainTable from './MainTable';

function Payments({payments, params, setPayments}) {
  return (
    <>
      <TableHeader payments={payments} params={params} setPayments={setPayments}/>
      <div style={{padding:"0", border:"none"}} className='table-container full__width font-12'>
        {payments.payments ?
          <div className="table-responsive full__table" >
              <MainTable 
                payments={payments} 
              />
          </div>
        : null}
      </div>
    </>
  )
}

const TableHeader = ({payments, params, setPayments}) => {
  return (
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager
          nextPageNumber={payments.next_page_num}
          params={params}
          loadMorePayments={() => console.log('loadMorePayments')}
          loadingMore={false}
          prevPageNumber={payments.prev_page_num}
          setPayments={setPayments}
        />
        <div style={{marginTop:'6px'}}>Showing {payments.payments.length} of {payments.count} payments.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {payments.number} of {payments.num_of_pages}</div>
        <div>
          <ReactHTMLTableToExcel
              id='test-table-xls-button'
              className='btn btn-default'
              table='payments'
              filename='payments'
              sheet='tablexls'
              buttonText='Download as XLS'
          />
        </div>
      </div>
    </div>
  )
}

export default Payments;
















































