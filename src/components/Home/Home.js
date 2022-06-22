import React, { useEffect, useContext } from 'react';
import { LoggedInUserContext } from '../Context';

function Home() {
  const {loggedInUser} = useContext(LoggedInUserContext);

  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
    <div>Home {loggedInUser.first_name}</div>
  )
}

export default Home;