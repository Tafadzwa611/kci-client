import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const Expenses = lazy(() => import('../Expenses/ViewExpenses'));

const ExpenseRoutes = (
  <>
    <Route exact path='/expenses/viewexpenses/*' element={<Expenses/>}/>

  </>
)

export default ExpenseRoutes;