import React, {useEffect} from 'react';
import ClientsList from '../ClientsList/ClientsList';
import NewAddClient from '../add_client/NewAddClient';
import Sms from '../Sms/Sms';
import Client from '../ClientsDetails/Client';
import OnlineApps from '../OnlineApps/OnlineApps';
import DiyLink from '../DiyLink/DiyLink';
import {
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
  useLocation
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
        <Route path='clientdetails/:clientId' element={<FullClientDetails/>}/>
      </Route>
    </Routes>
  )
}

function FullClientDetails() {
  const params = useParams();

  const urls = [
    `/clientsapi/get_client/${params.clientId}/`,
    '/clientsapi/client_controls/',
    '/usersapi/staff/?loan_officers_only=1'
  ];

  return (
    <Fetcher urls={urls}>
      {({data}) => <Client clientData={data[0]} clientControls={data[1]} staff={data[2]}/>}
    </Fetcher>
  )
}

function Layout() {
  const location = useLocation();
  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='table-heading' style={{marginBottom:'20px'}}>View Clients</h5>
        <>
          <div className='bloc-tabs'>
            <Link to='/clients/viewclients' id='list' className={location.pathname === '/clients/viewclients' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              View Clients
            </Link>
            <Link to='/clients/viewclients/addclient' id='add' className={location.pathname === '/clients/viewclients/addclient' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Add Client
            </Link>
            <Link to='/clients/viewclients/sms' id='sms' className={location.pathname === '/clients/viewclients/sms' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              SmS
            </Link>
            <Link to='/clients/viewclients/apps' id='apps' className={location.pathname === '/clients/viewclients/apps' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Online Applications
            </Link>
            <Link to='/clients/viewclients/link' id='link' className={location.pathname === '/clients/viewclients/link' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Diy Link
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

export default ViewClients;