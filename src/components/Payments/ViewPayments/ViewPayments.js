import React, { useEffect } from 'react';
import Payments from '../Payments/Payments';
import PaymentsChart from '../PaymentsChart/PaymentsChart';
import ExcelPayments from '../ExcelPayments/ExcelPayments';
import Requests from '../Requests/Requests';
import ExcelPaymentsReport from '../ExcelPaymentsReport/ExcelPaymentsReport';
import {
  Routes,
  Route,
  Outlet,
  NavLink
} from 'react-router-dom';

const ViewPayments = () => {
  useEffect(() => {
    document.title = 'View Payments';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Payments />} />
        <Route path='excelpayments' element={<ExcelPayments />} />
        <Route path='paymentschart' element={<PaymentsChart />} />
        <Route path='requests' element={<Requests />} />
        <Route path='paymentsreport/:reportId' element={<ExcelPaymentsReport />} />
      </Route>
    </Routes>
  );
};

function Layout() {
  return (
    <div className='card ui-card'>
      <div className='card-body ui-card-body'>
        <div className='ui-page-head'>
          <h5 className='table-heading ui-page-title'>View Payments</h5>
        </div>

        <div className='ui-tabs' aria-label='Payments tabs'>
          <Tab to='/payments/viewpayments' end>
            View Payments
          </Tab>
          <Tab to='/payments/viewpayments/excelpayments'>
            Upload File
          </Tab>
          <Tab to='/payments/viewpayments/paymentschart'>
            Payments Chart
          </Tab>
          <Tab to='/payments/viewpayments/requests'>
            Requests
          </Tab>
        </div>

        <div className='tab-content font-12 ui-tab-panel'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function Tab({ to, end, children }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `ui-tab ${isActive ? 'is-active' : ''}`}
    >
      {children}
    </NavLink>
  );
}

export default ViewPayments;