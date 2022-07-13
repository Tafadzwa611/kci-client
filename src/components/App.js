import React, { useState, useEffect, lazy, Suspense, createContext } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { LoggedInUserProvider } from './Context';
import PublicRoutes from './PublicRoutes';
import Cookies from 'js-cookie';
import AppRoutes from './AppRoutes';

const Login = lazy(() => import('./Login'));
const ForgotPassword = lazy(() => import('./ForgotPassword'));
const ResetPassword = lazy(() => import('./ResetPassword'));

import SubMenu from './Sidebar/SubMenu';
import { SidebarData } from './Sidebar/SidebarData';
import LogoutContainer from '../LogoutContainer';

// for theme 
export const ThemeContext = createContext(null);


function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = Cookies.get('user');
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);


  // for sidebar 
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [logout, setLogout] = useState(false);
  const showLogout = () => setLogout(!logout);
  const [isAccountinOn, setIsAccountinOn] = useState(false)
  const showIsAccountinOn = () => setIsAccountinOn(!isAccountinOn);
  const [propagatePayments, setPropagatePayments] = useState(false)
  const showPropagatePayments = () => setPropagatePayments(!propagatePayments);
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
      setTheme((curr) => (
          curr ==="light" ? "dark": "light"
      ));
  }

  useEffect(() => {
      const sidebar_data = window.localStorage.getItem('SIDEBAR');
      if ( sidebar_data !== null) setSidebar(JSON.parse(sidebar_data))
      const theme_data = window.localStorage.getItem('THEME');
      if ( theme_data !== null) setTheme(JSON.parse(theme_data))
      const accounting_data = window.localStorage.getItem('ACCOUNTING');
      if ( accounting_data !== null) setIsAccountinOn(JSON.parse(accounting_data))
      const payments_data = window.localStorage.getItem('PAYMENTS');
      if ( payments_data !== null) setPropagatePayments(JSON.parse(payments_data))
  }, [])

  useEffect(() => {
      window.localStorage.setItem('SIDEBAR', JSON.stringify(sidebar))
      window.localStorage.setItem('THEME', JSON.stringify(theme))
      window.localStorage.setItem('ACCOUNTING', JSON.stringify(isAccountinOn))
      window.localStorage.setItem('PAYMENTS', JSON.stringify(propagatePayments))
  }, [sidebar, theme, isAccountinOn, propagatePayments])

  if (loggedInUser === null) {

    return (
      <>
        <Router>
          <Suspense fallback='loading'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>
              <Routes>
                {/** Public Routes */}
                {/** Wrap all Route under PublicRoutes element */}
                <Route path='login' element={<PublicRoutes />}>
                  <Route path='/login' element={<Login/>}/>
                  <Route path='forgot-password' element={<ForgotPassword/>}/>
                  <Route path='reset-password' element={<ResetPassword/>}/>
                </Route>
              </Routes>
            </LoggedInUserProvider>
          </Suspense>
        </Router>
      </>
    );

  } 
  else 
  {
    return (
    <>
      <ThemeContext.Provider value={{theme, toggleTheme}}>

        <div id={theme}>

          <Router>

            <div className={sidebar ? 'sidebar close' : 'sidebar'}>

              <NavLink to="/app/home" className="logo">
                <div className="logo-details">
                  <i className="uil uil-10-plus"></i>
                  <span className="logo_name">Lenda</span>
                </div>
              </NavLink>

              <ul className="nav-links">
                <li>
                  <NavLink to="app/dashboard" className="link_name dashboard">
                    <i className="uil uil-estate"></i>
                    <span>Dashboard</span>
                  </NavLink>
                  <ul className="sub-menu blank">
                    <li><NavLink className="link_name" to="/app/dashboard">Dashboard</NavLink></li>
                  </ul>
                </li>

                {SidebarData.map((item, index) => {
                  return <SubMenu item={item} key={index} />;
                })}

              </ul>

            </div>

            <section className="home-section">

              <div className="home-content">

                <div className="home-content-header-left">
                  <i onClick={showSidebar} className="uil uil-bars"></i>
                  <div className="search-button-header">
                    <input type="text" className="search" placeholder="Search By Name or Ec #" />
                    <button type="submit">
                      <i className="uil uil-search btn-search"></i>
                    </button>
                  </div>
                </div>

                <div className="home-content-header-float-right">

                  <i className={theme === "light" ? 'uil uil-moon toggle-theme' : 'uil uil-sun toggle-theme'} onClick={toggleTheme}></i>
                  <NavLink to="/notifications" className="first-atag">
                    <i className="uil uil-bell"></i>
                  </NavLink>

                  <li className="home-content-header-right-list">
                    <a className="home-content-header-right" onClick={showLogout}>
                      <i className="uil uil-user-circle user_image"></i>
                      <div className="home-content-header-right-sub">
                        <span className="user_name">{loggedInUser.first_name} {loggedInUser.last_name}</span>
                        <span className="company_name">Theocash Capital Pvt Ltd</span>
                      </div>
                    </a>
                    { logout && <LogoutContainer showLogout={showLogout} />}
                  </li>

                </div>

              </div>

              <div className="app">

                <AppRoutes 
                  isAccountinOn={isAccountinOn}
                  showIsAccountinOn={showIsAccountinOn}
                  propagatePayments={propagatePayments}
                  showPropagatePayments={showPropagatePayments}
                />

              </div>

            </section>

          </Router>

        </div>

      </ThemeContext.Provider>
    </>
  );
              
  }
}

export default App;