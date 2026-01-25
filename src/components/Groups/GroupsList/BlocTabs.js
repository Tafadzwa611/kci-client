import React, { useState } from 'react';
import GroupFiles from './GroupFiles';
import Details from './Details';
import Loans from './Loans';

function BlocTabs({groupDetails, setGroupDetails}) {
  const [tab, setTab] = useState('details');

  const customFieldsetNames = Object.keys(groupDetails.custom_field_values);

  const customViews = {};
  customFieldsetNames.forEach(fsName => {
    customViews[`custom.${fsName}`] = <CustomData fieldset={groupDetails.custom_field_values[fsName]} />;
  });

  return (
    <>
      <div>
        <div className='bloc-tabs' style={{marginBottom:"2rem"}}>
          <button className={tab === 'details' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('details')}>Details</button>
          {customFieldsetNames.map(fieldSetName => (
            <button key={fieldSetName} className={tab === `custom.${fieldSetName}` ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab(`custom.${fieldSetName}`)}>
              {fieldSetName}
            </button>
          ))}
          <button className={tab === 'loans' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('loans')}>Loans</button>
          <button className={tab === 'files' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('files')}>Attachments</button>
        </div>
        {{
          'details': <Details groupDetails={groupDetails}/>,
          'loans': <Loans group={groupDetails} />,
          'files': <GroupFiles groupId={groupDetails.id} files={groupDetails.files} setGroupDetails={setGroupDetails} />,
          ...customViews
        }[tab]}
      </div>
    </>
  )
}

function CustomData({fieldset}) {
  return (
    <div>
      <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
        {fieldset.map(value => (
          <li key={value.field_id}>
            {value.field_name}: {value.value}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlocTabs;