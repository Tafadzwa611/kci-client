import React from 'react';
import Staff from './Staff/Staff';
import AddRole from './AddRole';
import ClientRoles from './ClientRoles';
import Role from './Role';
import EditRole from './EditRole';
import {
  Routes,
  Route,
  Link,
  Outlet,
  useLocation
} from 'react-router-dom';
import AddStaff from './Staff/AddStaff';
import StaffDetails from './Staff/StaffDetails';
import EditStaff from './Staff/EditStaff';
import UpdatePerms from './Staff/UpdatePerms';

const ManageStaff = () => {
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
        <Route path='roledetails/:roleId' element={<Role />} />
        <Route path='editrole/:roleId' element={<EditRole />} />
      </Route>
    </Routes>
  )
}

function Layout() {
  const location = useLocation();
  return (
      <>
        <div className='bloc-tabs'>
          <Link to='/users/admin/staff' id='list' className={location.pathname === '/users/admin/staff' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
            Staff
          </Link>
          <Link to='/users/admin/staff/rolesndperm' id='add' className={location.pathname === '/users/admin/staff/rolesndperm' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
            Staff Roles and Permissions
          </Link>
        </div>
        <div className='tab-content font-12' style={{marginTop:'3rem'}}>
          <Outlet />
        </div>
      </>
  )
}

export default ManageStaff;