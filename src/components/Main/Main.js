import React from 'react';
import {Outlet} from 'react-router-dom';
import {Link} from 'react-router-dom';

export default function Main() {
  return (
    <>
      <div>Main</div>
      <Link to='/main/home'>Home</Link>
      <Link to='/main/dashboard'>Dashboard</Link>
      <Outlet />
    </>
  )
}
