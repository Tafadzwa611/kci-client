import React from 'react';
import Products from './Products';
import {
  Routes,
  Route,
  Link,
  Outlet,
  useLocation
} from 'react-router-dom';
import AddDepositProduct from './AddDepositProduct';

function ManageDeposits() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Products />} />
                <Route path='add_deposit_product' element={<AddDepositProduct />} />
            </Route>
        </Routes>
    )
}

function Layout() {
    const location = useLocation();

    return (
        <>
            <div className='bloc-tabs'>
                <Link to='/users/admin/managedeposits' id='list' className={location.pathname === '/users/admin/managedeposits' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
                    Deposit Products
                </Link>
            </div>
            <div className='tab-content font-12' style={{marginTop:'3rem'}}>
                <Outlet />
            </div>
        </>
    )
}

export default ManageDeposits;