import React, { useEffect } from "react";
import { Routes, Route, Outlet, NavLink } from "react-router-dom";
import ExpenseSettings from "./ExpensesSettings";
import ExpenseTypes from "./ExpenseTypes/ExpenseTypes";
import AddExpenseType from "./ExpenseTypes/AddExpenseType";
import CreateResults from "./ExpenseTypes/CreateResults";
import EditExpenseType from "./ExpenseTypes/EditExpenseType";
import Budgets from "./Budgets/Budgets";
import AddBudget from "./Budgets/AddBudget";
import BudgetResults from "./Budgets/BudgetResults";
import EditBudget from "./Budgets/EditBudget";
import DeleteBudget from "./Budgets/DeleteBudget";
import BudgetDetails from "./Budgets/BudgetDetails";
import ReceiptBooks from "./ReceiptBooks/ReceiptBooks";
import AddReceiptBook from "./ReceiptBooks/AddReceiptBook";
import ReceiptBookDetails from "./ReceiptBooks/ReceiptBookDetails";
import UpdateReceiptBook from "./ReceiptBooks/UpdateReceiptBook";
import DeleteReceiptBook from "./ReceiptBooks/DeleteReceiptBook";

function ManageExpenses() {
  useEffect(() => {
    document.title = "Manage Expenses - Admin Panel";
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ExpenseSettings />} />
        <Route path="expensetypes" element={<ExpenseTypes />} />
        <Route path="addtype" element={<AddExpenseType />} />
        <Route path="edittypes/:typeId" element={<EditExpenseType />} />
        <Route path="addresults" element={<CreateResults />} />
        <Route path="budgets" element={<Budgets />} />
        <Route path="addbudget" element={<AddBudget />} />
        <Route path="budget-results" element={<BudgetResults />} />
        <Route path="edit-budget/:bdId" element={<EditBudget />} />
        <Route path="budget-details/:bdId" element={<BudgetDetails />} />
        <Route path="delete-budget/:bdId" element={<DeleteBudget />} />
        <Route path="receipt-books" element={<ReceiptBooks />} />
        <Route path="add-receipt-book" element={<AddReceiptBook />} />
        <Route path="receipt-book-details/:rbId" element={<ReceiptBookDetails />} />
        <Route path="update-receipt-book/:rbId" element={<UpdateReceiptBook />} />
        <Route path="delete-receipt-book/:rbId" element={<DeleteReceiptBook />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <>
      <div className="ui-tabs" aria-label="Expense tabs">
        <Tab to="/users/admin/manageexps" end>
          Expenses Settings
        </Tab>
        <Tab to="/users/admin/manageexps/expensetypes">
          Expenses Types
        </Tab>
        <Tab to="/users/admin/manageexps/budgets">
          Budgets
        </Tab>
        <Tab to="/users/admin/manageexps/receipt-books">
          Receipt Books
        </Tab>
      </div>

      <div className="tab-content font-12 ui-tab-panel">
        <Outlet />
      </div>
    </>
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

export default ManageExpenses;