/* eslint-disable react/prop-types */
import React, {createContext, useState, useContext} from 'react';

const CurrenciesContext = createContext({});

const CurrenciesProvider = ({children}) => {
  const [currencies, setCurrencies] = useState([]);

  return (
    <CurrenciesContext.Provider value={{currencies, setCurrencies}}>
      {children}
    </CurrenciesContext.Provider>
  );
};

function useCurrencies() {
  return useContext(CurrenciesContext)
}

export {CurrenciesContext, CurrenciesProvider, useCurrencies};