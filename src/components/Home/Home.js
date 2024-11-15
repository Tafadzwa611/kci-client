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
        const response = await axios.get("/reportsapi/audit-trail/?page_num=1&page_size=25");
        setLogs(response.data.entries);
      } catch(err) {
        console.log(err);
      }
    }
    fetch();
  }, []);

  return (
    <div className='card'>
      <div className='info-box'>
        <span>You can use topbar for navigation.</span>
      </div>
      <div className='card-body'>
        <h5 className='table-heading' style={{marginBottom:'20px'}}>User Activity Stream</h5>
        <div style={{display:"block"}}>
          <div style={{padding:"0", border:"none"}}>
            <div style={{width:"100%", overflowX:"auto"}}>
              <div className="table__height">
                <table className='table' id='clients-report' style={{width:'100%'}}>
                  <thead>
                    <tr className='journal-details header' style={{position:'sticky', top:'0'}}> 
                      <th>Action</th>
                      <th>Entity</th>
                      <th>Performed At</th>
                      <th>Performed By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map(log => (
                      <tr key={log.id}>
                        <td>{log.action_name || log.action_type}</td>
                        <td>{log.entity}</td>
                        <td>{log.event_timestamp}</td>
                        <td>{log.actor_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;