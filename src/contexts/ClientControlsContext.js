import React from 'react';

const ClientControlsContext = React.createContext({});

const ClientControlsProvider = ({children}) => {
  const [clientControls, setClientControls] = React.useState([]);

  return (
    <ClientControlsContext.Provider value={{clientControls, setClientControls}}>
      {children}
    </ClientControlsContext.Provider>
  );
};

function useClientControls() {
  return React.useContext(ClientControlsContext)
}

export {ClientControlsContext, ClientControlsProvider, useClientControls};