import React, { useState, useEffect } from 'react';
import MainTable from './MainTable';
import MiniTable from './MiniTable';
import MiniExpenseDetails from './MiniExpenseDetails';
import { Fetcher } from '../../../common';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function Table({expenseData, setExpenseDetails, setEpenseData}) {
  const [expenseId, setExpenseId] = useState(null);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);


  const handleClick = (e) => {
    setExpenseId(e.target.id);
    setSelectedExpenseId(e.target.id);
  }

  return (
    <>
      {expenseId ?
        <div className='table-header'>
          <div>
            Showing {expenseData.expenses.length} of {expenseData.count} expenses.
          </div>
        </div>
      :
        <div className='table-header'>
          <div>
            Showing {expenseData.expenses.length} of {expenseData.count} expenses.
          </div>
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
      }
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
          {expenseId &&
          <Fetcher urls={[`/expensesapi/get_expense/${expenseId}/`]} extra={{setExpenseDetails, setExpenseId, setEpenseData}}>
            {({data, extra}) => <MiniExpenseDetails expenseDetails={data[0]} extra={extra}/>}
          </Fetcher>
          }
        </div>
      </div>
    </>
  )
}

export default Table;
















































