import React, { useEffect } from 'react';
import List from './Branches/List';
import Holidays from './Holidays/Holidays';
import NonWorkingDays from './NonWorkingDays/NonWorkingDays';
import AddBranch from './Branches/AddBranch';
import BranchDetails from './Branches/BranchDetails';
import EditBranch from './Branches/EditBranch';
import Units from './Units/Units';
import {
  Routes,
  Route,
  Outlet,
  NavLink
} from 'react-router-dom';

const ManageBranches = () => {
  useEffect(() => {
    document.title = 'Manage Branches - Admin Panel';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<List />} />
        <Route path='branch/:branchId' element={<BranchDetails />} />
        <Route path='editbranch/:branchId' element={<EditBranch />} />
        <Route path='addbranch' element={<AddBranch />} />
        <Route path='holidays' element={<Holidays />} />
        <Route path='nonworkingDays' element={<NonWorkingDays />} />
        <Route path='units' element={<Units />} />
      </Route>
    </Routes>
  );
};

function Layout() {
  return (
    <>
      <div className='ui-tabs' aria-label='Branch tabs'>
        <Tab to='/users/admin/managebranches' end>
          Branches
        </Tab>
        <Tab to='/users/admin/managebranches/holidays'>
          Holidays
        </Tab>
        <Tab to='/users/admin/managebranches/nonworkingDays'>
          Non-Working Days
        </Tab>
        <Tab to='/users/admin/managebranches/units'>
          Units
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

export default ManageBranches;