import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const OtherIncome = lazy(() => import('../OtherIncome/OtherIncome'))
const OtherIncomeTypes = lazy(() => import('../OtherIncome/OtherIncomeTypes'));

const OtherIncomeRoutes = (
  <>
    <Route exact path='/otherincome/otherincmoe' element={<OtherIncome/>}/>
    <Route exact path='/otherincome/otherincometypes' element={<OtherIncomeTypes/>}/>
  </>
)

export default OtherIncomeRoutes;