import React, { useState, useEffect, lazy, Suspense, createContext } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { LoggedInUserProvider } from './Context';
import PublicRoutes from './PublicRoutes';
import Cookies from 'js-cookie';
import AppRoutes from './AppRoutes';

const Login = lazy(() => import('./Login'));
const ForgotPassword = lazy(() => import('./ForgotPassword'));
const ResetPassword = lazy(() => import('./ResetPassword'));

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

            <section className="home-section">

              <div className="home-content">

                <div className="home-content-header-left" style={{display:"flex", columnGap:"3rem"}}>
                  <div>
                    <NavLink to="/app/home" className="logo">
                      <div className="logo-details">
                        <i className="uil uil-10-plus"></i>
                      </div>
                    </NavLink>
                  </div>
                  <div style={{display:"flex"}}>
                    <NavLink to="app/dashboard" className="btn btn-default dashboard">
                      <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/app/clients/viewclients" className="btn btn-default dashboard">
                      <span>View Clients</span>
                    </NavLink>
                    <NavLink to="app/loans/viewloans" className="btn btn-default dashboard">
                      <span>View Loans</span>
                    </NavLink>
                    <NavLink to="app/payments/viewpayments" className="btn btn-default dashboard">
                      <span>View Payments</span>
                    </NavLink>
                    <NavLink to="app/otherincome/otherincmoe" className="btn btn-default dashboard">
                      <span>View Other Income</span>
                    </NavLink>
                    <NavLink to="app/expenses/expenses" className="btn btn-default dashboard">
                      <span>View Expenses</span>
                    </NavLink>
                    <NavLink to="app/reports/viewreports" className="btn btn-default dashboard">
                      <span>View Reports</span>
                    </NavLink>
                    <NavLink to="app/accounting/viewaccounting" className="btn btn-default dashboard">
                      <span>View Accounting</span>
                    </NavLink>
                    <NavLink to="/app/users/admin" className="btn btn-default dashboard">
                      <span>Admin</span>
                    </NavLink>
                  </div>
                  <div>

                  </div>
                </div>

                <div className="home-content-header-float-right" style={{paddingRight:"1.5rem", display:"flex", alignItems:"center"}}>

                  <i className={theme === "light" ? 'uil uil-moon toggle-theme' : 'uil uil-sun toggle-theme'} onClick={toggleTheme}></i>
                  <NavLink to="/notifications" className="first-atag notifications-icon">
                    <i className="uil uil-bell"></i>
                  </NavLink>
                  <div className="nav-logout">
                    <span className="user_name">{loggedInUser.first_name} {loggedInUser.last_name}</span>
                    <i className="uil uil-sign-out-alt nav-right"></i>
                  </div>
                </div>

              </div>

              <div className="app">

                <AppRoutes 
                  isAccountinOn={isAccountinOn}
                  showIsAccountinOn={showIsAccountinOn}
                  propagatePayments={propagatePayments}
                  showPropagatePayments={showPropagatePayments}
                  setSidebar={setSidebar}
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