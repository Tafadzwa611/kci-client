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
import  { ProductsProvider } from '../contexts/ProductsContext';
import { UnitsProvider } from '../contexts/UnitsContext';
import { CashProvider } from '../contexts/CashContext';
import { ClientControlsProvider } from '../contexts/ClientControlsContext';
import { LoanFormsProvider } from '../contexts/LoanFormsContext';
import { ReceiptBooksProvider } from '../contexts/ReceiptBooksContext';
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

  const urls = [
    '/usersapi/logged_in_user/',
    '/usersapi/get-branches/',
    '/usersapi/list_currencies/',
    '/loansapi/loan_controls/',
    '/usersapi/staff_toplevel_perms/',
    '/loansapi/loan_products_list/?allowed_in_user_branch_only=1',
    '/usersapi/list_units/?active_only=1',
    '/acc-api/cash-accounts-list/',
    '/clientsapi/client_controls/',
    '/usersapi/list_field_sets/?entity_type=LOAN&active=1',
    '/loansapi/receipt_books/?is_active=1'
  ];

  return (
    <>
      <Fetcher urls={urls}>
        {({data}) => {
          return (
            <ThemeContext.Provider value={{theme, toggleTheme}}>
              <LoggedInUserProvider>
                <CurrenciesProvider>
                  <BranchesProvider>
                    <NotificationsProvider>
                      <LoanControlsProvider>
                        <ProductsProvider>
                          <UnitsProvider>
                            <CashProvider>
                              <ClientControlsProvider>
                                <LoanFormsProvider>
                                  <ReceiptBooksProvider>
                                    <Router>
                                      <div id={theme}>
                                        <section className='home-section'>
                                          <Navbar theme={theme} loggedInUser={data[0]} toggleTheme={toggleTheme} stafftoplevelperms={data[4]}/>
                                          <div className='app'>
                                            <Routes
                                              loggedInUser={data[0]}
                                              branches={data[1]}
                                              currencies={data[2]}
                                              loanControls={data[3]}
                                              stafftoplevelperms={data[4]}
                                              loanProducts={data[5]}
                                              units={data[6]}
                                              cashAccounts={data[7]}
                                              clientControls={data[8]}
                                              loanForms={data[9]}
                                              receiptBooks={data[10]}
                                            />
                                          </div>
                                        </section>
                                      </div>
                                    </Router>
                                  </ReceiptBooksProvider>
                                </LoanFormsProvider>
                              </ClientControlsProvider>
                            </CashProvider>
                          </UnitsProvider>
                        </ProductsProvider>
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