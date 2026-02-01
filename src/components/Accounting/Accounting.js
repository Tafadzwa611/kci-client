import React, {useEffect} from 'react';
import Cashflow from './Cashflow/Cashflow';
import CashReport from './CashReport/CashReport';
import ProfitAndLoss from './ProfitAndLoss/ProfitAndLoss';
import TrialBalance from './TrialBalance/TrialBalance';
import Journals from './Journals/Journals';
import ChartsOfAccounts from './ChartsOfAccounts/ChartsOfAccounts';
import BalanceSheet from './BalanceSheet/BalanceSheet';
import Ledger from './Ledger/Ledger';
import { useLoggedInUser } from '../../contexts/LoggedInUserContext';
import {
  Routes,
  Route,
  Outlet,
  Link,
  useLocation
} from 'react-router-dom';

const ViewAccounting = () => {
  const {loggedInUser} = useLoggedInUser()

  useEffect(() => {
    document.title = 'View Accounting';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Cashflow loggedInUser={loggedInUser} />} />
        <Route path='cashreport' element={<CashReport loggedInUser={loggedInUser} />} />
        <Route path='profitandloss' element={<ProfitAndLoss />} />
        <Route path='trialbalance' element={<TrialBalance />} />
        <Route path='balancesheet' element={<BalanceSheet />} />
        <Route path='journals/*' element={<Journals loggedInUser={loggedInUser} />} />
        <Route path='chartsofaccounts/*' element={<ChartsOfAccounts />} />
        <Route path='ledger' element={<Ledger />} />
      </Route>
    </Routes>
  )
}


function Layout() {
  const location = useLocation();
  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='table-heading' style={{marginBottom:'20px'}}>View Accounting</h5>
        <>
          <div className='bloc-tabs'>
            <Link to='/accounting/viewaccounting' className={location.pathname === '/accounting/viewaccounting' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Cashflow
            </Link>
            <Link to='/accounting/viewaccounting/cashreport' className={location.pathname === '/accounting/viewaccounting/cashreport' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Cash Book
            </Link>
            <Link to='/accounting/viewaccounting/profitandloss' className={location.pathname === '/accounting/viewaccounting/profitandloss' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Comprehensive Income
            </Link>
            <Link to='/accounting/viewaccounting/trialbalance' className={location.pathname === '/accounting/viewaccounting/trialbalance' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Trial Balance
            </Link>
            <Link to='/accounting/viewaccounting/balancesheet' className={location.pathname === '/accounting/viewaccounting/balancesheet' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Balance Sheet
            </Link>
            <Link to='/accounting/viewaccounting/journals' className={location.pathname.includes('/accounting/viewaccounting/journals') ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Journal Entries
            </Link>
            <Link to='/accounting/viewaccounting/chartsofaccounts' className={location.pathname.includes('/accounting/viewaccounting/chartsofaccounts') ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Chart of Accounts
            </Link>
            <Link to='/accounting/viewaccounting/ledger' className={location.pathname === '/accounting/viewaccounting/ledger' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Ledger
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

export default ViewAccounting;
