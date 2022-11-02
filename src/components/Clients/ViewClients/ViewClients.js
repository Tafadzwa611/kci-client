import React, {useEffect, useState} from 'react';
import ClientsList from '../ClientsList/ClientsList'
import AddClient from '../add_client/AddClient';
import PendingApprovalList from '../PendingApprovalList/PendingApprovalList';


const ViewClients = () => {

    const [tab, setTab] = useState('clients');

    useEffect(() => {
        document.title = 'View Clients';
    }, []);
    
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="table-heading" style={{marginBottom:"20px"}}>View Clients</h5>
                <>
                    <div className="bloc-tabs">
                            <button className={tab === "clients" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("clients")}> All Clients </button>
                            <button className={tab === "addclient" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("addclient")}> Add Client </button>
                            <button className={tab === "pendingapproval" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("pendingapproval")}> Pending Approval </button>
                            <button className={tab === "inactive" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("inactive")}> Inactive </button>
                            <button className={tab === "active" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("active")}> Active </button>
                            <button className={tab === "rejected" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("rejected")}> Rejected </button>
                            <button className={tab === "left" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("left")}> Left </button>
                            <button className={tab === "blacklisted" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("blacklisted")}> Blacklisted </button>
                    </div>
                    <div className='tab-content font-12' style={{marginTop:"3rem"}}>
                        {{
                            'clients': <ClientsList setMainTab={setTab}/>,
                            'addclient': <AddClient setMainTab={setTab}/>,
                            'pendingapproval': <PendingApprovalList setMainTab={setTab}/>,
                        }[tab]}
                    </div>
                </>
            </div>
        </div>
    );
}

export default ViewClients;