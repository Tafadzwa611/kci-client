import React from 'react';

const LoanFormsContext = React.createContext({});

const LoanFormsProvider = ({children}) => {
  const [loanForms, setLoanForms] = React.useState([]);

  return (
    <LoanFormsContext.Provider value={{loanForms, setLoanForms}}>
      {children}
    </LoanFormsContext.Provider>
  );
};

function useLoanForms() {
  return React.useContext(LoanFormsContext)
}

export {LoanFormsContext, LoanFormsProvider, useLoanForms};