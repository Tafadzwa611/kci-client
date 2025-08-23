import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const Deposits = lazy(() => import('../Deposits/Deposits'));

const DepositRoutes = (
  <Route exact path='/deposits/*' element={<Deposits/>}/>
)


export default DepositRoutes;