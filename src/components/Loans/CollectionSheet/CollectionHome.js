import React from 'react';
import {
  Routes,
  Route,
  Outlet,
  NavLink
} from 'react-router-dom';
import CollectionSheet from './CollectionSheet';
import DeleteTemplate from './DeleteTemplate';
import Templates from './Templates';
import EditTemplate from './EditTemplate';
import AddTemplate from './AddTemplate';
import { Fetcher } from '../../../common';

const CollectionHome = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<CollectionSheet />} />
        <Route
          path='add_template'
          element={(
            <Fetcher urls={['/usersapi/list_template_columns/?report_type=COLLECTION_SHEET']}>
              {({ data }) => <AddTemplate data={data} />}
            </Fetcher>
          )}
        />
        <Route
          path='templates'
          element={(
            <Fetcher urls={['/usersapi/list_report_templates/?report_type=COLLECTION_SHEET']}>
              {({ data }) => <Templates data={data} />}
            </Fetcher>
          )}
        />
        <Route
          path='edit_template/:templateId'
          element={(
            <Fetcher urls={['/usersapi/list_template_columns/?report_type=COLLECTION_SHEET']}>
              {({ data }) => <EditTemplate data={data} />}
            </Fetcher>
          )}
        />
        <Route path='delete_template/:templateId' element={<DeleteTemplate />} />
      </Route>
    </Routes>
  );
};

function Layout() {
  return (
    <>
      <div className='ui-tabs' aria-label='Collection sheet tabs'>
        <Tab to='/loans/viewloans/collection_sheet' end>
          Collection Sheet
        </Tab>
        <Tab to='/loans/viewloans/collection_sheet/templates'>
          Templates
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

export default CollectionHome;