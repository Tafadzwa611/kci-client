import React, { Suspense, lazy } from 'react';
import AccountingRoutes from './AccountingRoutes';
import AssetRoutes from './AssetRoutes';
import ClientRoutes from './ClientRoutes';
import ExpenseRoutes from './ExpenseRoutes';
import LoanRoutes from './LoanRoutes';
import OtherIncomeRoutes from './OtherIncomeRoutes';
import PaymentRoutes from './PaymentRoutes';
import ReportRoutes from './ReportRoutes';
import UserRoutes from './UserRoutes';
import { Routes as ReactRoutes, Route } from 'react-router-dom';

const Home = lazy(() => import('../Home/Home'));
const Dashboard = lazy(() => import('../Dashboard/Dashboard'));

const Routes = () => {
  return (
    <Suspense fallback='Loading...'>
      <ReactRoutes>
        <Route exact path='/home' element={<Home/>} />
        <Route exact path='/dashboard' element={<Dashboard/>}/>
        {AccountingRoutes}
        {AssetRoutes}
        {ClientRoutes}
        {ExpenseRoutes}
        {LoanRoutes}
        {OtherIncomeRoutes}
        {PaymentRoutes}
        {ReportRoutes}
        {UserRoutes}
      </ReactRoutes>
    </Suspense>
  )
}

export default Routes;