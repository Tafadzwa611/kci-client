import React, { useState } from 'react';
import MainTable from './MainTable';
import MiniTable from './MiniTable';
import MiniExpenseDetails from './MiniExpenseDetails';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Pager from './Pager';

function Table({expenseData, setExpenseData, params}) {
  const [expenseId, setExpenseId] = useState(null);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  const handleClick = (e) => {
    setExpenseId(e.target.id);
    setSelectedExpenseId(e.target.id);
  }

  return (
    <>
      <TableHeader expenseData={expenseData} params={params} setExpenseData={setExpenseData}/>
      <div style={{padding:"0", border:"none"}} className={expenseId ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
        <div className={expenseId ? "table-responsive journal__table-container-journals" : "table-responsive full__table"} >
          {expenseId ?
            <MiniTable 
              expenseData={expenseData} 
              handleClick={handleClick} 
              selectedExpenseId={selectedExpenseId}
            /> :
            <MainTable 
              expenseData={expenseData} 
              handleClick={handleClick}
            />
          }
          {expenseId && (
            <MiniExpenseDetails
              key={expenseId}
              expenseId={expenseId}
              setExpenseId={setExpenseId}
              setExpenseData={setExpenseData}
            />
          )}
        </div>
      </div>
    </>
  )
}

const TableHeader = ({expenseData, params, setExpenseData}) => {
  return (
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager
          nextPageNumber={expenseData.next_page_num}
          params={params}
          loadMoreExpenses={() => console.log('loadMoreExpenses')}
          loadingMore={false}
          prevPageNumber={expenseData.prev_page_num}
          setExpenseData={setExpenseData}
        />
        <div style={{marginTop:'6px'}}>Showing {expenseData.expenses.length} of {expenseData.count} expenses.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {expenseData.number} of {expenseData.num_of_pages}</div>
        <div>
          <ReactHTMLTableToExcel
              id='test-table-xls-button'
              className='btn btn-default'
              table='loans'
              filename='expenses'
              sheet='tablexls'
              buttonText='Download as XLS'
          />
        </div>
      </div>
    </div>
  )
}

export default Table;
















































