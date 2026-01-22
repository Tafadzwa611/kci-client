import React from 'react';
import {
  Routes,
  Route,
  Link,
  Outlet,
  useLocation
} from 'react-router-dom';
import ExpenseSettings from './ExpensesSettings';
import ExpenseTypes from './ExpenseTypes/ExpenseTypes';
import AddExpenseType from './ExpenseTypes/AddExpenseType';

function ManageExpenses() {
  React.useEffect(() => {
    document.title = 'Manage Expenses - Admin Panel';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<ExpenseSettings />} />
        <Route path='expensetypes' element={<ExpenseTypes />} />
        <Route path='addtype' element={<AddExpenseType />} />
      </Route>
    </Routes>
  )
}

function Layout() {
  const location = useLocation();
  return (
      <>
        <div className='bloc-tabs'>
          <Link to='/users/admin/manageexps' id='list' className={location.pathname === '/users/admin/manageexps' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
            Expenses Settings
          </Link>
          <Link to='/users/admin/manageexps/expensetypes' id='list' className={location.pathname === '/users/admin/manageexps/expensetypes' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
            Expenses Types
          </Link>
        </div>
        <div className='tab-content font-12' style={{marginTop:'3rem'}}>
          <Outlet />
        </div>
      </>
  )
}

export default ManageExpenses