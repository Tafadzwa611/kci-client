import React, { useEffect } from 'react';
import { Fetcher } from '../../common';

function Home() {
  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
    <>
      <div className='card'>
        <div className='info-box'>
          <span>You can use topbar for navigation.</span>
        </div>
      </div>
      <div style={{width:'50%'}}>
        <div style={{width:'100%', marginTop:'1.5rem'}} className='book-value-section card'>
          <p>Activity Log</p>
          <Fetcher urls={["/reportsapi/audit-trail/?page_num=1&page_size=100&latest_only=1"]}>
            {({data}) => ( 
              <div style={{overflowX: 'auto'}}>
                <div style={{maxHeight:'150vh'}}>
                  <div style={{maxHeight:'145vh'}}>
                    <div style={{position:'sticky', top:0}}>
                      {data[0].entries.map(log => (
                        <div className='timeline__section' key={log.id}>
                          <span>
                            <span>Action: {log.action_name || log.action_type} | Entity: {log.entity} | Performed At: {log.event_timestamp} | Performed By: {log.actor_name}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Fetcher>
        </div>
      </div>
    </>
  )
}

export default Home;