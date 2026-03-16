import React, { useEffect } from 'react';
import { Routes, Route, Outlet, NavLink } from 'react-router-dom';
import CreateTransferType from './TransferTypes/CreateTransferType';
import TransferTypes from './TransferTypes/TransferTypes';
import UpdateTransferType from './TransferTypes/UpdateTransferType';

function ManageTransfers() {
  useEffect(() => {
    document.title = 'Manage Transfer - Admin Panel';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<TransferTypes />} />
        <Route path='createtransfertype' element={<CreateTransferType />} />
        <Route path='edittransfertype/:transfertype_id' element={<UpdateTransferType />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <>
      <div className='ui-tabs' aria-label='Transfer tabs'>
        <Tab to='/users/admin/managetransfers' end>
          Transfer Types
        </Tab>
        <Tab to='/users/admin/managetransfers/createtransfertype'>
          Add Transfer Type
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

export default ManageTransfers;