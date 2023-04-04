import React, {useEffect} from 'react';
import Settings from './Settings/Settings'
import ManageStaff from './ManageStaff/ManageStaff';
import OtherIncomeTypes from '../OtherIncome/IncomeTypes/IncomeTypes';
import ExpenseTypes from '../Expenses/ExpenseTypes/ExpenseTypes';
import ManageLoans from './ManageLoans/ManageLoans';
import ManageBranches from './ManageBranches/ManageBranches';
import ManageClients from './ManageClients/ManageClients';
import ManageFields from './ManageFields/ManageFields';
import { Routes, Route, Outlet, Link, useLocation } from 'react-router-dom';

const AdminPanel = () => {
  useEffect(() => {
    document.title = 'View Admin';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Settings />} />
        <Route path='staff' element={<ManageStaff />} />
        <Route path='otherincome' element={<OtherIncomeTypes />} />
        <Route path='expensetypes' element={<ExpenseTypes />} />
        <Route path='manageloans' element={<ManageLoans />} />
        <Route path='managebranches' element={<ManageBranches />} />
        <Route path='manageclients' element={<ManageClients />} />
        <Route path='managefields' element={<ManageFields />} />
      </Route>
    </Routes>
  )
}


function Layout() {
  const location = useLocation();

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='table-heading' style={{marginBottom:'20px'}}>View Admin</h5>
        <>
          <div className='bloc-tabs'>
            <Link 
              to='/users/admin/'
              id='admin' 
              className={location.pathname === '/users/admin/' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}
            >
              Settings
            </Link>
            <Link 
              to='/users/admin/staff'
              id='staff' 
              className={location.pathname === '/users/admin/staff' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}
            >
              Manage Staff
            </Link>
            <Link 
              to='/users/admin/manageclients'
              id='manageclients' 
              className={location.pathname === '/users/admin/manageclients' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}
            >
              Manage Clients
            </Link>
            <Link 
              to='/users/admin/manageloans'
              id='manageloans' 
              className={location.pathname === '/users/admin/manageloans' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}
            >
              Manage Loans
            </Link>
            <Link 
              to='/users/admin/managebranches'
              id='managebranches' 
              className={location.pathname === '/users/admin/managebranches' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}
            >
              Manage Branches
            </Link>
            <Link 
              to='/users/admin/otherincome'
              id='otherincome' 
              className={location.pathname === '/users/admin/otherincome' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}
            >
              Manage Other Income
            </Link>
            <Link 
              to='/users/admin/expensetypes'
              id='expensetypes' 
              className={location.pathname === '/users/admin/expensetypes' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}
            >
              Manage Expenses
            </Link>
            <Link 
              to='/users/admin/managefields'
              id='managefields' 
              className={location.pathname === '/users/admin/managefields' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}
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
