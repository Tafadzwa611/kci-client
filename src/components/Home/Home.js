import React, { useEffect, useContext } from 'react';
import { LoggedInUserContext } from '../Context';

function Home() {
  const {loggedInUser} = useContext(LoggedInUserContext);

  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
    <div className="card">
      <div className="info-box">
        <h4>{loggedInUser.first_name} {loggedInUser.last_name}, welcome to the Admin area</h4>
        <span>You can use sidebar for navigation.</span>
      </div>
    </div>
  )
}

export default Home;