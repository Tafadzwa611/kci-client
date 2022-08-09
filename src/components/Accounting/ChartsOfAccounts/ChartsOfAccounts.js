import React, {useState, useEffect} from 'react';
import MainAccounts from './MainAccounts/MainAccounts';
import SubAccounts from './SubAccounts/SubAccounts';
import AssetsSubAccounts from './AssetsSubAccounts/AssetsSubAccounts';
import LiabilitiesSubAccounts from './LiabilitiesSubAccounts/LiabilitiesSubAccounts'

const ChartsOfAccounts = () => {
    const [tab, setTab] = useState('mainaccs');
    return (
        <>
            <div className="bloc-tabs">
                    <button className={tab === "mainaccs" ? "tabs-client active-tabs-accs" : "tabs-client"} onClick={e=> setTab("mainaccs")}> Main Accounts </button>
                    <button className={tab === "subaccs" ? "tabs-client active-tabs-accs" : "tabs-client"} onClick={e=> setTab("subaccs")}> Sub Accounts </button>
                    <button className={tab === "assetssubaccs" ? "tabs-client active-tabs-accs" : "tabs-client"} onClick={e=> setTab("assetssubaccs")}> Assets </button>
                    <button className={tab === "liabilitiessubaccs" ? "tabs-client active-tabs-accs" : "tabs-client"} onClick={e=> setTab("liabilitiessubaccs")}> Liabilities </button>
                    <button className={tab === "emp" ? "tabs-client active-tabs-accs" : "tabs-client"} onClick={e=> setTab("emp")}> Equity </button>
                    <button className={tab === "jrnls" ? "tabs-client active-tabs-accs" : "tabs-client"} onClick={e=> setTab("jrnls")}> Income </button>
                    <button className={tab === "chtsoaccs" ? "tabs-client active-tabs-accs" : "tabs-client"} onClick={e=> setTab("chtsoaccs")}> Expenses </button>
            </div>
            <div className='tab-content font-12' style={{marginTop:"3rem"}}>
                {{
                    'mainaccs': <MainAccounts setTab={setTab}/>,
                    'subaccs': <SubAccounts setTab={setTab}/>,
                    'assetssubaccs': <AssetsSubAccounts setTab={setTab}/>,
                    'liabilitiessubaccs': <LiabilitiesSubAccounts setTab={setTab}/>,
                    // 'jrnls': <Journals setTab={setTab}/>,
                    // 'chtsoaccs': <ChartsOfAccounts setTab={setTab}/>
                }[tab]}
            </div>
        </>
    );
}

export default ChartsOfAccounts;