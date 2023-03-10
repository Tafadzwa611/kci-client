import React, {useEffect, useState} from 'react';
import GroupsList from '../GroupsList/GroupsList';
import CreateGroup from '../add_group/CreateGroup';
// import SmsList from '../Sms/SmsList';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';

const ViewClients = () => {
  const [tab, setTab] = useState('groups');

  const {loggedInUser} = useLoggedInUser();

  useEffect(() => {
    document.title = 'View Groups';
  }, []);

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='table-heading' style={{marginBottom:'20px'}}>View Groups</h5>
        <div className='bloc-tabs'>
          <button className={tab === 'groups' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={e=> setTab('groups')}>Groups</button>
          <button className={tab === 'addgroup' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={e=> setTab('addgroup')}>Add Group</button>
          <button className={tab === 'sms' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={e=> setTab('sms')}>Sms</button>
        </div>
        <div className='tab-content font-12' style={{marginTop:'3rem'}}>
          {{
            'groups': <GroupsList/>, 
            'addgroup': <CreateGroup/>,
            // 'sms': <SmsList/>
          }[tab]}
        </div>
      </div>
    </div>
  );
}

export default ViewClients;