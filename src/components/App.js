import React, { useState, useEffect, lazy, Suspense, createContext } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { LoggedInUserProvider } from './Context';
import PublicRoutes from './PublicRoutes';
import Cookies from 'js-cookie';
import AppRoutes from './AppRoutes';

const Login = lazy(() => import('./Login'));
const ForgotPassword = lazy(() => import('./ForgotPassword'));

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
  }, [])

  useEffect(() => {
      window.localStorage.setItem('SIDEBAR', JSON.stringify(sidebar))
      window.localStorage.setItem('THEME', JSON.stringify(theme))
  }, [sidebar, theme])

  if (loggedInUser === null) {

    return (
      <>
        <Router >
          <Suspense fallback='loading'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>
              <Routes>
                {/** Public Routes */}
                {/** Wrap all Route under PublicRoutes element */}
                <Route path='login' element={<PublicRoutes />}>
                  <Route path='/login' element={<Login/>}/>
                  <Route path='forgot-password' element={<ForgotPassword/>}/>
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
                  <a href>
                    <i className="uil uil-estate"></i>
                    <li><NavLink className="link_name" to="/app/dashboard">Dashboard</NavLink></li>
                  </a>
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
                    <i class="uil uil-bell"></i>
                  </NavLink>

                  <li className="home-content-header-right-list">
                    <a className="home-content-header-right" href onClick={showLogout}>
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

                <AppRoutes />

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