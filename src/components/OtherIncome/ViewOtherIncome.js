import React, { useEffect } from 'react';
import List from './ViewOtherIncome/List';
import AddOtherIncome from './ViewOtherIncome/AddOtherIncome';
import { Fetcher } from '../../common';
import {
  Routes,
  Route,
  Outlet,
  NavLink
} from 'react-router-dom';

const ViewOtherIncome = () => {
  useEffect(() => {
    document.title = 'View Other Income';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<OtherIncomeListComponent />} />
        <Route path='addotherincome' element={<AddOtherIncomeComponent />} />
      </Route>
    </Routes>
  );
};

const AddOtherIncomeComponent = () => {
  return (
    <Fetcher urls={['/otherincomeapi/otherincometypeslist/', '/acc-api/cash-accounts-list/']}>
      {({ data }) => (
        <AddOtherIncome
          incometypes={data[0]}
          fundaccounts={data[1].accounts}
        />
      )}
    </Fetcher>
  );
};

const OtherIncomeListComponent = () => {
  return <List />;
};

function Layout() {
  return (
    <div className='card ui-card'>
      <div className='card-body ui-card-body'>
        <div className='ui-page-head'>
          <h5 className='table-heading ui-page-title'>View Other Income</h5>
        </div>

        <div className='ui-tabs' aria-label='Other income tabs'>
          <Tab to='/otherincome/viewotherincome' end>
            View OtherIncome
          </Tab>
          <Tab to='/otherincome/viewotherincome/addotherincome'>
            Add Other Income
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

export default ViewOtherIncome;