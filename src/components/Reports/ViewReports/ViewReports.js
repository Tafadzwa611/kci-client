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
import AuditTrail from '../AuditTrail/AuditTrail';
import CreditReport from '../CreditReport/CreditReport';
import LoanDistribution from '../LoanDistribution/LoanDistribution';
import GenderDistribution from '../GenderDistribution/GenderDistribution';
import MaturityProfile from '../MaturityProfile/MaturityProfile';
import {
  Routes,
  Route,
  Outlet,
  Link,
  useLocation
} from 'react-router-dom';

const ViewReports = () => {
  useEffect(() => {
    document.title = 'View Reports';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<ClientsReport />} />
        <Route path='loansreport' element={<LoansReport />} />
        <Route path='paymentsreport' element={<PaymentsReport />} />
        <Route path='expectedpaymentsreport' element={<ExpectedPaymentsReport />} />
        <Route path='monthlyreport' element={<MonthlyReport />} />
        <Route path='topborrowersreport' element={<TopBorrowers />} />
        <Route path='disbursementreport' element={<DisbursementReport />} />
        <Route path='loanproductreport' element={<LoanProductReport />} />
        <Route path='feesreport' element={<FeesReport />} />
        <Route path='loanofficerreport' element={<LoanOfficerReport />} />
        <Route path='dailyreport' element={<DailyReport />} />
        <Route path='portofolioatriskreport' element={<PortfolioAtRiskReport />} />
        <Route path='audittrail' element={<AuditTrail />} />
        <Route path='creditreport' element={<CreditReport />} />
        <Route path='loandistribution' element={<LoanDistribution />} />
        <Route path='genderdistribution' element={<GenderDistribution />} />
        <Route path='maturityprofile' element={<MaturityProfile />} />
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
            <Link to='/reports/viewreports/loandistribution' className={location.pathname === '/reports/viewreports/loandistribution' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Loan Distribution Report
            </Link>
            <Link to='/reports/viewreports/genderdistribution' className={location.pathname === '/reports/viewreports/genderdistribution' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Gender Distribution Report
            </Link>
            <Link to='/reports/viewreports/maturityprofile' className={location.pathname === '/reports/viewreports/maturityprofile' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Maturity Profile
            </Link>
            <Link to='/reports/viewreports/loansreport' className={location.pathname === '/reports/viewreports/loansreport' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Loans Report
            </Link>
            <Link to='/reports/viewreports/creditreport' className={location.pathname === '/reports/viewreports/creditreport' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Credit Report
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
            <Link to='/reports/viewreports/audittrail' className={location.pathname === '/reports/viewreports/audittrail' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Audit Trail
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