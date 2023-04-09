import React, { useState } from 'react';
import MainTable from './MainTable';
import MiniTable from './MiniTable';
import MiniExpenseDetails from './MiniExpenseDetails';
import { Fetcher } from '../../../common';

function Table({expenseData, setExpenseDetails}) {
  const [expenseId, setExpenseId] = useState(null);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  const handleClick = (e) => {
    setExpenseId(e.target.id);
    setSelectedExpenseId(e.target.id);
  }

  return (
    <div style={{padding:"0", border:"none"}} className={expenseId ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
      <div className={expenseId ? "table-responsive journal__table-container-journals" : "table-responsive full__table"} >
        <div className="table__height">
          {expenseId ?
            <MiniTable expenseData={expenseData} handleClick={handleClick} selectedExpenseId={selectedExpenseId}/> :
            <MainTable expenseData={expenseData} handleClick={handleClick}/>
          }
        </div>
        {expenseId &&
        <Fetcher urls={[`/expensesapi/get_expense/${expenseId}/`]} extra={{setExpenseDetails}}>
          {({data, extra}) => <MiniExpenseDetails expenseDetails={data[0]} extra={extra}/>}
        </Fetcher>
        }
      </div>
    </div>
  )
}

export default Table;
















































