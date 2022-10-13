import React, {useState, useEffect} from 'react';
import Staff from './Staff/Staff';
import StaffRolesAndPermissions from './StaffRolesAndPermissions/StaffRolesAndPermissions'

const ManageStaff = () => {

    const [tab, setTab] = useState('staff');

    useEffect(() => {
        document.title = 'Manage Staff';
    }, [])
    
    return (
        <>
            <div className="bloc-tabs">
                    <button className={tab === "staff" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("staff")}> Staff </button>
                    <button className={tab === "rolesndperm" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("rolesndperm")}> Staff Roles and Permissions </button>
            </div>
            <div className='tab-content font-12' style={{marginTop:"3rem"}}>
                {{
                    'staff': <Staff setMainTab={setTab}/>,
                    'rolesndperm': <StaffRolesAndPermissions setMainTab={setTab}/>,
                }[tab]}
            </div>
        </>
    )
}

export default ManageStaff;