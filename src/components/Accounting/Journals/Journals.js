import React, { useEffect } from 'react';
import { Routes, Route, Outlet, NavLink } from 'react-router-dom';
import List from './List';
import AddJournal from './AddJournal';
import AddJournalBatch from './AddJournalBatch';
import JournalDetails from './JournalDetails';
import BatchResults from './BatchResults';

const ChartsOfAccounts = () => {
  useEffect(() => {
    document.title = 'Journals - Accounting';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<List />} />
        <Route path='addjournal' element={<AddJournal />} />
        <Route path='addjournalbatch' element={<AddJournalBatch />} />
        <Route path='batch-results' element={<BatchResults />} />
        <Route path='journal/:journalId' element={<JournalDetails />} />
      </Route>
    </Routes>
  );
};

function Layout() {
  return (
    <>
      <div className='ui-tabs' aria-label='Journal tabs'>
        <Tab to='/accounting/viewaccounting/journals' end>
          Journals
        </Tab>
      </div>

      <div className='tab-content font-12 ui-tab-panel'>
        <Outlet />
      </div>
    </>
  );
}

function Tab({ to, end, children }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `ui-tab ${isActive ? 'is-active' : ''}`}
    >
      {children}
    </NavLink>
  );
}

export default ChartsOfAccounts;