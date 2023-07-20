import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const Accounting = lazy(() => import('../Accounting/Accounting'));

const AccountingRoutes = (
  <Route exact path='/accounting/viewaccounting/*' element={<Accounting/>}/>
)


export default AccountingRoutes;