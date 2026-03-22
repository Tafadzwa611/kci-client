import React, { useEffect } from 'react';
import ClientsList from '../ClientsList/ClientsList';
import NewAddClient from '../add_client/NewAddClient';
import Sms from '../Sms/Sms';
import Client from '../ClientsDetails/Client';
import OnlineApps from '../OnlineApps/OnlineApps';
import DiyLink from '../DiyLink/DiyLink';
import {
  Routes,
  Route,
  Outlet,
  NavLink,
  useParams
} from 'react-router-dom';
import { Fetcher } from '../../../common';

const ViewClients = () => {
  useEffect(() => {
    document.title = 'View Clients';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<ClientsList />} />
        <Route path='addclient' element={<NewAddClient />} />
        <Route path='sms' element={<Sms />} />
        <Route path='apps' element={<OnlineApps />} />
        <Route path='link' element={<DiyLink />} />
        <Route path='clientdetails/:clientId' element={<FullClientDetails />} />
      </Route>
    </Routes>
  );
};

function FullClientDetails() {
  const params = useParams();

  const urls = [
    `/clientsapi/get_client/${params.clientId}/`,
    '/clientsapi/client_controls/',
    '/usersapi/staff/?loan_officers_only=1&status=all',
    '/usersapi/staff_toplevel_perms/',
    '/usersapi/list_units/?active_only=1'
  ];

  return (
    <Fetcher urls={urls}>
      {({ data }) => (
        <Client
          clientData={data[0]}
          clientControls={data[1]}
          staff={data[2]}
          staffTopLevelPerm={data[3]}
          units={data[4]}
        />
      )}
    </Fetcher>
  );
}

function Layout() {
  return (
    <div className='card ui-card'>
      <div className='card-body ui-card-body'>
        <div className='ui-page-head'>
          <h5 className='table-heading ui-page-title'>View Clients</h5>
        </div>

        <div className='ui-tabs' aria-label='Clients tabs'>
          <Tab to='/clients/viewclients' end>
            View Clients
          </Tab>
          <Tab to='/clients/viewclients/addclient'>
            Add Client
          </Tab>
          <Tab to='/clients/viewclients/sms'>
            SmS
          </Tab>
          <Tab to='/clients/viewclients/apps'>
            Online Applications
          </Tab>
          <Tab to='/clients/viewclients/link'>
            Diy Link
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

export default ViewClients;