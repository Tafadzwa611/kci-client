import React, { useState, useEffect, createContext } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Fetcher } from '../common';
import Navbar from './NavBar';
import Routes from './Routes';
import {LoggedInUserProvider} from '../contexts/LoggedInUserContext';
import { BranchesProvider } from '../contexts/BranchesContext';
import { CurrenciesProvider } from '../contexts/CurrenciesContext';
import { NotificationsProvider } from '../contexts/NotificationsContext';
import { LoanControlsProvider } from '../contexts/LoanControlsContext';

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((curr) => (curr ==='light' ? 'dark': 'light'));
  }

  useEffect(() => {
    const theme_data = window.localStorage.getItem('THEME');
    if ( theme_data !== null) setTheme(JSON.parse(theme_data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('THEME', JSON.stringify(theme));
  }, [theme]);

  return (
    <>
      <Fetcher urls={['/usersapi/logged_in_user/', '/usersapi/get-branches/', '/usersapi/list_currencies/', '/loansapi/loan_controls/', '/usersapi/staff_toplevel_perms/']}>
        {({data}) => {
          return (
            <ThemeContext.Provider value={{theme, toggleTheme}}>
              <LoggedInUserProvider>
                <CurrenciesProvider>
                  <BranchesProvider>
                    <NotificationsProvider>
                      <LoanControlsProvider>
                        <Router>
                          <div id={theme}>
                            <section className='home-section'>
                              <Navbar theme={theme} loggedInUser={data[0]} toggleTheme={toggleTheme} stafftoplevelperms={data[4]}/>
                              <div className='app'>
                                <Routes loggedInUser={data[0]} branches={data[1]} currencies={data[2]} loanControls={data[3]} stafftoplevelperms={data[4]}/>
                              </div>
                            </section>
                          </div>
                        </Router>
                      </LoanControlsProvider>
                    </NotificationsProvider>
                  </BranchesProvider>
                </CurrenciesProvider>
              </LoggedInUserProvider>
            </ThemeContext.Provider>
          )
        }}
      </Fetcher>
    </>
  );              
}

export default App;