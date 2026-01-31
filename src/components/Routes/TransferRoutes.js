import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const ViewTransfers = lazy(() => import('../Transfers/ViewTransfers/ViewTransfers'));

const DepositRoutes = (
  <Route exact path='/transfers/viewtransfers/*' element={<ViewTransfers/>}/>
)


export default DepositRoutes;