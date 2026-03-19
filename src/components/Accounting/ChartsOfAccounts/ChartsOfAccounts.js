import React, { useEffect } from 'react';
import { Routes, Route, Outlet, NavLink } from 'react-router-dom';
import MainAccounts from './MainAccounts/MainAccounts';
import SubAccounts from './SubAccounts/SubAccounts';
import AddHeaderAccount from './MainAccounts/AddHeaderAccount';
import HeaderAccount from './MainAccounts/HeaderAccount';
import EditHeaderAccount from './MainAccounts/EditHeaderAccount';
import AddDetailAccount from './SubAccounts/AddDetailAccount';
import DetailAccount from './SubAccounts/DetailAccount';
import EditDetailAccount from './SubAccounts/EditDetailAccount';

const ChartsOfAccounts = () => {
  useEffect(() => {
    document.title = 'Charts of Accounts - Accounting';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<SubAccounts />} />
        <Route path='headeraccounts' element={<MainAccounts />} />
        <Route path='adddetailaccount' element={<AddDetailAccount />} />
        <Route path='detailaccount/:detailAccountId' element={<DetailAccount />} />
        <Route path='editdetailaccount/:detailAccountId' element={<EditDetailAccount />} />
        <Route path='addheaderaccount' element={<AddHeaderAccount />} />
        <Route path='headeraccount/:headerAccountId' element={<HeaderAccount />} />
        <Route path='editheaderaccount/:headerAccountId' element={<EditHeaderAccount />} />
      </Route>
    </Routes>
  );
};

function Layout() {
  return (
    <>
      <div className='ui-tabs' aria-label='Charts of accounts tabs'>
        <Tab to='/accounting/viewaccounting/chartsofaccounts' end>
          Detail Accounts
        </Tab>
        <Tab to='/accounting/viewaccounting/chartsofaccounts/headeraccounts'>
          Header Accounts
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

export default ChartsOfAccounts;