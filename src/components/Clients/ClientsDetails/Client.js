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

function Client({clientData, close}) {
  const [client, setClient] = useState(clientData);
  const [modal, setModal] = useState();

  return (
    <div style={{position:'sticky', top:'0', width:'100%'}}>
      <div className='j-details-container' style={{padding:'1.5rem'}}>
        <ModalSelector modal={modal} setModal={setModal} clientId={client.id} setClient={setClient}/>
        <Actions setModal={setModal} client={client} close={close}/>
      </div>
    </div>
  )
}

const MODAL_STATES = {
  null: null,
  undoBlacklist: 'undoBlacklist',
  undoLeft: 'undoLeft',
  blacklist: 'blacklist',
  undoApprove: 'undoApprove',
  left: 'left',
  approve: 'approve',
  reject: 'reject',
  undoReject: 'undoReject',
};

const Actions = ({setModal, client, close}) => {
  const [tab, setTab] = useState();

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

  return (
    <>
      <div style={{marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', columnGap: '3px'}}>
          {close &&
          <>
            <button className='btn btn-default client__details' onClick={close}>Close</button>
            <button className='btn btn-default client__details'>
              <Link to={`clientdetails/${client.id}`}>Expand</Link>
            </button>
          </>}
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
      <div className='bloc-tabs'>
        <button className={tab === 'details' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('details')}> Personal Info </button>
        <button className={tab === 'addresses' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('addresses')}> Address List </button>
        <button className={tab === 'emp' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('emp')}> Employment Details </button>
        <button className={tab === 'bnk' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('bnk')}> Banking Details </button>
        <button className={tab === 'nok' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('nok')}> Next Of Kin List </button>
        <button className={tab === 'files' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('files')}> Files </button>
        <button className={tab === 'txns' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('txns')}> Transactions </button>
        <button className={tab === 'loans' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('loans')}> Loans </button>
      </div>
      <div className='tab-content font-12' style={{marginTop: '3rem'}}></div>
    </>
  )
}

const ModalSelector = ({modal, clientId, setClient, setModal}) => {
  return {
    null: null,
    undoBlacklist: <UndoClientBlackList clientId={clientId} setClient={setClient} setOpen={setModal}/>,
    undoLeft: <UndoClientLeft clientId={clientId} setClient={setClient} setOpen={setModal}/>,
    blacklist: <BlacklistClient clientId={clientId} setClient={setClient} setOpen={setModal}/>,
    left: <ClientLeft clientId={clientId} setClient={setClient} setOpen={setModal}/>,
    undoApprove: <UndoClientApproval clientId={clientId} setClient={setClient} setOpen={setModal}/>,
    reject: <RejectClient clientId={clientId} setClient={setClient} setOpen={setModal}/>,
    approve: <ApproveClient clientId={clientId} setClient={setClient} setOpen={setModal} />,
    undoReject: <UndoClientRejection clientId={clientId} setClient={setClient} setOpen={setModal} />
  }[modal]
}

export default Client;