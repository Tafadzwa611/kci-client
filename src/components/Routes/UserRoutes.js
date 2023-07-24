import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const Users = lazy(() => import('../Users/Users'));
const AdminPanel = lazy(() => import('../AdminPanel/AdminPanel'));

const UserRoutes = (
  <>
    <Route exact path='/users/admin/*' element={<AdminPanel />}/>
    <Route exact path='/users/*' element={<Users />}/>
  </>
)

export default UserRoutes;