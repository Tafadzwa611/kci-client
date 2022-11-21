import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const ViewAccounting = lazy(() => import('../Accounting/ViewAccounting/ViewAccounting'));
const AddMainAccount = lazy(() => import('../Accounting/AddMainAccount/AddMainAccount'));

const AccountingRoutes = (
  <>
    <Route exact path='/accounting/viewaccounting' element={<ViewAccounting/>}/>
    <Route exact path='/accounting/addmainaccount' element={<AddMainAccount/>}/>
  </>
)


export default AccountingRoutes;