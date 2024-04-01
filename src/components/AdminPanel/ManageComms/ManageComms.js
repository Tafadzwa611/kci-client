import React, {useState} from 'react';
import Sms from './Sms';
import Notifications from './Notifications';
import { Fetcher } from '../../../common';

function ManageComms() {
  const [tab, setTab] = useState('sms');

  return (
    <>
      <div className='bloc-tabs'>
        <button className={tab === 'sms' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('sms')}>SMS</button>
        <button className={tab === 'notif' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('notif')}>Notifications</button>
      </div>
      <div className='tab-content font-12' style={{marginTop:'3rem'}}>
        {{'sms': <SmsComponent />, 'notif': <Notifications />}[tab]}
      </div>
    </>
  )
}

function SmsComponent() {
  return (
    <Fetcher urls={['/usersapi/sms_gateway/']}>
      {({data}) => <Sms data={data[0]}/>}
    </Fetcher>
  )
}

export default ManageComms;