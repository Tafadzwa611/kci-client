import React from 'react';

const BranchesContext = React.createContext({});

const BranchesProvider = ({children}) => {
  const [branches, setBranches] = React.useState([]);

  return (
    <BranchesContext.Provider value={{branches, setBranches}}>
      {children}
    </BranchesContext.Provider>
  );
};

function useBranches() {
  return React.useContext(BranchesContext)
}

export {BranchesContext, BranchesProvider, useBranches};