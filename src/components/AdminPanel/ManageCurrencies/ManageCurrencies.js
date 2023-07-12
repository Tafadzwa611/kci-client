import React from 'react';
import Currencies from './Currencies';
import AddCurrency from './AddCurrency';
import EditCurrency from './EditCurrency';
import {
  Routes,
  Route,
  Link,
  Outlet,
  useLocation
} from 'react-router-dom';

function ManageCurrencies() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Currencies />} />
        <Route path='addcurrency' element={<AddCurrency />} />
        <Route path='editcurrency/:currencyId' element={<EditCurrency />} />
      </Route>
    </Routes>
  )
}

function Layout() {
  const location = useLocation();
  return (
      <>
        <div className='bloc-tabs'>
          <Link to='/users/admin' id='list' className={location.pathname === '/users/admin' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
            Currencies
          </Link>
        </div>
        <div className='tab-content font-12' style={{marginTop:'3rem'}}>
          <Outlet />
        </div>
      </>
  )
}

export default ManageCurrencies;