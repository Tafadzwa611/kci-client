import React from 'react';
import {
  Routes,
  Route,
  Outlet,
  NavLink
} from 'react-router-dom';
import List from './List/List';
import Details from './Details/Details';
import Add from './Add';

function Deposits() {
  React.useEffect(() => {
    document.title = 'View Deposits';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<List />} />
        <Route path=':depositId' element={<Details />} />
        <Route path='add' element={<Add />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div className='card ui-card'>
      <div className='card-body ui-card-body'>
        <div className='ui-page-head'>
          <h5 className='table-heading ui-page-title'>Deposits</h5>
        </div>

        <div className='ui-tabs' aria-label='Deposits tabs'>
          <Tab to='/deposits' end>
            View Deposits
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

export default Deposits;