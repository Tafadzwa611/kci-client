import React, { useEffect } from 'react';
import Currencies from './Currencies';
import AddCurrency from './AddCurrency';
import EditCurrency from './EditCurrency';
import {
  Routes,
  Route,
  Outlet,
  NavLink
} from 'react-router-dom';

function ManageCurrencies() {
  useEffect(() => {
    document.title = 'Manage Currencies - Admin Panel';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Currencies />} />
        <Route path='addcurrency' element={<AddCurrency />} />
        <Route path='editcurrency/:currencyId' element={<EditCurrency />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <>
      <div className='ui-tabs' aria-label='Currency tabs'>
        <Tab to='/users/admin' end>
          Currencies
        </Tab>
      </div>

      <div className='tab-content font-12 ui-tab-panel'>
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
      className={({ isActive }) => `ui-tab ${isActive ? 'is-active' : ''}`}
    >
      {children}
    </NavLink>
  );
}

export default ManageCurrencies;