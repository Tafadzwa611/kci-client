import React from 'react';
import List from './List';
import AddJournal from './AddJournal';
import JournalDetails from './JournalDetails';
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
        <Route index element={<List />} />
        <Route path='addjournal' element={<AddJournal />} />
        <Route path='journal/:journalId' element={<JournalDetails />} />
      </Route>
    </Routes>
  )
}

function Layout() {
  const location = useLocation();
  return (
    <>
      <div className='bloc-tabs'>
        <Link to='/accounting/viewaccounting/journals' className={location.pathname === '/accounting/viewaccounting/journals' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
          Journals
        </Link>
      </div>
      <div className='tab-content font-12' style={{marginTop:'3rem'}}>
        <Outlet />
      </div>
    </>
  )
}

export default ChartsOfAccounts;