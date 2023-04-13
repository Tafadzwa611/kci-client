import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const ViewPayments = lazy(() => import('../Payments/ViewPayments/ViewPayments'));

const PaymentRoutes = (
  <>
    <Route exact path='/payments/viewpayments/*' element={<ViewPayments/>}/>
  </>
)

export default PaymentRoutes;