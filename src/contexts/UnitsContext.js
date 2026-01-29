import React from 'react';

const UnitsContext = React.createContext({});

const UnitsProvider = ({children}) => {
  const [units, setUnits] = React.useState([]);

  return (
    <UnitsContext.Provider value={{units, setUnits}}>
      {children}
    </UnitsContext.Provider>
  );
};

function useUnits() {
  return React.useContext(UnitsContext)
}

export {UnitsContext, UnitsProvider, useUnits};