import React, {useEffect, useState, useRef} from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import { useNotifications } from '../../contexts/NotificationsContext';
import { Form, Formik } from 'formik';
import {
  Modal,
  ModalSubmit,
  NonFieldErrors,
  CustomInput,
  CustomPasswordInput,
  CustomSelect
} from '../../common';
import { getParams } from '../../utils/utils';
import Cookies from 'js-cookie';

const MINUTE_MS = 5000;

const MODAL_STATES = {
  search: 'search',
  login: 'login'
};

const Navbar = (props) => {
  const modalRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const {unreadNotifs, setUnreadNotifs} = useNotifications(0);

  const openSearch = (evt) => {
    evt.preventDefault();
    setModal(MODAL_STATES.search);
  }

  const checkNotifs = async () => {
    if (modalRef.current === MODAL_STATES.login){return};
    try {
      const response = await axios.get('/usersapi/check_new_notifications/');
      if (response.request.responseURL.includes('users/login')) {
        modalRef.current = MODAL_STATES.login;
        setModal(MODAL_STATES.login);
      }
      setUnreadNotifs(response.data.count);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
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
      {modal === MODAL_STATES.search ? <Search setOpen={setModal} /> : null}
      {modal === MODAL_STATES.login ? <Login modalRef={modalRef} email={props.loggedInUser.email} setOpen={setModal} /> : null}
      <div className='home-content-header-left' style={{display:'flex', columnGap:'3rem', paddingLeft:'1.5rem'}}>
        <div style={{display:'flex'}}>
          <NavLink to='/' className='btn btn-default dashboard'>
            <span>Home</span>
          </NavLink>
          {props.stafftoplevelperms.can_view_dashboard_module && (
            <NavLink to='/dashboard' className='btn btn-default dashboard'>
              <span>Dashboard</span>
            </NavLink>
          )}
          {props.stafftoplevelperms.can_view_client_module && (
            <NavLink to='/clients/viewclients' className='btn btn-default dashboard'>
              <span>Clients</span>
            </NavLink>
          )}
          {props.stafftoplevelperms.can_view_group_module && (
            <NavLink to='/groups/viewgroups' className='btn btn-default dashboard'>
              <span>Groups</span>
            </NavLink>
          )}
          {props.stafftoplevelperms.can_view_loan_module && (
            <NavLink to='/loans/viewloans' className='btn btn-default dashboard'>
              <span>Loans</span>
            </NavLink>
          )}
          {props.stafftoplevelperms.can_view_payment_module && (
            <NavLink to='/payments/viewpayments' className='btn btn-default dashboard'>
              <span>Payments</span>
            </NavLink>
          )}
          {props.stafftoplevelperms.can_view_otherincome_module && (
            <NavLink to='/otherincome/viewotherincome' className='btn btn-default dashboard'>
              <span>Other Income</span>
            </NavLink>
          )}
          {props.stafftoplevelperms.can_view_expense_module && (
            <NavLink to='/expenses/viewexpenses' className='btn btn-default dashboard'>
              <span>Expenses</span>
            </NavLink>
          )}
          {props.stafftoplevelperms.can_view_reports_module && (
            <NavLink to='/reports/viewreports' className='btn btn-default dashboard'>
              <span>Reports</span>
            </NavLink>
          )}
          {props.stafftoplevelperms.can_view_accounting_module && (
            <NavLink to='/accounting/viewaccounting' className='btn btn-default dashboard'>
              <span>Accounting</span>
            </NavLink>
          )}
          {props.stafftoplevelperms.can_view_dataexport_module && (
            <NavLink to='/data/viewdata' className='btn btn-default dashboard'>
              <span>Data Export</span>
            </NavLink>
          )}
          {props.stafftoplevelperms.can_view_admin_module && (
            <NavLink to='/users/admin' className='btn btn-default dashboard'>
              <span>Admin</span>
            </NavLink>
          )}
          {props.stafftoplevelperms.can_view_search_module && (
            <NavLink to='/search' onClick={openSearch} className='btn btn-default dashboard'>
              <span>Search</span>
            </NavLink>
          )}
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
                <span className='user_name'>{props.loggedInUser.company_name}</span>
              </div>
              <div className='logout_text' style={{marginTop:'0.5rem'}}>
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
    const url = values.entity === 'clients' ? '/clientsapi/search_client/?all_branches=1' : '/clientsapi/search_group/';
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
                <div style={{display:'flex', flexDirection:'column', rowGap:'1.5rem'}}>
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
                              <li className="search__a" key={result.value} style={{marginBottom: '0.25rem'}}>
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

const Login = ({email, setOpen, modalRef}) => {
  const onSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        '/users/login/',
        {username: email, password: values.password},
        {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': 'multipart/form-data'}}
      );
      if (response.data.includes('Please enter a correct email and password. Note that both fields may be case-sensitive.')) {
        actions.setErrors({responseStatus: 400, detail: 'Please enter a correct password. Note that the field may be case-sensitive.'});
        return
      }
      modalRef.current = null;
      setOpen(null);
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

  return (
    <>
    <div className={open ? 'modal fade show' : 'modal fade'} style={{top: '4rem', display: open ? 'block' : 'none'}}>
      <div className='modal-dialog modal-lg modal-dialog-scrollable' style={{height:"calc(100% - 7rem)"}}>
        <div className='modal-content'>
          <div className='modal-body text-light'>
          <Formik initialValues={{password: ''}} onSubmit={onSubmit}>
            {({ errors, isSubmitting }) => (
              <Form>
                <NonFieldErrors errors={errors}>
                  <div></div>
                </NonFieldErrors>
                <div className='create_modal_container'>
                  <div style={{display:'flex', flexDirection:'column', rowGap:'1.5rem', position:'relative', top:'33%', alignItems:'center'}}>
                    <div style={{display:'flex', flexDirection:"column", rowGap:'1rem'}}>
                      <div className='row custom-background'>
                        <CustomPasswordInput label='Password' name='password' type='password' placeholder='Password' required/>
                      </div>
                      <div style={{display:'grid'}}>
                        <button className='btn btn-info' type='submit'>Login</button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Navbar;