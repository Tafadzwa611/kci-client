import React from 'react';
import List from './Branches/List';
import Holidays from './Holidays/Holidays';
import NonWorkingDays from './NonWorkingDays/NonWorkingDays';
import AddBranch from './Branches/AddBranch';
import BranchDetails from './Branches/BranchDetails';
import EditBranch from './Branches/EditBranch';
import {
  Routes,
  Route,
  Link,
  Outlet,
  useLocation
} from 'react-router-dom';

const ManageBranches = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<List />} />
        <Route path='branch/:branchId' element={<BranchDetails />} />
        <Route path='editbranch/:branchId' element={<EditBranch />} />
        <Route path='addbranch' element={<AddBranch />} />
        <Route path='holidays' element={<Holidays />} />
        <Route path='nonworkingDays' element={<NonWorkingDays />} />
      </Route>
    </Routes>
  )
}

function Layout() {
  const location = useLocation();
  return (
    <>
      <div className='bloc-tabs'>
        <Link to='/users/admin/managebranches' id='list' className={location.pathname === '/users/admin/managebranches' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
          Branches
        </Link>
        <Link to='/users/admin/managebranches/holidays' id='add' className={location.pathname === '/users/admin/managebranches/holidays' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
          Holidays
        </Link>
        <Link to='/users/admin/managebranches/nonworkingDays' id='add' className={location.pathname === '/users/admin/managebranches/nonworkingDays' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
          Non-Working Days
        </Link>
      </div>
      <div className='tab-content font-12' style={{marginTop:'3rem'}}>
        <Outlet />
      </div>
    </>
  )
}

export default ManageBranches;




