import React, {useState} from 'react';
import ClientControls from './ClientControls/ClientControls';

const ManageClients = () => {

    const [tab, setTab] = useState('clientcontrls');
    
    return (
        <>
            <div className="bloc-tabs">
                    <button className={tab === "clientcontrls" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("clientcontrls")}> Client Controls </button>
                    {/* <button className={tab === "fees" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("fees")}> Loan Fees </button> */}
            </div>
            <div className='tab-content font-12' style={{marginTop:"3rem"}}>
                {{
                    'clientcontrls': <ClientControls setMainTab={setTab}/>,
                    // 'rolesndperm': <StaffRolesAndPermissions setMainTab={setTab}/>,
                }[tab]}
            </div>
        </>
    )
}

export default ManageClients;