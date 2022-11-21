import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const ExpenseTypes = lazy(() => import('../Expenses/ExpenseTypes'));
const Expenses = lazy(() => import('../Expenses/Expenses'));

const ExpenseRoutes = (
  <>
    <Route exact path='/expenses/expensetypes' element={<ExpenseTypes/>}/>
    <Route exact path='/expenses/expenses' element={<Expenses/>}/>
  </>
)

export default ExpenseRoutes;