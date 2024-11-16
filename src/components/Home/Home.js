import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    document.title = 'Home';
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/reportsapi/audit-trail/?page_num=1&page_size=100");
        setLogs(response.data.entries);
      } catch(err) {
        console.log(err);
      }
    }
    fetch();
  }, []);

  return (
    <div style={{width:'50%'}}>
      <div style={{width:'100%'}} className='book-value-section card'>
        <p>Activity Stream</p>
        <div style={{overflowX: 'auto'}}>
          <div style={{maxHeight:'150vh'}}>
            <div style={{maxHeight:'145vh'}}>
              <div style={{position:'sticky', top:0}}>
                {logs.map(log => (
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
      </div>
    </div>
  )
}

export default Home;