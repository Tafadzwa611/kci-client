import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNotifications } from '../../contexts/NotificationsContext';

const MINUTE_MS = 15000;
const Navbar = (props) => {
  const {unreadNotifs, setUnreadNotifs} = useNotifications(0);

  const checkNotifs = async () => {
    try {
      const response = await axios.get('/usersapi/check_new_notifications/');
      if (response.request.responseURL.includes('users/login')) {
        window.location.reload();
      }
      setUnreadNotifs(response.data.count);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkNotifs();
    const interval = setInterval(() => {
      checkNotifs();
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, []);

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
            <span>Clients</span>
          </NavLink>
          <NavLink to='/groups/viewgroups' className='btn btn-default dashboard'>
            <span>Groups</span>
          </NavLink>
          <NavLink to='/loans/viewloans' className='btn btn-default dashboard'>
            <span>Loans</span>
          </NavLink>
          <NavLink to='/payments/viewpayments' className='btn btn-default dashboard'>
            <span>Payments</span>
          </NavLink>
          <NavLink to='/otherincome/viewotherincome' className='btn btn-default dashboard'>
            <span>Other Income</span>
          </NavLink>
          <NavLink to='/expenses/viewexpenses' className='btn btn-default dashboard'>
            <span>Expenses</span>
          </NavLink>
          <NavLink to='/reports/viewreports' className='btn btn-default dashboard'>
            <span>Reports</span>
          </NavLink>
          <NavLink to='/accounting/viewaccounting' className='btn btn-default dashboard'>
            <span>Accounting</span>
          </NavLink>
          <NavLink to='/data/viewdata' className='btn btn-default dashboard'>
            <span>Data Export</span>
          </NavLink>
          <NavLink to='/users/admin' className='btn btn-default dashboard'>
            <span>Admin</span>
          </NavLink>
        </div>
        <div></div>
      </div>

      <div className='home-content-header-float-right' style={{paddingRight:'1.5rem', display:'flex', alignItems:'center'}}>
        <i className={props.theme === 'light' ? 'uil uil-moon toggle-theme' : 'uil uil-sun toggle-theme'} onClick={props.toggleTheme}></i>
        <NavLink to='/users/notifications' className='first-atag notifications-icon'>
          <i className='uil uil-bell'></i>
          {/* Nested Tenary Operators */}
          {unreadNotifs ?
          unreadNotifs > 9 ? '9+' : unreadNotifs :
          null}
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