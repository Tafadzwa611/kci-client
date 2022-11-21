import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../utils/utils';

export default function ProtectedRoutes() {
  const auth = useAuth();
  // return auth ? <Outlet/> : <Navigate to="/login"/>
  return auth ? <Outlet/> : <Outlet/>
}
