import React, {useState} from 'react';
import { Fetcher } from '../../../common';
import List from './List';
import Holidays from './Holidays/Holidays';

function ManageBranches() {
  const [tab, setTab] = useState('branches');

  return (
    <>
      <div className='bloc-tabs'>
        <button className={tab === 'branches' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('branches')}>Branches</button>
        <button className={tab === 'holidays' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('holidays')}>Holidays</button>
      </div>
      <div className='tab-content font-12' style={{marginTop:'3rem'}}>
        {{
          'branches': <Branches />,
          'holidays': <Holidays />,
        }[tab]}
      </div>
    </>
  )
}

const Branches = () => {
  return (
    <Fetcher urls={['/usersapi/branch-list/']}>
      {({data}) => <List data={data[0]} />}
    </Fetcher>
  )
}

export default ManageBranches;




