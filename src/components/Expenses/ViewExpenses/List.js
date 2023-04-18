import React, {useState} from 'react';
import Filter from './Filter';
import Table from './Table';
import ExpenseDetails from './ExpenseDetails';
import { useSearchParams } from 'react-router-dom';
import { Fetcher } from '../../../common';

function List() {
  const [searchParams] = useSearchParams();
  const [expenseData, setEpenseData] = useState({count: 0, next_page_num: 0, expenses: []});
  const [expenseDetails, setExpenseDetails] = useState(null);


  return (
    <>
      {searchParams.get('expense_id') ?
        <ExpenseDetailsView expenseId={searchParams.get('expense_id')} expenseDetails={expenseDetails}/> :
        <>
          <Filter setEpenseData={setEpenseData}/>
          <div style={{paddingTop: '2rem'}}></div>
          <Table
            expenseData={expenseData} 
            setExpenseDetails={setExpenseDetails}
            setEpenseData={setEpenseData}
          />
        </>
      }
    </>
  )
}

const ExpenseDetailsView = ({expenseId, expenseDetails}) => {
  if (expenseDetails) {
    return <ExpenseDetails expenseDetails={expenseDetails}/>
  }

  return (
    <Fetcher urls={[`/expensesapi/get_expense/${expenseId}/`]}>
      {({data}) => <ExpenseDetails expenseDetails={data[0]}/>}
    </Fetcher>
  )
}

export default List;