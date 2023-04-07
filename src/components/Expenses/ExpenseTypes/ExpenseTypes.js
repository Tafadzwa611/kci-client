import React, { useState } from 'react';
import { Fetcher } from '../../../common';
import List from './List';

function ExpenseTypes() {
  const [expenseTypeId, setExpenseTypeId] = useState(null);

  return (
    <>
      <Fetcher urls={['/expensesapi/expensetypeslist/']} extra={{expenseTypeId, setExpenseTypeId}}>
        {({data, extra}) => <List data={data[0]} extra={extra}/>}
      </Fetcher>
    </>
  )
}

export default ExpenseTypes;