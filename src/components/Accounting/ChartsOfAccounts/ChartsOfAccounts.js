import React from 'react';
import MainAccounts from './MainAccounts/MainAccounts';
import SubAccounts from './SubAccounts/SubAccounts';
import AddHeaderAccount from './MainAccounts/AddHeaderAccount';
import HeaderAccount from './MainAccounts/HeaderAccount';
import EditHeaderAccount from './MainAccounts/EditHeaderAccount';
import AddDetailAccount from './SubAccounts/AddDetailAccount';
import DetailAccount from './SubAccounts/DetailAccount';
import EditDetailAccount from './SubAccounts/EditDetailAccount';
import {
  Routes,
  Route,
  Outlet,
  Link,
  useLocation
} from 'react-router-dom';

const ChartsOfAccounts = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<SubAccounts />} />
        <Route path='headeraccounts' element={<MainAccounts />} />
        <Route path='adddetailaccount' element={<AddDetailAccount />} />
        <Route path='detailaccount/:detailAccountId' element={<DetailAccount />} />
        <Route path='editdetailaccount/:detailAccountId' element={<EditDetailAccount />} />
        <Route path='addheaderaccount' element={<AddHeaderAccount />} />
        <Route path='headeraccount/:headerAccountId' element={<HeaderAccount />} />
        <Route path='editheaderaccount/:headerAccountId' element={<EditHeaderAccount />} />
      </Route>
    </Routes>
  )
}

function Layout() {
  const location = useLocation();
  return (
    <>
      <div className='bloc-tabs'>
        <Link to='/accounting/viewaccounting/chartsofaccounts' className={location.pathname === '/accounting/viewaccounting/chartsofaccounts' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
          Detail Accounts
        </Link>
        <Link to='/accounting/viewaccounting/chartsofaccounts/headeraccounts' className={location.pathname === '/accounting/viewaccounting/chartsofaccounts/headeraccounts' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
          Header Accounts
        </Link>
      </div>
      <div className='tab-content font-12' style={{marginTop:'3rem'}}>
        <Outlet />
      </div>
    </>
  )
}

export default ChartsOfAccounts;