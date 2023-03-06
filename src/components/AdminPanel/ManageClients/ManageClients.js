import React, {useState} from 'react';
import ClientControls from './ClientControls/ClientControls';
import IdTemplates from './IdTemplates/IdTemplates';
import ClientTypes from './ClientTypes/ClientTypes';
import GroupTypes from './GroupTypes/GroupTypes';
import GroupRoles from './GroupRoles/GroupRoles';

const ManageClients = () => {
  const [tab, setTab] = useState('clientcontrls');
  return (
    <>
      <div className='bloc-tabs'>
        <button className={tab === 'clientcontrls' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={_ => setTab('clientcontrls')}>Client Controls</button>
        <button className={tab === 'templates' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={_ => setTab('templates')}>Client ID Templates</button>
        <button className={tab === 'types' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={_ => setTab('types')}>Client Types</button>
        <button className={tab === 'gtypes' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={_ => setTab('gtypes')}>Group Types</button>
        <button className={tab === 'groles' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={_ => setTab('groles')}>Group Roles</button>
      </div>
      <div className='tab-content font-12' style={{marginTop:'3rem'}}>
        {{
          'clientcontrls': <ClientControls/>, 
          'templates': <IdTemplates/>, 
          'types': <ClientTypes/>,
          'gtypes': <GroupTypes/>,
          'groles': <GroupRoles/>
        }[tab]}
      </div>
    </>
  )
}

export default ManageClients;