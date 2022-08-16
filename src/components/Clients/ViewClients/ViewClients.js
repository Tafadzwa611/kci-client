import React, {useEffect, useState} from 'react';
import ClientsList from '../ClientsList/ClientsList'
import AddClient from '../add_client/AddClient';


const ViewClients = ({setSidebar}) => {

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
                            <button className={tab === "clients" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("clients")}> Clients </button>
                            <button className={tab === "cshmngmnt" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("cshmngmnt")}> Add Client </button>
                    </div>
                    <div className='tab-content font-12' style={{marginTop:"3rem"}}>
                        {{
                            'clients': <ClientsList setSidebar={setSidebar} setMainTab={setTab}/>,
                            'cshmngmnt': <AddClient setMainTab={setTab}/>,
                        }[tab]}
                    </div>
                </>
            </div>
        </div>
    );
}

export default ViewClients;