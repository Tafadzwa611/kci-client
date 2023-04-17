import React, {useState} from 'react';
import { Fetcher } from '../../../common';
import List from './List';
import Holidays from './Holidays/Holidays';
import NonWorkingDays from './NonWorkingDays/NonWorkingDays';

function ManageBranches() {
  const [tab, setTab] = useState('branches');

  return (
    <>
      <div className='bloc-tabs'>
        <button className={tab === 'branches' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('branches')}>Branches</button>
        <button className={tab === 'holidays' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('holidays')}>Holidays</button>
        <button className={tab === 'nonWorkingDays' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('nonWorkingDays')}>Non-Working Days</button>
      </div>
      <div className='tab-content font-12' style={{marginTop:'3rem'}}>
        {{
          'branches': <Branches />,
          'holidays': <Holidays />,
          'nonWorkingDays': <NonWorkingDays />,
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




