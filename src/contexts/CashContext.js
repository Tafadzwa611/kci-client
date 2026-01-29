import React from 'react';

const CashContext = React.createContext({});

const CashProvider = ({children}) => {
  const [cash, setCash] = React.useState([]);

  return (
    <CashContext.Provider value={{cash, setCash}}>
      {children}
    </CashContext.Provider>
  );
};

function useCash() {
  return React.useContext(CashContext)
}

export {CashContext, CashProvider, useCash};