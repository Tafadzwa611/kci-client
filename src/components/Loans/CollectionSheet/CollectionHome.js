import React from 'react';
import {
  Routes,
  Route,
  Outlet,
  Link,
  useLocation
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
              {({data}) => <AddTemplate data={data}/>}
            </Fetcher>
          )}
        />
        <Route
          path='templates'
          element={(
            <Fetcher urls={['/usersapi/list_report_templates/?report_type=COLLECTION_SHEET']}>
              {({data}) => <Templates data={data}/>}
            </Fetcher>
          )}
        />
        <Route
          path='edit_template/:templateId'
          element={(
            <Fetcher urls={['/usersapi/list_template_columns/?report_type=COLLECTION_SHEET']}>
              {({data}) => <EditTemplate data={data}/>}
            </Fetcher>
          )}
        />
        <Route path='delete_template/:templateId' element={<DeleteTemplate />} />
      </Route>
    </Routes>
  )
}

function Layout() {
  const location = useLocation();

  return (
    <>
      <div className='bloc-tabs'>
        <Link
          id='sheet'
          to='/loans/viewloans/collection_sheet'
          className={location.pathname === '/loans/viewloans/collection_sheet' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}
        >
          Collection Sheet
        </Link>
        <Link 
          id='templates'
          to='/loans/viewloans/collection_sheet/templates'
          className={location.pathname === '/loans/viewloans/collection_sheet/templates' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}
        >
          Templates
        </Link>
      </div>
      <div className='tab-content font-12' style={{marginTop:'3rem'}}>
        <Outlet />
      </div>
    </>
  )
}

export default CollectionHome;