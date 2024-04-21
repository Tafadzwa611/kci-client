/* eslint-disable react/prop-types */
import React, {createContext, useState, useContext} from 'react';

const LoanControlsContext = createContext({});

const LoanControlsProvider = ({children}) => {
  const [loanControls, setLoanControls] = useState({});

  return (
    <LoanControlsContext.Provider value={{loanControls, setLoanControls}}>
      {children}
    </LoanControlsContext.Provider>
  );
};

function useLoanControls() {
  return useContext(LoanControlsContext)
}

export {LoanControlsContext, LoanControlsProvider, useLoanControls};