import React from 'react';
import Payments from '../Payments/Payments';
import PaymentsChart from '../PaymentsChart/PaymentsChart';
import ExcelPayments from '../ExcelPayments/ExcelPayments';
import Requests from '../Requests/Requests';
import { Routes, Route, Outlet, Link, useLocation } from 'react-router-dom';
import ExcelPaymentsReport from '../ExcelPaymentsReport/ExcelPaymentsReport';


const ViewPayments = () => {
  React.useEffect(() => {
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
  )
}

function Layout() {
  const location = useLocation();

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='table-heading' style={{marginBottom:'20px'}}>View Payments</h5>
        <div className='bloc-tabs'>
          <Link to='/payments/viewpayments' id='list' className={location.pathname === '/payments/viewpayments' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
            View Payments
          </Link>
          <Link to='/payments/viewpayments/excelpayments' id='upload' className={location.pathname === '/payments/viewpayments/excelpayments' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
            Upload File
          </Link>
          <Link to='/payments/viewpayments/paymentschart' id='chart' className={location.pathname === '/payments/viewpayments/paymentschart' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
            Payments Chart
          </Link>
          <Link to='/payments/viewpayments/requests' id='chart' className={location.pathname === '/payments/viewpayments/requests' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
            Requests
          </Link>
        </div>
        <div className='tab-content font-12' style={{marginTop:'3rem'}}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ViewPayments;
