import React, { useState } from 'react';
import GroupFiles from './GroupFiles';
import Details from './Details';
// function BlocTabs({loan, setLoan}) {
function BlocTabs({groupDetails, setGroupDetails}) {
    const [tab, setTab] = useState('details');

    return (
        <>
            <div>
                <div className='bloc-tabs' style={{marginBottom:"2rem"}}>
                    <button className={tab === 'details' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('details')}>Details</button>
                    <button className={tab === 'files' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('files')}>Attachments</button>
                </div>
                {{
                    'details': <Details groupDetails={groupDetails}/>,
                    'files': <GroupFiles groupId={groupDetails.group.id} files={groupDetails.group.files} setGroupDetails={setGroupDetails} />,
                    //   'files': <GroupFiles loanId={loan.id} files={loan.files} setLoan={setLoan} />,
                }[tab]}
            </div>
        </>
    )
}

export default BlocTabs;