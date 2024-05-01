import React, { useState } from 'react';
import Approve from './Approve';
import Reject from './Reject';

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
  const PendingApproval = () => {
    return (
      <>
        <button className='btn btn-olive' onClick={() => setModal('Approve')}>Approve</button>
        <button className='btn btn-olive' onClick={() => setModal('Reject')}>Reject</button>
      </>
    )
  }

  return (
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