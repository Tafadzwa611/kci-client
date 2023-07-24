import React, {createContext, useState, useContext} from 'react';

const NotificationsContext = createContext({});

function NotificationsProvider({children}) {
  const [unreadNotifs, setUnreadNotifs] = useState(0);

  return (
    <NotificationsContext.Provider value={{unreadNotifs, setUnreadNotifs}}>
      {children}
    </NotificationsContext.Provider>
  );
}

function useNotifications() {
  return useContext(NotificationsContext)
}

export {NotificationsContext, NotificationsProvider, useNotifications};