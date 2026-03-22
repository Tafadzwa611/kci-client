import React, { useEffect } from 'react';
import EntityForm from './CreateDataExport/EntityForm';
import DataExportQueue from './DataExportQueue/DataExportQueue';
import DataExport from './DataExportQueue/DataExport';
import EditDataExport from './EditDataExport/EditDataExport';
import { Fetcher } from '../../common';
import {
  Routes,
  Route,
  Outlet,
  NavLink,
  useParams
} from 'react-router-dom';

const ViewDataExport = () => {
  useEffect(() => {
    document.title = 'View Data Export';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route
          index
          element={
            <Fetcher key='/' urls={[`/reportsapi/get_user_exports/`]}>
              {({ data }) => <DataExportQueue exportsList={data[0]} />}
            </Fetcher>
          }
        />
        <Route
          path='create_data_export'
          element={
            <Fetcher urls={[`/reportsapi/get_entity_fields/`]}>
              {({ data }) => <EntityForm fields={data[0]} />}
            </Fetcher>
          }
        />
        <Route path='editdataexport/:dataexportId' element={<EditDataExport />} />
        <Route path='dataexport/:dataexportId' element={<DataExportElement />} />
      </Route>
    </Routes>
  );
};

function DataExportElement() {
  const params = useParams();

  return (
    <Fetcher urls={[`/reportsapi/get_export/${params.dataexportId}/`]}>
      {({ data }) => <DataExport data={data[0]} />}
    </Fetcher>
  );
}

function Layout() {
  return (
    <div className='card ui-card'>
      <div className='card-body ui-card-body'>
        <div className='ui-page-head'>
          <h5 className='table-heading ui-page-title'>View Data Export</h5>
        </div>

        <div className='ui-tabs' aria-label='Data export tabs'>
          <Tab to='/data/viewdata' end>
            Data Export List
          </Tab>
          <Tab to='/data/viewdata/create_data_export'>
            Create Data Export
          </Tab>
        </div>

        <div className='tab-content font-12 ui-tab-panel'>
          <Outlet />
        </div>
      </div>
    </div>
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

export default ViewDataExport;