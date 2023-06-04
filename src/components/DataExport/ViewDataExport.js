import React, {useEffect} from 'react';
import { Fetcher } from '../../common';
import CreateDataExport from './CreateDataExport/CreateDataExport';
import DataExportQueue from './DataExportQueue/DataExportQueue';
import { Routes, Route, Outlet, Link, useLocation } from 'react-router-dom';

const ViewDataExport = () => {
  useEffect(() => {
    document.title = 'View Data Export';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<CreateDataExport />} />
        <Route path='dataexportqueue' element={<DataExportQueue />} />
      </Route>
    </Routes>
  )
}

function Layout() {
  const location = useLocation();

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='table-heading' style={{marginBottom:'20px'}}>View Data Export</h5>
        <>
          <div className='bloc-tabs'>
            <Link to='/data/viewdata' className={location.pathname === '/data/viewdata' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              View Data Export
            </Link>
            <Link to='/data/viewdata/dataexportqueue' className={location.pathname === '/data/viewdata/dataexportqueue' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Data Export Queue
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

export default ViewDataExport;
