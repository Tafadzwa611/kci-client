import React from 'react';
import Products from './Products';
import {
  Routes,
  Route,
  Link,
  Outlet,
  useLocation
} from 'react-router-dom';
import Create from './Create';
import Detail from './Detail';
import Update from './Update';

function ManageDeposits() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Products />} />
                <Route path='create' element={<Create />} />
                <Route path=':productId' element={<Detail />} />
                <Route path='update/:productId' element={<Update />} />
            </Route>
        </Routes>
    )
}

function Layout() {
    const location = useLocation();

    return (
        <>
            <div className='bloc-tabs'>
                <Link to='/users/admin/deposits' id='list' className={location.pathname === '/users/admin/deposits' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
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