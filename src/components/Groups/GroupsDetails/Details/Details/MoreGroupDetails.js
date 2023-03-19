import React, {useEffect, useState} from 'react';
import Details from '../Details/Details';

const MoreGroupDetails = (
    {  
        openmore, 
        setOpenMore,
        groupId,
        setGroup,
        group,
    }) => {

    const [tab, setTab] = useState('gdetails');

    return (
        <div className={openmore ? 'modal fade show' : 'modal fade'} style={{display: openmore ? 'block' : 'none'}}>
            <div className='modal-dialog modal-xl modal-dialog-scrollable' style={{maxWidth:"calc(100% - 3rem)", height:"calc(100% - 7rem)", top:"4rem"}}>
                <div className='modal-content client-details-bg'>
                    <div className='modal-header activities'>
                        <span style={{fontWeight:"600"}}>Group Details</span>
                        <button type='button' className='close' onClick={e => setOpenMore(false)}><span aria-hidden='true'>&times;</span></button>
                    </div>
                    <div className='modal-body'>
                        <div style={{display:"grid", gridTemplateColumns:"70% auto", columnGap:"1.5rem"}}>
                            <div>
                                <div className="bloc-tabs">
                                    <button className={tab === "gdetails" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("gdetails")}> Group Info </button>
                                    <button className={tab === "files" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("files")}> Files </button>
                                    <button className={tab === "txns" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("txns")}> Transactions </button>
                                </div>
                                <div className='tab-content font-12 text-light' style={{marginTop:"3rem"}}>
                                    {{
                                        'gdetails': <Details groupId={groupId} setGroup={setGroup} group={group} />,
                                        // 'files': <Files clientId={clientId} files={files} setFiles={setFiles} client={client}/>,
                                        // 'txns': <Transactions clientId={clientId} />,
                                    }[tab]}
                                </div>
                            </div>
                            <div className="client-activity-container text-light">
                                <div style={{position:"sticky", top:"0"}}>
                                    <div className="lastest-activity-heading">
                                        <span>Latest Activity</span>
                                    </div>
                                </div>
                                <div style={{marginTop:"3rem", display:"flex", flexDirection:"column", rowGap:"1rem", padding:"0 1rem"}}>
                                    <div style={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                                        <span className="activity-title">Created Account</span>
                                        <span className="activity-details">11 mins ago - Tafadzwa Kuno</span>
                                    </div>
                                    <div style={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                                        <span className="activity-title">Created Account</span>
                                        <span className="activity-details">11 mins ago - Tafadzwa Kuno</span>
                                    </div>
                                    <div style={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                                        <span className="activity-title">Created Account</span>
                                        <span className="activity-details">11 mins ago - Tafadzwa Kuno</span>
                                    </div>
                                    <div style={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                                        <span className="activity-title">Created Account</span>
                                        <span className="activity-details">11 mins ago - Tafadzwa Kuno</span>
                                    </div>
                                    <div style={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                                        <span className="activity-title">Created Account</span>
                                        <span className="activity-details">11 mins ago - Tafadzwa Kuno</span>
                                    </div>
                                    <div style={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                                        <span className="activity-title">Created Account</span>
                                        <span className="activity-details">11 mins ago - Tafadzwa Kuno</span>
                                    </div>
                                    <div style={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                                        <span className="activity-title">Created Account</span>
                                        <span className="activity-details">11 mins ago - Tafadzwa Kuno</span>
                                    </div>
                                    <div style={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                                        <span className="activity-title">Created Account</span>
                                        <span className="activity-details">11 mins ago - Tafadzwa Kuno</span>
                                    </div>
                                    <div style={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                                        <span className="activity-title">Created Account</span>
                                        <span className="activity-details">11 mins ago - Tafadzwa Kuno</span>
                                    </div>
                                    <div style={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                                        <span className="activity-title">Created Account</span>
                                        <span className="activity-details">11 mins ago - Tafadzwa Kuno</span>
                                    </div>
                                    <div style={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                                        <span className="activity-title">Created Account</span>
                                        <span className="activity-details">11 mins ago - Tafadzwa Kuno</span>
                                    </div>
                                    <div style={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                                        <span className="activity-title">Created Account</span>
                                        <span className="activity-details">11 mins ago - Tafadzwa Kuno</span>
                                    </div>
                                    <div style={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                                        <span className="activity-title">Created Account</span>
                                        <span className="activity-details">11 mins ago - Tafadzwa Kuno</span>
                                    </div>
                                    <div style={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                                        <span className="activity-title">Created Account</span>
                                        <span className="activity-details">11 mins ago - Tafadzwa Kuno</span>
                                    </div>
                                    <div style={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                                        <span className="activity-title">Created Account</span>
                                        <span className="activity-details">11 mins ago - Tafadzwa Kuno</span>
                                    </div>
                                    <div style={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                                        <span className="activity-title">Created Account</span>
                                        <span className="activity-details">11 mins ago - Tafadzwa Kuno</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='modal-footer justify-content-between activities'>
                        <button type='button' className='btn btn-default' onClick={e => setOpenMore(false)}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoreGroupDetails;