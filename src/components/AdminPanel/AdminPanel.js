import React, {useEffect} from 'react';
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
  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='table-heading' style={{marginBottom:'20px'}}>View Admin</h5>
        <>
          <div className='bloc-tabs'>
            <button className='tabs-client'>
              <Link to="/users/admin/">Settings</Link>
            </button>
            <button className='tabs-client'>
              <Link to="/users/admin/staff">Manage Staff</Link>
            </button>
            <button className='tabs-client'>
              <Link to="/users/admin/manageclients">Manage Clients</Link>
            </button>
            <button className='tabs-client'>
              <Link to="/users/admin/manageloans">Manage Loans</Link>
            </button>
            <button className='tabs-client'>
              <Link to="/users/admin/managebranches">Manage Branches</Link>
            </button>
            <button className='tabs-client'>
              <Link to="/users/admin/otherincome">Manage Other Income</Link>
            </button>
            <button className='tabs-client'>
              <Link to="/users/admin/expensetypes">Manage Expenses</Link>
            </button>
            <button className='tabs-client'>
              <Link to="/users/admin/managefields">Manage Forms</Link>
            </button>
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
