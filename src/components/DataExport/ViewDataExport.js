import React, {useEffect} from 'react';
import EntityForm from './CreateDataExport/EntityForm';
import DataExportQueue from './DataExportQueue/DataExportQueue';
import DataExport from './DataExportQueue/DataExport';
import { Fetcher } from '../../common';
import { Routes, Route, Outlet, Link, useLocation, useParams } from 'react-router-dom';

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
          <Fetcher urls={[`/reportsapi/get_user_exports/`]}>
            {({data}) => <DataExportQueue exportsList={data[0]} />}
          </Fetcher>}
        />
        <Route
          path='create_data_export'
          element={
          <Fetcher urls={[`/reportsapi/get_entity_fields/`]}>
            {({data}) => <EntityForm fields={data[0]} />}
          </Fetcher>}
        />
        <Route
          path='dataexport/:dataexportId'
          element={<DataExportElement/>}
        />
      </Route>
    </Routes>
  )
}

function DataExportElement() {
  const params = useParams();
  return (
    <Fetcher urls={[`/reportsapi/get_export/${params.dataexportId}/`]}>
      {({data}) => <DataExport data={data[0]}/>}
    </Fetcher>
  )
}

function Layout() {
  const location = useLocation();

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='table-heading' style={{marginBottom:'20px'}}>View Data Export</h5>
        <div className='bloc-tabs'>
          <Link to='/data/viewdata' className={location.pathname === '/data/viewdata' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
            Data Export List
          </Link>
          <Link to='/data/viewdata/create_data_export' className={location.pathname === '/data/viewdata/create_data_export' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
            Create Data Export
          </Link>
        </div>
        <div className='tab-content font-12' style={{marginTop:'3rem'}}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ViewDataExport;