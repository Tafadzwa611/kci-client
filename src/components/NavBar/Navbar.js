import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <div className='home-content'>
      <div className='home-content-header-left' style={{display:'flex', columnGap:'3rem'}}>
        <div>
          <NavLink to='/home' className='logo'>
            <div className='logo-details'>
              <i className='uil uil-10-plus'></i>
            </div>
          </NavLink>
        </div>

        <div style={{display:'flex'}}>
          <NavLink to='/dashboard' className='btn btn-default dashboard'>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to='/clients/viewclients' className='btn btn-default dashboard'>
            <span>View Clients</span>
          </NavLink>
          <NavLink to='/loans/viewloans' className='btn btn-default dashboard'>
            <span>View Loans</span>
          </NavLink>
          <NavLink to='/payments/viewpayments' className='btn btn-default dashboard'>
            <span>View Payments</span>
          </NavLink>
          <NavLink to='/otherincome/otherincmoe' className='btn btn-default dashboard'>
            <span>View Other Income</span>
          </NavLink>
          <NavLink to='/expenses/expenses' className='btn btn-default dashboard'>
            <span>View Expenses</span>
          </NavLink>
          <NavLink to='/reports/viewreports' className='btn btn-default dashboard'>
            <span>View Reports</span>
          </NavLink>
          <NavLink to='/accounting/viewaccounting' className='btn btn-default dashboard'>
            <span>View Accounting</span>
          </NavLink>
          <NavLink to='/users/admin' className='btn btn-default dashboard'>
            <span>Admin</span>
          </NavLink>
        </div>
        <div></div>
      </div>

      <div className='home-content-header-float-right' style={{paddingRight:'1.5rem', display:'flex', alignItems:'center'}}>
        <i className={props.theme === 'light' ? 'uil uil-moon toggle-theme' : 'uil uil-sun toggle-theme'} onClick={props.toggleTheme}></i>
        <NavLink to='/notifications' className='first-atag notifications-icon'>
          <i className='uil uil-bell'></i>
        </NavLink>
        <div className='nav-logout'>
          <span className='user_name'>{props.loggedInUser.first_name} {props.loggedInUser.last_name}</span>
          <a href='/users/logout/'>
            <i className='uil uil-sign-out-alt nav-right'></i>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Navbar;