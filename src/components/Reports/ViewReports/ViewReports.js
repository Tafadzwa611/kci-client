import React, { useEffect } from "react";
import ClientsReport from "../ClientsReport/ClientsReport";
import LoansReport from "../LoansReport/LoansReport";
import MonthlyReport from "../MonthlyReport/MonthlyReport";
import TopBorrowers from "../TopBorrowers/TopBorrowers";
import DisbursementReport from "../DisbursementReport/DisbursementReport";
import LoanProductReport from "../LoanProductReport/LoanProductReport";
import FeesReport from "../FeesReport/FeesReport";
import LoanOfficerReport from "../LoanOfficerReport/LoanOfficerReport";
import DailyReport from "../DailyReport/DailyReport";
import PaymentsReport from "../PaymentsReport/PaymentsReport";
import PortfolioAtRiskReport from "../PortfolioAtRiskReport/PortfolioAtRiskReport";
import ExpectedPaymentsReport from "../ExpectedPaymentsReport/ExpectedPaymentsReport";
import AuditTrail from "../AuditTrail/AuditTrail";
import CreditReport from "../CreditReport/CreditReport";
import LoanDistribution from "../LoanDistribution/LoanDistribution";
import GenderDistribution from "../GenderDistribution/GenderDistribution";
import MaturityProfile from "../MaturityProfile/MaturityProfile";
import PortfolioMgt from "../PortfolioMgt/PortfolioMgt";
import AssetQuality from "../AssetQuality/AssetQuality";
import DebtorsList from "../DebtorsList/DebtorsList";
import LoansGranted from "../LoansGranted/LoansGranted";
import CashReceipts from "../CashReceipts/CashReceipts";
import AllTxnsReport from "../AllTxnsReport/AllTxnsReport";
import ReceiptNumbers from "../ReceiptNumbers/ReceiptNumbers";
import { Routes, Route, Outlet, NavLink } from "react-router-dom";

const ViewReports = () => {
  useEffect(() => {
    document.title = "View Reports";
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ClientsReport />} />
        <Route path="loansreport" element={<LoansReport />} />
        <Route path="paymentsreport" element={<PaymentsReport />} />
        <Route path="expectedpaymentsreport" element={<ExpectedPaymentsReport />} />
        <Route path="monthlyreport" element={<MonthlyReport />} />
        <Route path="topborrowersreport" element={<TopBorrowers />} />
        <Route path="disbursementreport" element={<DisbursementReport />} />
        <Route path="loanproductreport" element={<LoanProductReport />} />
        <Route path="feesreport" element={<FeesReport />} />
        <Route path="loanofficerreport" element={<LoanOfficerReport />} />
        <Route path="dailyreport" element={<DailyReport />} />
        <Route path="portofolioatriskreport" element={<PortfolioAtRiskReport />} />
        <Route path="audittrail" element={<AuditTrail />} />
        <Route path="creditreport" element={<CreditReport />} />
        <Route path="loandistribution" element={<LoanDistribution />} />
        <Route path="genderdistribution" element={<GenderDistribution />} />
        <Route path="maturityprofile" element={<MaturityProfile />} />
        <Route path="portfoliomgt" element={<PortfolioMgt />} />
        <Route path="assetquality" element={<AssetQuality />} />
        <Route path="debtorslist" element={<DebtorsList />} />
        <Route path="loansgranted" element={<LoansGranted />} />
        <Route path="cashreceipts" element={<CashReceipts />} />
        <Route path="txns-report" element={<AllTxnsReport />} />
        <Route path="receipt-numbers" element={<ReceiptNumbers />} />
      </Route>
    </Routes>
  );
};

function Layout() {
  return (
    <div className="card ui-card">
      <div className="card-body ui-card-body">
        <div className="ui-page-head">
          <h5 className="table-heading ui-page-title">View Reports</h5>
        </div>

        {/* Modern, scrollable tabs (mobile-first) */}
        <div className="ui-tabs" aria-label="Reports tabs">
          <Tab to="/reports/viewreports" end>
            Client Reports
          </Tab>
          <Tab to="/reports/viewreports/loandistribution">Loan Distribution</Tab>
          <Tab to="/reports/viewreports/genderdistribution">Gender Distribution</Tab>
          <Tab to="/reports/viewreports/maturityprofile">Maturity Profile</Tab>
          <Tab to="/reports/viewreports/portfoliomgt">Portfolio Management</Tab>
          {/* <Tab to="/reports/viewreports/assetquality">Asset Quality</Tab> */}
          <Tab to="/reports/viewreports/loansreport">Loans Report</Tab>
          <Tab to="/reports/viewreports/creditreport">Credit Report</Tab>
          <Tab to="/reports/viewreports/paymentsreport">Payments</Tab>
          <Tab to="/reports/viewreports/expectedpaymentsreport">Expected Payments</Tab>
          <Tab to="/reports/viewreports/monthlyreport">Monthly</Tab>
          <Tab to="/reports/viewreports/topborrowersreport">Top Borrowers</Tab>
          <Tab to="/reports/viewreports/disbursementreport">Disbursement</Tab>
          <Tab to="/reports/viewreports/loanproductreport">Loan Product</Tab>
          <Tab to="/reports/viewreports/feesreport">Fees Report</Tab>
          <Tab to="/reports/viewreports/loanofficerreport">Loans Officer</Tab>
          <Tab to="/reports/viewreports/dailyreport">Daily Report</Tab>
          <Tab to="/reports/viewreports/portofolioatriskreport">Par Report</Tab>
          <Tab to="/reports/viewreports/debtorslist">Debtors List</Tab>
          <Tab to="/reports/viewreports/loansgranted">Loans Granted</Tab>
          <Tab to="/reports/viewreports/cashreceipts">Cash Receipts</Tab>
          <Tab to="/reports/viewreports/audittrail">Audit Trail</Tab>
          <Tab to="/reports/viewreports/txns-report">All Transactions</Tab>
          <Tab to="/reports/viewreports/receipt-numbers">Receipt Numbers</Tab>
        </div>

        <div className="tab-content font-12 ui-tab-panel">
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
      className={({ isActive }) => `ui-tab ${isActive ? "is-active" : ""}`}
    >
      {children}
    </NavLink>
  );
}

export default ViewReports;