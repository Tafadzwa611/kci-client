import React, {useState} from 'react';
import Filter from './Filter';
import Table from './Table';
import ExpenseDetails from './ExpenseDetails';
import { useSearchParams } from 'react-router-dom';

function List({ expensetypes }) {
  const [searchParams] = useSearchParams();
  const [params, setParams] = useState(null);
  const [expenseData, setExpenseData] = useState({count: 0, next_page_num: 0, expenses: []});

  return (
    <>
      {searchParams.get('expense_id') ?
        <ExpenseDetails expenseId={searchParams.get('expense_id')} /> :
        <>
          <Filter setExpenseData={setExpenseData} setParams={setParams} expensetypes={expensetypes}/>
          <div style={{paddingTop: '2rem'}}></div>
          <Table
            expenseData={expenseData} 
            setExpenseData={setExpenseData}
            params={params}
          />
        </>
      }
    </>
  )
}

export default List;