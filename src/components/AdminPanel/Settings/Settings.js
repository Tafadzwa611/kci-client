import React, {useState} from 'react';
import AccountSettings from './AccountSettings/AccountSettings';
import Currencies from './Currencies/Currencies';

const Settings = ({isAccountinOn,propagatePayments,showIsAccountinOn,showPropagatePayments}) => {

    const [tab, setTab] = useState('accsettings');

    return (
        <>
            <div className="bloc-tabs">
                    <button className={tab === "accsettings" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("accsettings")}> Account Settings </button>
                    <button className={tab === "currenies" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("currenies")}> Currencies </button>
            </div>
            <div className='tab-content font-12' style={{marginTop:"3rem"}}>
                {{
                    'accsettings': <AccountSettings isAccountinOn={isAccountinOn} propagatePayments={propagatePayments} showIsAccountinOn={showIsAccountinOn} showPropagatePayments={showPropagatePayments} setMainTab={setTab}/>,
                    'currenies': <Currencies setMainTab={setTab}/>,
                }[tab]}
            </div>
        </>
    )
}

export default Settings;