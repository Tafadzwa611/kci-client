import React, { useState, useEffect, createContext } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Fetcher } from '../common';
import Navbar from './NavBar';
import Routes from './Routes';
import {LoggedInUserProvider} from '../contexts/LoggedInUserContext';
 
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
      <Fetcher urls={['/usersapi/logged_in_user/']}>
        {({data}) => {
          return (
            <ThemeContext.Provider value={{theme, toggleTheme}}>
              <LoggedInUserProvider>
                <Router>
                  <div id={theme}>
                    <section className='home-section'>
                      <Navbar theme={theme} loggedInUser={data[0]} toggleTheme={toggleTheme} />
                      <div className='app'>
                        <Routes loggedInUser={data[0]}/>
                      </div>
                    </section>
                  </div>
                </Router>
              </LoggedInUserProvider>
            </ThemeContext.Provider>
          )
        }}
      </Fetcher>
    </>
  );              
}

export default App;