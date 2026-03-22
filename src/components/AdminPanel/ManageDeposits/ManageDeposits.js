import React from 'react';
import Products from './Products';
import {
  Routes,
  Route,
  Outlet,
  NavLink
} from 'react-router-dom';
import Create from './Create';
import Detail from './Detail';
import Update from './Update';

function ManageDeposits() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Products />} />
        <Route path='create' element={<Create />} />
        <Route path=':productId' element={<Detail />} />
        <Route path='update/:productId' element={<Update />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <>
      <div className='ui-tabs' aria-label='Deposit tabs'>
        <Tab to='/users/admin/deposits' end>
          Deposit Products
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

export default ManageDeposits;