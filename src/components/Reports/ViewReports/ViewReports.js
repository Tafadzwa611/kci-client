import React, {useEffect} from 'react';
import ClientsReport from '../ClientsReport/ClientsReport';
import LoansReport from '../LoansReport/LoansReport';
import MonthlyReport from '../MonthlyReport/MonthlyReport';
import TopBorrowers from '../TopBorrowers/TopBorrowers';
import DisbursementReport from '../DisbursementReport/DisbursementReport';
import LoanProductReport from '../LoanProductReport/LoanProductReport';
import FeesReport from '../FeesReport/FeesReport';
import LoanOfficerReport from '../LoanOfficerReport/LoanOfficerReport';
import DailyReport from '../DailyReport/DailyReport';
import PaymentsReport from '../PaymentsReport/PaymentsReport';
import PortfolioAtRiskReport from '../PortfolioAtRiskReport/PortfolioAtRiskReport';
import ExpectedPaymentsReport from '../ExpectedPaymentsReport/ExpectedPaymentsReport';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';
import {
  Routes,
  Route,
  Outlet,
  Link,
  useLocation
} from 'react-router-dom';

const ViewReports = () => {
  const {loggedInUser} = useLoggedInUser()

  useEffect(() => {
    document.title = 'View Reports';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<ClientsReport loggedInUser={loggedInUser} />} />
        <Route path='loansreport' element={<LoansReport loggedInUser={loggedInUser} />} />
        <Route path='paymentsreport' element={<PaymentsReport />} />
        <Route path='expectedpaymentsreport' element={<ExpectedPaymentsReport />} />
        <Route path='monthlyreport' element={<MonthlyReport loggedInUser={loggedInUser} />} />
        <Route path='topborrowersreport' element={<TopBorrowers loggedInUser={loggedInUser} />} />
        <Route path='disbursementreport' element={<DisbursementReport loggedInUser={loggedInUser} />} />
        <Route path='loanproductreport' element={<LoanProductReport loggedInUser={loggedInUser} />} />
        <Route path='feesreport' element={<FeesReport loggedInUser={loggedInUser} />} />
        <Route path='loanofficerreport' element={<LoanOfficerReport loggedInUser={loggedInUser} />} />
        <Route path='dailyreport' element={<DailyReport loggedInUser={loggedInUser} />} />
        <Route path='portofolioatriskreport' element={<PortfolioAtRiskReport loggedInUser={loggedInUser} />} />
      </Route>
    </Routes>
  )
}


function Layout() {
  const location = useLocation();

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='table-heading' style={{marginBottom:'20px'}}>View Reports</h5>
        <>
          <div className='bloc-tabs'>
            <Link to='/reports/viewreports' className={location.pathname === '/reports/viewreports' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Client Reports
            </Link>
            <Link to='/reports/viewreports/loansreport' className={location.pathname === '/reports/viewreports/loansreport' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Loans Report
            </Link>
            <Link to='/reports/viewreports/paymentsreport' className={location.pathname === '/reports/viewreports/paymentsreport' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Payments
            </Link>
            <Link to='/reports/viewreports/expectedpaymentsreport' className={location.pathname === '/reports/viewreports/expectedpaymentsreport' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Expected Payments
            </Link>
            <Link to='/reports/viewreports/monthlyreport' className={location.pathname === '/reports/viewreports/monthlyreport' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Monthly
            </Link>
            <Link to='/reports/viewreports/topborrowersreport' className={location.pathname === '/reports/viewreports/topborrowersreport' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Top Borrowers
            </Link>
            <Link to='/reports/viewreports/disbursementreport' className={location.pathname === '/reports/viewreports/disbursementreport' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Disbursement
            </Link>
            <Link to='/reports/viewreports/loanproductreport' className={location.pathname === '/reports/viewreports/loanproductreport' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Loan Product
            </Link>
            <Link to='/reports/viewreports/feesreport' className={location.pathname === '/reports/viewreports/feesreport' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Fees Report
            </Link>
            <Link to='/reports/viewreports/loanofficerreport' className={location.pathname === '/reports/viewreports/loanofficerreport' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Loans Officer
            </Link>
            <Link to='/reports/viewreports/dailyreport' className={location.pathname === '/reports/viewreports/dailyreport' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Daily Report
            </Link>
            <Link to='/reports/viewreports/portofolioatriskreport' className={location.pathname === '/reports/viewreports/portofolioatriskreport' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Par Report
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

export default ViewReports;
