import React, { useState, useEffect } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Pager from './Pager';
import MainTable from './MainTable';

function PaymentsList({paymentsData, params, setPayments}) {

  return (
    <>
      <TableHeader paymentsData={paymentsData} params={params} setPayments={setPayments}/>
      <div style={{padding:"0", border:"none"}} className='table-container full__width font-12'>
        <div className="table-responsive full__table" >
            <MainTable 
              paymentsData={paymentsData} 
            />
        </div>
      </div>
    </>
  )
}

const TableHeader = ({paymentsData, params, setPayments}) => {
  return (
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager
          nextPageNumber={paymentsData.next_page_num}
          params={params}
          loadMorePayments={() => console.log('loadMorePayments')}
          loadingMore={false}
          prevPageNumber={paymentsData.prev_page_num}
          setPayments={setPayments}
        />
        <div style={{marginTop:'6px'}}>Showing {paymentsData.payments.length} of {paymentsData.count} payments.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {paymentsData.number} of {paymentsData.num_of_pages}</div>
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

export default PaymentsList;
















































