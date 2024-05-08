import React, { useState } from 'react';
import Approve from './Approve';
import Reject from './Reject';
import PersonalInfo from './PersonalInfo';
import Identity from './Identity';
import Addresses from './Addresses';
import Nok from './Nok';
import ClientFiles from './ClientFiles';

const StatusClasses = {
  'Approved': 'badge badge-success',
  'Pending': 'badge badge-info-light',
  'Rejected': 'badge badge-danger',
};

function Application({appData, setAppId}) {
  const [app, setApp] = useState(appData);
  const [modal, setModal] = useState(null);
  const close = () => setAppId(null);

  return (
    <div style={{position:'sticky', top:'0', width:'100%'}}>
      <div className='j-details-container' style={{padding:'1.5rem'}}>
        <ModalSelector modal={modal} app={app} setApp={setApp} setModal={setModal}/>
        <Actions app={app} close={close} setModal={setModal}/>
      </div>
    </div>
  )
}

const Actions = ({app, close, setModal}) => {
  const [tab, setTab] = useState('details');

  const PendingApproval = () => {
    return (
      <>
        <button className='btn btn-olive' onClick={() => setModal('Approve')}>Approve</button>
        <button className='btn btn-olive' onClick={() => setModal('Reject')}>Reject</button>
      </>
    )
  }

  const customViews = {};
  app.custom_data.forEach(fs => {
    customViews[fs.field_set_id] = <CustomData fieldset={fs}/>;
  });

  return (
    <>
      <div>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <button className='btn btn-default client__details' onClick={close}>Close</button>
        </div>
        <div style={{margin:'1rem 0', display:'flex', justifyContent:'space-between'}}>
          <div style={{display:'flex', alignItems:'center'}}>
            <span style={{marginRight:'5px'}}><b>{app.first_name} {app.last_name}</b></span> /
            <span style={{marginLeft:'5px'}} className={StatusClasses[app.status]}>{app.status}</span>
          </div>
          <div className='client-state-btns' style={{display: 'flex', columnGap: '3px'}}>
            {{
              Approved: null,
              Pending: <PendingApproval />,
              Rejected: null,
            }[app.status]}
          </div>
        </div>
      </div>
      <div className='bloc-tabs'>
        <button className={tab === 'details' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('details')}> Personal Info </button>
        <button className={tab === 'id' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('id')}>Identification</button>
        <button className={tab === 'addresses' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('addresses')}> Address List </button>
        <button className={tab === 'nok' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('nok')}> Next Of Kin List </button>
        {app.custom_data.map(fs => (
          <button key={fs.field_set_id} className={tab === fs.field_set_id ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab(fs.field_set_id)}>
            {fs.field_set}
          </button>
        ))}
        <button className={tab === 'files' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('files')}>Files</button>
      </div>
      <div className='tab-content font-12' style={{marginTop: '3rem'}}>
        {{
          details: <PersonalInfo app={app}/>,
          id: <Identity app={app}/>,
          addresses: <Addresses app={app}/>,
          nok: <Nok app={app}/>,
          ...customViews,
          files: <ClientFiles app={app}/>
        }[tab]}
      </div>
    </>
  )
}

function CustomData({fieldset}) {
  return (
    <div>
      <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
        {fieldset.values.map(value => <li key={value.id}>{value.name}: {value.data}</li>)}
      </ul>
    </div>
  )
}

const ModalSelector = ({modal, setModal, app, setApp}) => {
  return {
    null: null,
    Approve: <Approve appId={app.id} setOpen={setModal}/>,
    Reject: <Reject app={app} setApp={setApp} setOpen={setModal}/>
  }[modal]
}

export default Application;