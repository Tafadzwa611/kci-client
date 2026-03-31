import React, { useEffect } from "react";
import Cashflow from "./Cashflow/Cashflow";
import CashReport from "./CashReport/CashReport";
import ProfitAndLoss from "./ProfitAndLoss/ProfitAndLoss";
import TrialBalance from "./TrialBalance/TrialBalance";
import Journals from "./Journals/Journals";
import ChartsOfAccounts from "./ChartsOfAccounts/ChartsOfAccounts";
import BalanceSheet from "./BalanceSheet/BalanceSheet";
import Ledger from "./Ledger/Ledger";
import CashCountReport from "./CashCountReport/CashCountReport";
import RecordCashCount from "./CashCountReport/RecordCashCount";
import History from "./CashCountReport/History";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";
import { Routes, Route, Outlet, NavLink } from "react-router-dom";

const ViewAccounting = () => {
  const { loggedInUser } = useLoggedInUser();

  useEffect(() => {
    document.title = "View Accounting";
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Cashflow loggedInUser={loggedInUser} />} />
        <Route path="cashreport" element={<CashReport loggedInUser={loggedInUser} />} />
        <Route path="balanced_cashbook" element={<CashCountReport />} />
        <Route path="record_cash_count" element={<RecordCashCount />} />
        <Route path='balanced_cashbook/:accountId' element={<History />} />
        <Route path="profitandloss" element={<ProfitAndLoss />} />
        <Route path="trialbalance" element={<TrialBalance />} />
        <Route path="balancesheet" element={<BalanceSheet />} />
        <Route path="journals/*" element={<Journals loggedInUser={loggedInUser} />} />
        <Route path="chartsofaccounts/*" element={<ChartsOfAccounts />} />
        <Route path="ledger" element={<Ledger />} />
      </Route>
    </Routes>
  );
};

function Layout() {
  return (
    <div className="card ui-card">
      <div className="card-body ui-card-body">
        <div className="ui-page-head">
          <h5 className="table-heading ui-page-title">View Accounting</h5>
        </div>

        {/* Modern, scrollable tabs (mobile-first) */}
        <div className="ui-tabs" aria-label="Accounting tabs">
          <Tab to="/accounting/viewaccounting" end>
            Cashflow
          </Tab>
          <Tab to="/accounting/viewaccounting/cashreport">Cash Book</Tab>
          <Tab to="/accounting/viewaccounting/balanced_cashbook">Balanced Cashbook</Tab>
          <Tab to="/accounting/viewaccounting/profitandloss">Comprehensive Income</Tab>
          <Tab to="/accounting/viewaccounting/trialbalance">Trial Balance</Tab>
          <Tab to="/accounting/viewaccounting/balancesheet">Balance Sheet</Tab>
          <Tab to="/accounting/viewaccounting/journals">Journal Entries</Tab>
          <Tab to="/accounting/viewaccounting/chartsofaccounts">Chart of Accounts</Tab>
          <Tab to="/accounting/viewaccounting/ledger">Ledger</Tab>
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

export default ViewAccounting;