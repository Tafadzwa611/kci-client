import React, {useEffect, useState} from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import { useNotifications } from '../../contexts/NotificationsContext';
import { Form, Formik } from 'formik';
import {
  Modal,
  ModalSubmit,
  NonFieldErrors,
  CustomInput,
  CustomSelect
} from '../../common';
import { getParams } from '../../utils/utils';

const MINUTE_MS = 15000;
const Navbar = (props) => {
  const {unreadNotifs, setUnreadNotifs} = useNotifications(0);
  const [open, setOpen] = useState(false);

  const openSearch = (evt) => {
    evt.preventDefault();
    setOpen(true);
  }
  const [showLogout, setShowLogout] = useState(false);

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

  const showLogoutDiv= () => {
    setShowLogout(!showLogout)
  }

  return (
    <div className='home-content'>
      {open ? <Search setOpen={setOpen} /> : null}
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
          <NavLink to='/search' onClick={openSearch} className='btn btn-default dashboard'>
            <span>Search</span>
          </NavLink>
        </div>
        <div></div>
      </div>

      <div className='home-content-header-float-right' style={{paddingRight:'1.5rem', display:'flex', alignItems:'center'}}>
        <i className={props.theme === 'light' ? 'uil uil-moon toggle-theme' : 'uil uil-sun toggle-theme'} onClick={props.toggleTheme}></i>
        <NavLink to='/users/notifications' className='first-atag notifications-icon'>
          {unreadNotifs ? <i className='uil uil-bell bell__color'></i> : <i className='uil uil-bell'></i>}
          {unreadNotifs ? unreadNotifs > 9 ? '9+' : unreadNotifs : null}
        </NavLink>
        <div className='nav-logout'>
          <span onClick={showLogoutDiv} style={{cursor:'pointer'}} className='user_name'>{props.loggedInUser.first_name['0']} {props.loggedInUser.last_name['0']}</span>
          {showLogout &&
          <div className='logout__info'>
            <div className='logout__info__sub'>
              <div className='logout_text'>
                <span className='user_name'>{props.loggedInUser.first_name} {props.loggedInUser.last_name}</span>
              </div>
              <div className='logout_text' style={{marginTop:'0.5rem'}}>
                <a style={{fontSize:'0.8125rem'}} href='/users/logout/'>Logout
                </a>
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  )
}


const Search = ({setOpen}) => {
  const [results, setResults] = useState([]);

  const onSubmit = async (values, actions) => {
    const url = values.entity === 'clients' ? '/clientsapi/search_client/' : '/clientsapi/search_group/';
    try {
      const params = getParams(values);
      const response = await axios.get(url, {params: params});
      setResults(response.data);
    } catch (error) {
      console.log(error);
      if (error.message === 'Network Error') {
        actions.setErrors({responseStatus: 'Network Error'});
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({responseStatus: error.response.status, ...error.response.data});
      } else {
        actions.setErrors({responseStatus: error.response.status});
      }
    }
  }

  const handleOnChange = (event) => {
    if (event.target.name==='entity') {
      setResults([]);
    }
  };

  return (
    <Modal open={true} setOpen={setOpen} title={'Search'}>
      <Formik initialValues={{query: '', entity: 'clients'}} onSubmit={onSubmit}>
        {({ errors, values, isSubmitting }) => (
          <Form onChange={handleOnChange}>
            <NonFieldErrors errors={errors}>
              <div className='create_modal_container'>
                <div>
                  <CustomSelect label='Search' name='entity' required>
                    <option value='clients'>Search Clients</option>
                    <option value='groups'>Search Groups</option>
                  </CustomSelect>
                  <CustomInput label='Search text' name='query' type='text' required/>
                </div>
                <div style={{display:'flex', columnGap:'1%'}}>
                  <div style={{width:'100%'}}>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom: '2rem'}}>
                    <div style={{width:'48%'}}>
                      <ul style={{paddingRight:'1rem'}}>
                        {results.map(result => (
                          <li key={result.value} style={{marginBottom: '0.25rem'}}>
                          <Link
                            onClick={() => setOpen(false)}
                            to={values.entity === 'clients' ? `/clients/viewclients/clientdetails/${result.value}` : `/groups/viewgroups?group_id=${result.value}`}
                          >
                            {result.label}
                          </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    </div>
                  </div>
                </div>
                <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default Navbar;