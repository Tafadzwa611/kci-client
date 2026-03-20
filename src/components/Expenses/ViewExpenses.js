import React, { useEffect } from 'react';
import List from './ViewExpenses/List';
import AddExpense from './ViewExpenses/AddExpense';
import { Fetcher } from '../../common';
import {
  Routes,
  Route,
  Outlet,
  NavLink
} from 'react-router-dom';

const ViewExpenses = () => {
  useEffect(() => {
    document.title = 'View Expenses';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route
          index
          element={<ExpenseListComponent />}
        />
        <Route
          path='addexpense'
          element={<AddExpenseComponent />}
        />
      </Route>
    </Routes>
  );
};

const AddExpenseComponent = () => {
  return (
    <Fetcher urls={['/expensesapi/expensetypeslist/?header=0', '/acc-api/cash-accounts-list/']}>
      {({ data }) => (
        <AddExpense
          expensetypes={data[0]}
          fundaccounts={data[1].accounts}
        />
      )}
    </Fetcher>
  );
};

const ExpenseListComponent = () => {
  return (
    <Fetcher urls={['/expensesapi/expensetypeslist/?header=0']}>
      {({ data }) => <List expensetypes={data[0]} />}
    </Fetcher>
  );
};

function Layout() {
  return (
    <div className='card ui-card'>
      <div className='card-body ui-card-body'>
        <div className='ui-page-head'>
          <h5 className='table-heading ui-page-title'>View Expenses</h5>
        </div>

        <div className='ui-tabs' aria-label='Expenses tabs'>
          <Tab to='/expenses/viewexpenses' end>
            View Expenses
          </Tab>
          <Tab to='/expenses/viewexpenses/addexpense'>
            Add Expense
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

export default ViewExpenses;