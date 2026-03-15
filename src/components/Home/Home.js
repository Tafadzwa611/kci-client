import React from 'react';
import { Fetcher } from '../../common';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  React.useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
    <>
      <div className='card'>
        <div className='info-box'>
          <span>You can use topbar for navigation.</span>
        </div>
      </div>
      <PaymentApprovals/>
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

function PaymentApprovals() {
  const [count, setCount] = React.useState(null);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('/loansapi/payment_requests_count/');
      setCount(response.data);
    }
    fetch();
  }, []);

  if (!count) {
    return (
      <div>
        <div className="mini-spinner"></div>
      </div>
    )
  }

  return (
    <div className='book-value-info-box loan__book'>
      <p>Pending Payment Approvals: {count.count}</p>
      <Link to='/payments/viewpayments/requests'>
        Go to payment requests
      </Link>
    </div>
  )
}

export default Home;