import React, {useEffect, useState} from 'react';
import ClientsList from '../ClientsList/ClientsList';
import AddClient from '../add_client/AddClient';
import SmsList from '../Sms/SmsList';

const ViewClients = () => {
  const [tab, setTab] = useState('clients');

  useEffect(() => {
    document.title = 'View Clients';
  }, []);

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='table-heading' style={{marginBottom:'20px'}}>View Clients</h5>
        <div className='bloc-tabs'>
          <button className={tab === 'clients' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={e=> setTab('clients')}>Clients</button>
          <button className={tab === 'addclient' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={e=> setTab('addclient')}>Add Client</button>
          <button className={tab === 'sms' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={e=> setTab('sms')}>Sms</button>
        </div>
        <div className='tab-content font-12' style={{marginTop:'3rem'}}>
          {{
            'clients': <ClientsList setMainTab={setTab}/>, 
            'addclient': <AddClient setMainTab={setTab}/>,
            'sms': <SmsList setMainTab={setTab}/>
          }[tab]}
        </div>
      </div>
    </div>
  );
}

export default ViewClients;