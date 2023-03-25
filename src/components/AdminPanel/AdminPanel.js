import React, {useEffect, useState} from 'react';
import Settings from './Settings/Settings'
import ManageStaff from './ManageStaff/ManageStaff';
import OtherIncomeTypes from '../OtherIncome/OtherIncomeTypes';
import ExpenseTypes from '../Expenses/ExpenseTypes';
import ManageLoans from './ManageLoans/ManageLoans';
import ManageBranches from './ManageBranches/ManageBranches';
import ManageClients from './ManageClients/ManageClients';
import ManageFields from './ManageFields/ManageFields';
import { Routes, Route, Outlet, Link } from "react-router-dom";

const AdminPanel = () => {
  useEffect(() => {
    document.title = 'View Admin';
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Settings />} />
        <Route path="staff" element={<ManageStaff />} />
        <Route path="otherincome" element={<OtherIncomeTypes />} />
        <Route path="expensetypes" element={<ExpenseTypes />} />
        <Route path="manageloans" element={<ManageLoans />} />
        <Route path="managebranches" element={<ManageBranches />} />
        <Route path="manageclients" element={<ManageClients />} />
        <Route path="managefields" element={<ManageFields />} />
      </Route>
    </Routes>
  )
}


function Layout() {
  const [activeMenu, setActiveMenu] = useState('admin')
  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='table-heading' style={{marginBottom:'20px'}}>View Admin</h5>
        <>
          <div className='bloc-tabs'>
            <Link 
              to="/users/admin/"
              id="admin" 
              className={activeMenu == 'admin' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}
              onClick={() => { setActiveMenu('admin') }}
            >
              Settings
            </Link>
            <Link 
              to="/users/admin/staff"
              id="staff" 
              className={activeMenu == 'staff' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}
              onClick={() => { setActiveMenu('staff') }}
            >
              Manage Staff
            </Link>
            <Link 
              to="/users/admin/manageclients"
              id="manageclients" 
              className={activeMenu == 'manageclients' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}
              onClick={() => { setActiveMenu('manageclients') }}
            >
              Manage Clients
            </Link>
            <Link 
              to="/users/admin/manageloans"
              id="manageloans" 
              className={activeMenu == 'manageloans' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}
              onClick={() => { setActiveMenu('manageloans') }}
            >
              Manage Loans
            </Link>
            <Link 
              to="/users/admin/managebranches"
              id="managebranches" 
              className={activeMenu == 'managebranches' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}
              onClick={() => { setActiveMenu('managebranches') }}
            >
              Manage Branches
            </Link>
            <Link 
              to="/users/admin/otherincome"
              id="otherincome" 
              className={activeMenu == 'otherincome' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}
              onClick={() => { setActiveMenu('otherincome') }}
            >
              Manage Other Income
            </Link>
            <Link 
              to="/users/admin/expensetypes"
              id="expensetypes" 
              className={activeMenu == 'expensetypes' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}
              onClick={() => { setActiveMenu('expensetypes') }}  
            >
              Manage Expenses
            </Link>
            <Link 
              to="/users/admin/managefields"
              id="managefields" 
              className={activeMenu == 'managefields' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}
              onClick={() => { setActiveMenu('managefields') }}
            >
              Manage Forms
            </Link>
          </div>
          <div className='tab-content font-12' style={{marginTop:'3rem'}}>
            <Outlet />
          </div>
        </>
      </div>
    </div>
  )
}

export default AdminPanel;
// <button className={tab === 'settings' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('settings')}> Settings </button>
