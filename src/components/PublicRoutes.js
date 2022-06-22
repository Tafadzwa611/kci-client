import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import { useAuth } from '../utils/utils';

export default function PublicRoutes() {
  const auth = useAuth();
  return auth ? <Navigate to='/main'/> : <Outlet/>
}