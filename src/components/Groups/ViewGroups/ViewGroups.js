import React, {useEffect} from 'react';
import GroupsList from '../GroupsList/GroupsList';
import AddGroup from '../add_group/AddGroup';
import EditGroup from '../edit_group/EditGroup';
import { Fetcher } from '../../../common';
import { Routes, Route, Outlet, Link, useLocation } from 'react-router-dom';

const ViewGroups = () => {
  useEffect(() => {
    document.title = 'View Groups';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<GroupListComponent />} />
        <Route path='addgroup' element={<AddGroupComponent />} />
        <Route
          path='editgroup/:groupId'
          element={
            <Fetcher urls={['/clientsapi/group_types/', '/usersapi/staff/', '/clientsapi/group_roles/']}>
              {({data}) => <EditGroup groupTypes={data[0]} loanOfficers={data[1]} groupRoles={data[2]} />}
            </Fetcher>
          } 
        />
      </Route>
    </Routes>
  )
}

const AddGroupComponent = () => {
  const urls = ['/clientsapi/group_types/', '/usersapi/staff/?branch_id=33&loan_officers_only=1', '/clientsapi/group_roles/', '/clientsapi/client_controls/'];
  return (
    <Fetcher urls={urls}>
      {({data}) => <AddGroup groupTypes={data[0]} loanOfficers={data[1]} groupRoles={data[2]} clientControls={data[3]}/>}
    </Fetcher>
  )
}

const GroupListComponent = () => {
  return (
    <GroupsList />
  )
}

function Layout() {
  const location = useLocation();

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='table-heading' style={{marginBottom:'20px'}}>View Groups</h5>
        <>
          <div className='bloc-tabs'>
            <Link to='/groups/viewgroups' id='list' className={location.pathname === '/groups/viewgroups' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              View Groups
            </Link>
            <Link to='/groups/viewgroups/addgroup' id='add' className={location.pathname === '/groups/viewgroups/addgroup' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Add Group
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

export default ViewGroups;
