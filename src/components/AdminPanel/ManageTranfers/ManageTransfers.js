import React from 'react';
import {
  Routes,
  Route,
  Link,
  Outlet,
  useLocation
} from 'react-router-dom';
import CreateTransferType from './TransferTypes/CreateTransferType';
import TransferTypes from './TransferTypes/TransferTypes';

function ManageTransfers() {
  React.useEffect(() => {
    document.title = 'Manage Transfer - Admin Panel';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<TransferTypes />} />
        <Route path='createtransfertype' element={<CreateTransferType />} />
      </Route>
    </Routes>
  )
}

function Layout() {
  const location = useLocation();
  return (
      <>
        <div className='bloc-tabs'>
          <Link to='/users/admin/managetransfers' id='list' className={location.pathname === '/users/admin/managetransfers' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
            Transfer Types
          </Link>
          <Link to='/users/admin/managetransfers/createtransfertype' id='list' className={location.pathname === '/users/admin/managetransfers/createtransfertype' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
            Add Transfer Type
          </Link>
        </div>
        <div className='tab-content font-12' style={{marginTop:'3rem'}}>
          <Outlet />
        </div>
      </>
  )
}

export default ManageTransfers