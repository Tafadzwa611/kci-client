import React from 'react';


export const LoggedInUserContext = React.createContext();

export const LoggedInUserProvider = (props) => {
  return (
    <LoggedInUserContext.Provider value={props.value}>
      {props.children}
    </LoggedInUserContext.Provider>
  )
}