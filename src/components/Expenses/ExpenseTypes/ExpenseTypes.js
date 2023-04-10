import React, { useState } from 'react';
import { Fetcher } from '../../../common';
import List from './List';
import { useSearchParams } from 'react-router-dom';
import Filter from './Filter';

function ExpenseTypes() {
  const [searchParams] = useSearchParams();
  const [expenseTypeData, setExpenseTypeData] = useState([]);

  return (
    <>
      <List expenseTypeData={expenseTypeData} setExpenseTypeData={setExpenseTypeData} />
    </>
  )
}

export default ExpenseTypes;
