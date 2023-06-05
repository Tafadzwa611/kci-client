import React, {useEffect} from 'react';
import Payments from '../Payments/Payments';
import ViewPaymentsChart from '../PaymentsChart/ViewPaymentsChart';
import PaymentsReport from '../PaymentsReport/PaymentsReport';
import ExcelPayments from '../ExcelPayments/ExcelPayments';
import { Routes, Route, Outlet, Link, useLocation } from 'react-router-dom';
import ExcelPaymentsReport from '../ExcelPaymentsReport/ExcelPaymentsReport';

const ViewPayments = () => {
    useEffect(() => {
        document.title = 'View Payments';
    }, []);

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Payments />} />
                <Route path='bulkpayments' element={<BulkPaymnents />} />
                <Route path='excelpayments' element={<ExcelPayments />} />
                <Route path='paymentschart' element={<ViewPaymentsChart />} />
                <Route path='paymentsreport/:reportId' element={<ExcelPaymentsReport />} />
            </Route>
        </Routes>
    )
}

const BulkPaymnents = () => {
    return (
        <div>Bulk Payments</div>
    )
}


function Layout() {
    const location = useLocation();

    return (
        <div className='card'>
            <div className='card-body'>
                <h5 className='table-heading' style={{marginBottom:'20px'}}>View Payments</h5>
                <>
                    <div className='bloc-tabs'>
                        <Link to='/payments/viewpayments' id='list' className={location.pathname === '/payments/viewpayments' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
                            View Payments
                        </Link>
                        <Link to='/payments/viewpayments/bulkpayments' id='add' className={location.pathname === '/payments/viewpayments/bulkpayments' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
                            Add Payments
                        </Link>
                        <Link to='/payments/viewpayments/excelpayments' id='upload' className={location.pathname === '/payments/viewpayments/excelpayments' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
                            Upload File
                        </Link>
                        <Link to='/payments/viewpayments/paymentschart' id='chart' className={location.pathname === '/payments/viewpayments/paymentschart' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
                            Payments Chart
                        </Link>
                    </div>
                    <div className='tab-content font-12' style={{marginTop:'3rem'}}>
                        <Outlet />
                    </div>
                </>
            </div>
        </div>
    )
}

export default ViewPayments;
