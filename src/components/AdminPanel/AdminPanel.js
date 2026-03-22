import React, { useEffect } from "react";
import ManageStaff from "./ManageStaff/ManageStaff";
import OtherIncomeTypes from "../OtherIncome/IncomeTypes/IncomeTypes";
import ExpenseTypes from "../Expenses/ExpenseTypes/ExpenseTypes";
import ManageLoans from "./ManageLoans/ManageLoans";
import ManageBranches from "./ManageBranches/ManageBranches";
import ManageClients from "./ManageClients/ManageClients";
import ManageFields from "./ManageFields/ManageFields";
import ManageComms from "./ManageComms/ManageComms";
import ManageCurrencies from "./ManageCurrencies/ManageCurrencies";
import ManageDeposits from "./ManageDeposits/ManageDeposits";
import ManageExpenses from "./ManageExpenses/ManageExpenses";
import ManageTransfers from "./ManageTranfers/ManageTransfers";
import { Routes, Route, Outlet, NavLink } from "react-router-dom";

const AdminPanel = () => {
  useEffect(() => {
    document.title = "View Admin";
  }, []);

  return (
    <Routes>
      <Route path="*" element={<Layout />}>
        <Route path="*" element={<ManageCurrencies />} />
        <Route path="staff/*" element={<ManageStaff />} />
        <Route path="otherincome" element={<OtherIncomeTypes />} />
        <Route path="expensetypes" element={<ExpenseTypes />} />
        <Route path="manageloans" element={<ManageLoans />} />
        <Route path="deposits/*" element={<ManageDeposits />} />
        <Route path="managebranches/*" element={<ManageBranches />} />
        <Route path="manageclients" element={<ManageClients />} />
        <Route path="managefields" element={<ManageFields />} />
        <Route path="managecomms" element={<ManageComms />} />
        <Route path="manageexps/*" element={<ManageExpenses />} />
        <Route path="managetransfers/*" element={<ManageTransfers />} />
      </Route>
    </Routes>
  );
};

function Layout() {
  return (
    <div className="card ui-card">
      <div className="card-body ui-card-body">
        <div className="ui-page-head">
          <h5 className="table-heading ui-page-title">View Admin</h5>
        </div>

        {/* Modern, scrollable tabs (mobile-first) */}
        <div className="ui-tabs" aria-label="Admin tabs">
          <Tab to="/users/admin" end>
            Currencies
          </Tab>

          {/* nested routes: use "includes" behavior by NOT using end */}
          <Tab to="/users/admin/staff">Manage Staff</Tab>

          <Tab to="/users/admin/manageclients">Manage Clients / Groups</Tab>
          <Tab to="/users/admin/manageloans">Manage Loans</Tab>
          <Tab to="/users/admin/deposits">Manage Deposits</Tab>
          <Tab to="/users/admin/managebranches">Manage Branches</Tab>
          <Tab to="/users/admin/managefields">Manage Forms</Tab>
          <Tab to="/users/admin/managecomms">Manage Comms</Tab>
          <Tab to="/users/admin/manageexps">Manage Expenses</Tab>
          <Tab to="/users/admin/managetransfers">Manage Transfers</Tab>
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

export default AdminPanel;