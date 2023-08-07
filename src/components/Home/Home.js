import React, { useEffect } from 'react';

function Home() {
  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
    <div className='card'>
      <div className='info-box'>
        <span>You can use topbar for navigation.</span>
      </div>
    </div>
  )
}

export default Home;