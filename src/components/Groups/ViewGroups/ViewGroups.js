import React, { useEffect } from 'react';
import GroupsList from '../GroupsList/GroupsList';
import AddGroup from '../add_group/AddGroup';
import EditGroup from '../edit_group/EditGroup';
import { Fetcher } from '../../../common';
import {
  Routes,
  Route,
  Outlet,
  NavLink
} from 'react-router-dom';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';

const ViewGroups = () => {
  useEffect(() => {
    document.title = 'View Groups';
  }, []);

  const { loggedInUser } = useLoggedInUser();
  const urls = [
    '/clientsapi/group_types/',
    `/usersapi/staff/?branch_id=${loggedInUser.branch_id}&loan_officers_only=1`,
    '/clientsapi/group_roles/',
    '/clientsapi/client_controls/',
    '/usersapi/list_units/?active_only=1'
  ];

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<GroupListComponent />} />
        <Route path='addgroup' element={<AddGroupComponent urls={urls} />} />
        <Route
          path='editgroup/:groupId'
          element={
            <Fetcher urls={urls}>
              {({ data }) => (
                <EditGroup
                  groupTypes={data[0]}
                  loanOfficers={data[1]}
                  groupRoles={data[2]}
                  clientControls={data[3]}
                />
              )}
            </Fetcher>
          }
        />
      </Route>
    </Routes>
  );
};

const AddGroupComponent = ({ urls }) => {
  return (
    <Fetcher urls={urls}>
      {({ data }) => (
        <AddGroup
          groupTypes={data[0]}
          loanOfficers={data[1]}
          groupRoles={data[2]}
          clientControls={data[3]}
          units={data[4]}
        />
      )}
    </Fetcher>
  );
};

const GroupListComponent = () => {
  return (
    <Fetcher urls={['/usersapi/list_units']}>
      {({ data }) => <GroupsList units={data[0]} />}
    </Fetcher>
  );
};

function Layout() {
  return (
    <div className='card ui-card'>
      <div className='card-body ui-card-body'>
        <div className='ui-page-head'>
          <h5 className='table-heading ui-page-title'>View Groups</h5>
        </div>

        <div className='ui-tabs' aria-label='Groups tabs'>
          <Tab to='/groups/viewgroups' end>
            View Groups
          </Tab>
          <Tab to='/groups/viewgroups/addgroup'>
            Add Group
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

export default ViewGroups;