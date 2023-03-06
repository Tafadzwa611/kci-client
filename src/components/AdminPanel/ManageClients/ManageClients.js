import React, {useState} from 'react';
import ClientControls from './ClientControls/ClientControls';
import IdTemplates from './IdTemplates/IdTemplates';
import ClientTypes from './ClientTypes/ClientTypes';
import GroupTypes from './GroupTypes/GroupTypes';

const ManageClients = () => {
  const [tab, setTab] = useState('clientcontrls');
  return (
    <>
      <div className='bloc-tabs'>
        <button className={tab === 'clientcontrls' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={_ => setTab('clientcontrls')}>Client Controls</button>
        <button className={tab === 'templates' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={_ => setTab('templates')}>Client ID Templates</button>
        <button className={tab === 'types' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={_ => setTab('types')}>Client Types</button>
        <button className={tab === 'gtypes' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={_ => setTab('gtypes')}>Group Types</button>
      </div>
      <div className='tab-content font-12' style={{marginTop:'3rem'}}>
        {{
          'clientcontrls': <ClientControls/>, 
          'templates': <IdTemplates/>, 
          'types': <ClientTypes/>,
          'gtypes': <GroupTypes/>
        }[tab]}
      </div>
    </>
  )
}

export default ManageClients;