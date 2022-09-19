import React, {useState} from 'react';
// import Staff from './Staff/Staff';
// import StaffRolesAndPermissions from './StaffRolesAndPermissions/StaffRolesAndPermissions'

const ManageLoans = () => {

    const [tab, setTab] = useState('products');
    
    return (
        <>
            <div className="bloc-tabs">
                    <button className={tab === "products" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("products")}> Loan Products </button>
                    <button className={tab === "fees" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("fees")}> Loan Fees </button>
            </div>
            <div className='tab-content font-12' style={{marginTop:"3rem"}}>
                {{
                    // 'staff': <Staff setMainTab={setTab}/>,
                    // 'rolesndperm': <StaffRolesAndPermissions setMainTab={setTab}/>,
                }[tab]}
            </div>
        </>
    )
}

export default ManageLoans;