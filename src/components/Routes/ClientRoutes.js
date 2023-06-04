import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const ViewClients = lazy(() => import('../Clients/ViewClients/ViewClients'));

const ClientRoutes = (<Route exact path='/clients/viewclients/*' element={<ViewClients/>}/>)

export default ClientRoutes;