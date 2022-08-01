import React, {useState, useEffect} from 'react';
import MainAccounts from './MainAccounts/MainAccounts';

const ChartsOfAccounts = () => {
    const [tab, setTab] = useState('mainaccs');
    return (
        <>
            <div className="bloc-tabs">
                    <button className={tab === "mainaccs" ? "tabs-client active-tabs-accs" : "tabs-client"} onClick={e=> setTab("mainaccs")}> Main Accounts </button>
                    <button className={tab === "cshmngmnt" ? "tabs-client active-tabs-accs" : "tabs-client"} onClick={e=> setTab("cshmngmnt")}> Sub Accounts </button>
                    <button className={tab === "prftnls" ? "tabs-client active-tabs-accs" : "tabs-client"} onClick={e=> setTab("prftnls")}> Assets </button>
                    <button className={tab === "trlbnce" ? "tabs-client active-tabs-accs" : "tabs-client"} onClick={e=> setTab("trlbnce")}> Liabilities </button>
                    <button className={tab === "emp" ? "tabs-client active-tabs-accs" : "tabs-client"} onClick={e=> setTab("emp")}> Equity </button>
                    <button className={tab === "jrnls" ? "tabs-client active-tabs-accs" : "tabs-client"} onClick={e=> setTab("jrnls")}> Income </button>
                    <button className={tab === "chtsoaccs" ? "tabs-client active-tabs-accs" : "tabs-client"} onClick={e=> setTab("chtsoaccs")}> Expenses </button>
            </div>
            <div className='tab-content font-12' style={{marginTop:"3rem"}}>
                {{
                    'mainaccs': <MainAccounts setTab={setTab}/>,
                    // 'cshmngmnt': <CashReport setTab={setTab}/>,
                    // 'prftnls': <ProfitAndLoss setTab={setTab}/>,
                    // 'trlbnce': <TrialBalance setTab={setTab}/>,
                    // 'jrnls': <Journals setTab={setTab}/>,
                    // 'chtsoaccs': <ChartsOfAccounts setTab={setTab}/>
                }[tab]}
            </div>
        </>
    );
}

export default ChartsOfAccounts;