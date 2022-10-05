import React, {useEffect, useState} from 'react';
import Details from '../Details/Details';
import EmploymentDetails from '../Employment/EmploymentDetails';
import ClientAddresses from '../ClientAddresses/ClientAddresses';
import BankingDetails from '../BankingDetails/BankingDetails';
import NextOfKin from '../nok/NextOfKin';
import Files from '../Files/Files';
import Transactions from '../Transactions/Transactions';

const MoreIndividualClientDetails = (
    {  
        openmore, 
        setOpenMore,
        clientId,
        setClient,
        client,
        branches,
        addresses,
        setAddresses,
        nokList,
        setNokList,
        files,
        setFiles
    }) => {

    const [tab, setTab] = useState('details');

    return (
        <div className={openmore ? 'modal fade show' : 'modal fade'} style={{display: openmore ? 'block' : 'none'}}>
            <div className='modal-dialog modal-xl modal-dialog-scrollable' style={{maxWidth:"calc(100% - 3rem)", height:"calc(100% - 7rem)", top:"4rem"}}>
                <div className='modal-content client-details-bg'>
                    <div className='modal-header activities'>
                        <span style={{fontWeight:"600"}}>Client Details</span>
                        <button type='button' className='close' onClick={e => setOpenMore(false)}><span aria-hidden='true'>&times;</span></button>
                    </div>
                    <div className='modal-body'>
                        <div style={{display:"grid", gridTemplateColumns:"70% auto", columnGap:"1.5rem"}}>
                            <div>
                                <div className="bloc-tabs">
                                    <button className={tab === "details" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("details")}> Personal Info </button>
                                    <button className={tab === "addresses" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("addresses")}> Address List </button>
                                    <button className={tab === "emp" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("emp")}> Employment Details </button>
                                    <button className={tab === "bnk" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("bnk")}> Banking Details </button>
                                    <button className={tab === "nok" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("nok")}> Next Of Kin List </button>
                                    <button className={tab === "files" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("files")}> Files </button>
                                    <button className={tab === "txns" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("txns")}> Transactions </button>
                                </div>
                                <div className='tab-content font-12 text-light' style={{marginTop:"3rem"}}>
                                    {{
                                        'details': <Details clientId={clientId} setClient={setClient} client={client} branches={branches}/>,
                                        'addresses': <ClientAddresses clientId={clientId} addresses={addresses} setAddresses={setAddresses} client={client} />,
                                        'emp': <EmploymentDetails clientId={clientId} setClient={setClient} client={client} />,
                                        'bnk': <BankingDetails clientId={clientId} setClient={setClient} client={client} />,
                                        'nok': <NextOfKin clientId={clientId} nokList={nokList} setNokList={setNokList} client={client}/>,
                                        'files': <Files clientId={clientId} files={files} setFiles={setFiles} client={client}/>,
                                        'txns': <Transactions clientId={clientId} />,
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

export default MoreIndividualClientDetails;