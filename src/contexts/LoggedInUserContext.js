import React, {createContext, useState, useContext} from 'react';

const LoggedInUserContext = createContext({});

const LoggedInUserProvider = ({children}) => {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <LoggedInUserContext.Provider value={{loggedInUser, setLoggedInUser}}>
      {children}
    </LoggedInUserContext.Provider>
  );
};

function useLoggedInUser() {
  return useContext(LoggedInUserContext)
}

export {LoggedInUserContext, LoggedInUserProvider, useLoggedInUser};