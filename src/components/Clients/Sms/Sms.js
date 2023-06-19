import React, { useState } from 'react';
import SmsForm from './SmsForm';
import SmsList from './SmsList';

function Sms() {
  const [tab, setTab] = useState('form')

  return (
    <>
      <div className='bloc-tabs'>
        <button className={tab === 'form' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('form')}>SMS Form</button>
        <button className={tab === 'list' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('list')}>SMS List</button>
      </div>
      <div className='tab-content font-12' style={{marginTop: '3rem'}}>
        {{form: <SmsForm />, list: <SmsList />}[tab]}
      </div>
    </>
  )
}

export default Sms;