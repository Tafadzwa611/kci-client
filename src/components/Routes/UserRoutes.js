import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const Notifications = lazy(() => import('../Users/Notifications'));
const BankNames = lazy(() => import('../Users/BankNames'));
const Staff = lazy(() => import('../Users/Staff'));
const AddBankName = lazy(() => import('../Users/AddBankName'));
const Branches = lazy(() => import('../Users/Branches'));
const AddStaff = lazy(() => import('../Users/AddStaff'));
const UserProfile = lazy(() => import('../Users/UserProfile'));
const StaffRoles = lazy(() => import('../Users/StaffRoles'));
const AddBranch = lazy(() => import('../Users/AddBranch'));
const AddStaffRole = lazy(() => import('../Users/AddStaffRole'));
const BranchDetails = lazy(() => import('../Users/BranchDetails'));
const AdminPanel = lazy(() => import('../AdminPanel/AdminPanel'));

const UserRoutes = (
  <>
    <Route exact path='/users/addbranch' element={<AddBranch/>}/>
    <Route exact path='/users/banknames' element={<BankNames/>}/>
    <Route exact path='/users/branches' element={<Branches/>}/>
    <Route exact path='/users/staff' element={<Staff/>}/>
    <Route exact path='/users/staffroles' element={<StaffRoles/>}/>
    <Route exact path='/users/addbankname' element={<AddBankName/>}/>
    <Route exact path='/users/addstaffrole' element={<AddStaffRole/>}/>
    <Route exact path='/users/addstaff' element={<AddStaff/>}/>
    <Route exact path='/users/admin' element={<AdminPanel />}/>
    <Route exact path='/users/notifications' element={<Notifications/>}/>
    <Route exact path='/users/userprofile' element={<UserProfile/>}/>
    <Route exact path='/users/branchdetails' element={<BranchDetails/>}/>
  </>
)

export default UserRoutes;