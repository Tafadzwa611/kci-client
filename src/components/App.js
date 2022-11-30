import React, { useState, useEffect, createContext } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Fetcher } from '../common';
import Navbar from './NavBar';
import Routes from './Routes';
 
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
              <Router>
                <div id={theme}>
                  <section className='home-section'>
                    <Navbar theme={theme} loggedInUser={data[0]} toggleTheme={toggleTheme} />
                    <div className='app'>
                      <Routes />
                    </div>
                  </section>
                </div>
              </Router>
            </ThemeContext.Provider>
          )
        }}
      </Fetcher>
    </>
  );              
}

export default App;