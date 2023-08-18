import React, { useState } from 'react';
import ApproveClient from './ChangeClientState/ApproveClient';
import BlacklistClient from './ChangeClientState/BlackListClient';
import ClientLeft from './ChangeClientState/ClientLeft';
import RejectClient from './ChangeClientState/RejectClient';
import UndoClientApproval from './ChangeClientState/UndoClientApproval';
import UndoClientBlackList from './ChangeClientState/UndoClientBlackList';
import UndoClientLeft from './ChangeClientState/UndoClientLeft';
import UndoClientRejection from './ChangeClientState/UndoClientRejection';
import { Link } from 'react-router-dom';
import PersonalInfo from './PersonalInfo';
import UpdatePersonalInfo from './UpdatePersonalInfo';
import Addresses from './Addresses';
import Nok from './Nok';
import Identity from './Identity';
import CustomData from './CustomData';
import ChangeClientType from './ChangeClientType';
import { MODAL_STATES } from './data';
import Loans from './Loans';
import ClientFiles from './ClientFiles';
import Groups from './Groups';

function Client({clientData, clientControls, staff, close}) {
  const [client, setClient] = useState(clientData);
  const [modal, setModal] = useState();

  return (
    <div style={{position:'sticky', top:'0', width:'100%'}}>
      <div className='j-details-container' style={{padding:'1.5rem'}}>
        <ModalSelector
          staff={staff}
          clientControls={clientControls}
          modal={modal}
          client={client}
          setModal={setModal}
          setClient={setClient}
        />
        <Actions
          modal={modal}
          setModal={setModal}
          client={client}
          close={close}
          setClient={setClient}
        />
      </div>
    </div>
  )
}

const Actions = ({modal, setModal, client, close, setClient, staff, clientControls}) => {
  const [tab, setTab] = useState('details');

  const customViews = {};
  client.custom_data.forEach(fs => {
    customViews[fs.field_set_id] = <CustomData fieldset={fs} setModal={setModal} modal={modal} setClient={setClient} client={client}/>;
  });


  const Inactive = () => {
    return (
      <>
        <button className='btn btn-olive' onClick={() => setModal(MODAL_STATES.undoApprove)}>Undo Approve</button>
        <button className='btn btn-olive' onClick={() => setModal(MODAL_STATES.blacklist)}>Blacklist</button>
        <button className='btn btn-olive' onClick={() => setModal(MODAL_STATES.left)}>Left</button>
      </>
    )
  }

  const PendingApproval = () => {
    return (
      <>
        <button className='btn btn-olive' onClick={() => setModal(MODAL_STATES.approve)}>Approve</button>
        <button className='btn btn-olive' onClick={() => setModal(MODAL_STATES.reject)}>Reject</button>
        <button className='btn btn-olive' onClick={() => setModal(MODAL_STATES.blacklist)}>Blacklist</button>
      </>
    )
  }

  const statusClasses = {
    'Active': 'badge badge-success',
    'Blacklisted': 'badge badge-dark',
    'Processing': 'badge badge-info-lighter',
    'Pending Approval': 'badge badge-info-light',
    'Inactive': 'badge badge-info',
    'Left': 'badge badge-semi-dark',
    'Rejected': 'badge badge-danger',
  }

  return (
    <>
      <div>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          {close &&
            <>
              <button className='btn btn-default client__details' onClick={close}>Close</button>
              <button className='btn btn-default client__details'>
                <Link to={`clientdetails/${client.id}`}>Expand</Link>
              </button>
            </>
          }
        </div>
        <div style={{margin:'1rem 0', display:'flex', justifyContent:'space-between'}}>
          <div style={{display:'flex', alignItems:'center'}}>
            <span style={{marginRight:'5px'}}><b>{client.first_name} {client.last_name}</b></span> /
            <span style={{marginLeft:'5px'}} className={statusClasses[client.status]}>{client.status}</span>
          </div>
          <div className='client-state-btns' style={{display: 'flex', columnGap: '3px'}}>
            {{
              'Blacklisted': <button className='btn btn-olive' onClick={() => setModal(MODAL_STATES.undoBlacklist)}>Undo Blacklist</button>,
              'Left': <button className='btn btn-olive' onClick={() => setModal(MODAL_STATES.undoLeft)}>Undo Left</button>,
              'Active': <button className='btn btn-olive' onClick={() => setModal(MODAL_STATES.blacklist)}>Blacklist</button>,
              'Inactive': <Inactive />,
              'Pending Approval': <PendingApproval />,
              'Rejected': <button className='btn btn-olive' onClick={() => setModal(MODAL_STATES.undoReject)}>Undo Rejection</button>,
            }[client.status]}
          </div>
        </div>
      </div>
      <div className='bloc-tabs'>
        <button className={tab === 'details' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('details')}> Personal Info </button>
        <button className={tab === 'id' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('id')}>Identification</button>
        <button className={tab === 'addresses' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('addresses')}> Address List </button>
        <button className={tab === 'nok' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('nok')}> Next Of Kin List </button>
        {client.custom_data.map(fs => (
          <button key={fs.field_set_id} className={tab === fs.field_set_id ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab(fs.field_set_id)}>
            {fs.field_set}
          </button>
        ))}
        <button className={tab === 'files' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('files')}>Files</button>
        <button className={tab === 'loans' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('loans')}>Loans</button>
        <button className={tab === 'groups' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('groups')}>Groups</button>
      </div>
      <div className='tab-content font-12' style={{marginTop: '3rem'}}>
        {{
          details: <PersonalInfo client={client} setModal={setModal}/>,
          id: <Identity client={client} setModal={setModal} modal={modal} setClient={setClient}/>,
          addresses: <Addresses client={client} modal={modal} setModal={setModal} setClient={setClient}/>,
          nok: <Nok client={client} modal={modal} setModal={setModal} setClient={setClient}/>,
          files: <ClientFiles client={client}/>,
          loans: <Loans client={client} setClient={setClient}/>,
          groups: <Groups client={client} />,
          ...customViews
        }[tab]}
      </div>
    </>
  )
}

const ModalSelector = ({modal, staff, clientControls, client, setClient, setModal}) => {
  return {
    null: null,
    undoBlacklist: <UndoClientBlackList clientId={client.id} setClient={setClient} setOpen={setModal}/>,
    undoLeft: <UndoClientLeft clientId={client.id} setClient={setClient} setOpen={setModal}/>,
    blacklist: <BlacklistClient clientId={client.id} setClient={setClient} setOpen={setModal}/>,
    left: <ClientLeft clientId={client.id} setClient={setClient} setOpen={setModal}/>,
    undoApprove: <UndoClientApproval clientId={client.id} setClient={setClient} setOpen={setModal}/>,
    reject: <RejectClient clientId={client.id} setClient={setClient} setOpen={setModal}/>,
    approve: <ApproveClient clientId={client.id} setClient={setClient} setOpen={setModal} />,
    undoReject: <UndoClientRejection clientId={client.id} setClient={setClient} setOpen={setModal} />,
    updateInfo: <UpdatePersonalInfo client={client} staff={staff} clientControls={clientControls} setClient={setClient} setOpen={setModal} />,
    changeType: <ChangeClientType client={client} setClient={setClient} setOpen={setModal} />,
  }[modal]
}

export default Client;