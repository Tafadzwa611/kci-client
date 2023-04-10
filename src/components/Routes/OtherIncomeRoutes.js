import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const OtherIncome = lazy(() => import('../OtherIncome/ViewOtherIncome'))

const OtherIncomeRoutes = (
  <>
    <Route exact path='/otherincome/viewotherincome/*' element={<OtherIncome/>}/>
  </>
)

export default OtherIncomeRoutes;