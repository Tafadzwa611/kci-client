/* eslint-disable react/prop-types */
import React, {createContext, useState, useContext} from 'react';

const BranchesContext = createContext({});

const BranchesProvider = ({children}) => {
  const [branches, setBranches] = useState([]);

  return (
    <BranchesContext.Provider value={{branches, setBranches}}>
      {children}
    </BranchesContext.Provider>
  );
};

function useBranches() {
  return useContext(BranchesContext)
}

export {BranchesContext, BranchesProvider, useBranches};