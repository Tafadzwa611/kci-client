import React from 'react';


export const LoggedInUserContext = React.createContext();

export const LoggedInUserProvider = (props) => {
  // const [loggedInUser, setLoggedInUser] = React.useState(null);
  
  return (
    <LoggedInUserContext.Provider value={props.value}>
      {props.children}
    </LoggedInUserContext.Provider>
  )
}