import React, {useEffect} from 'react';
import {
  Routes,
  Route,
  Outlet
} from 'react-router-dom';
import Notifications from './Notifications';

function Users() {
  useEffect(() => {
    document.title = 'Users';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='notifications' element={<Notifications />} />
      </Route>
    </Routes>
  )
}

function Layout() {
  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='table-heading' style={{marginBottom:'20px'}}>Users</h5>
        <>
          <div className='tab-content font-12' style={{marginTop:'3rem'}}>
            <Outlet />
          </div>
        </>
      </div>
    </div>
  )
}

export default Users;