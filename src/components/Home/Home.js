import React, { useEffect, useState } from 'react';
import UserStream from './UserStream';

function Home() {
  useEffect(() => {
    document.title = 'Home';
  }, []);

  const [open, setOpen] = useState(false);

  return (
    <div className='card'>
      <div className='info-box'>
        <span>You can use topbar for navigation.</span>
      </div>
      {/* <UserStream open={open} setOpen={setOpen} />
      <div className='card-body'>
        <h5 className='table-heading' style={{marginBottom:'20px'}}>User Activity Stream</h5>
        <div style={{overflowX: 'auto'}}>
          <div style={{height:'100vh'}}>
            <div style={{position:'sticky', top:0}}>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
              <div className='timeline__section'>
                <span>
                  <span className='link' style={{cursor:'pointer'}} onClick={(e) => setOpen(curr => !curr)}>Tafadzwa Kuno</span> logged in at 10:45am.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Home;