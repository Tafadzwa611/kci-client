import React, { useEffect } from 'react';
import Staff from './Staff/Staff';
import AddRole from './AddRole';
import ClientRoles from './ClientRoles';
import Role from './Role';
import EditRole from './EditRole';
import {
  Routes,
  Route,
  Outlet,
  NavLink
} from 'react-router-dom';
import AddStaff from './Staff/AddStaff';
import StaffDetails from './Staff/StaffDetails';
import EditStaff from './Staff/EditStaff';
import UpdatePerms from './Staff/UpdatePerms';
import UpdateLimits from './Staff/UpdateLimits';

const ManageStaff = () => {
  useEffect(() => {
    document.title = 'Manage Staff - Admin Panel';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Staff />} />
        <Route path='rolesndperm' element={<ClientRoles />} />
        <Route path='addstaff' element={<AddStaff />} />
        <Route path='editstaff/:staffId' element={<EditStaff />} />
        <Route path='updateperms/:staffId' element={<UpdatePerms />} />
        <Route path='addrole' element={<AddRole />} />
        <Route path='staffdetails/:staffId' element={<StaffDetails />} />
        <Route path='updatelimits/:staffId' element={<UpdateLimits />} />
        <Route path='roledetails/:roleId' element={<Role />} />
        <Route path='editrole/:roleId' element={<EditRole />} />
      </Route>
    </Routes>
  );
};

function Layout() {
  return (
    <>
      <div className='ui-tabs' aria-label='Staff tabs'>
        <Tab to='/users/admin/staff' end>
          Staff
        </Tab>
        <Tab to='/users/admin/staff/rolesndperm'>
          Staff Roles and Permissions
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

export default ManageStaff;