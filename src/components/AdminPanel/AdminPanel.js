import React, {useEffect, useState} from 'react';
import Settings from './Settings/Settings'
import ManageStaff from './ManageStaff/ManageStaff';
import OtherIncomeTypes from '../OtherIncome/OtherIncomeTypes';
import ExpenseTypes from '../Expenses/ExpenseTypes';
import ManageLoans from './ManageLoans/ManageLoans';
import ManageBranches from './ManageBranches/ManageBranches';
import ManageClients from './ManageClients/ManageClients';

const AdminPanel = ({isAccountinOn,propagatePayments,showIsAccountinOn,showPropagatePayments}) => {

    const [tab, setTab] = useState('settings');

    useEffect(() => {
        document.title = 'View Admin';
    }, []);

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="table-heading" style={{marginBottom:"20px"}}>View Admin</h5>
                <>
                    <div className="bloc-tabs">
                            <button className={tab === "settings" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("settings")}> Settings </button>
                            <button className={tab === "managestf" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("managestf")}> Manage Staff </button>
                            <button className={tab === "manageclnts" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("manageclnts")}> Manage Clients </button>
                            <button className={tab === "managelns" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("managelns")}> Manage Loans </button>
                            <button className={tab === "managebrnchs" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("managebrnchs")}> Manage Branches </button>
                            <button className={tab === "manageothin" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("manageothin")}> Manage Other Income </button>
                            <button className={tab === "manageexp" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("manageexp")}> Manage Expenses </button>
                    </div>
                    <div className='tab-content font-12' style={{marginTop:"3rem"}}>
                        {{
                            'settings': <Settings isAccountinOn={isAccountinOn} propagatePayments={propagatePayments} showIsAccountinOn={showIsAccountinOn} showPropagatePayments={showPropagatePayments} setMainTab={setTab}/>,
                            'managestf': <ManageStaff setMainTab={setTab}/>,
                            'manageclnts': <ManageClients setMainTab={setTab}/>,
                            'managelns': <ManageLoans setMainTab={setTab}/>,
                            'managebrnchs': <ManageBranches setMainTab={setTab}/>,
                            'manageothin': <OtherIncomeTypes setMainTab={setTab}/>,
                            'manageexp': <ExpenseTypes setMainTab={setTab}/>,
                        }[tab]}
                    </div>
                </>
            </div>
        </div>
    )
}

export default AdminPanel;
