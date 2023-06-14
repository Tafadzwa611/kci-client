import React, {useState, useEffect} from 'react';
import MainAccounts from './MainAccounts/MainAccounts';
import SubAccounts from './SubAccounts/SubAccounts';
// import AssetsSubAccounts from './AssetsSubAccounts/AssetsSubAccounts';
// import LiabilitiesSubAccounts from './LiabilitiesSubAccounts/LiabilitiesSubAccounts';
// import EquitySubAccounts from './EquitySubAccounts/EquitySubAccounts';
// import IncomeSubAccounts from './IncomeSubAccounts/IncomeSubAccounts';
// import ExpensesSubAccounts from './ExpensesSubAccounts/ExpensesSubAccounts';

const ChartsOfAccounts = () => {
    const [tab, setTab] = useState('mainaccs');
    return (
        <>
            <div className="bloc-tabs">
                    <button className={tab === "mainaccs" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("mainaccs")}> Main Accounts </button>
                    <button className={tab === "subaccs" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("subaccs")}> Sub Accounts </button>
                    {/* <button className={tab === "assetssubaccs" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("assetssubaccs")}> Assets </button>
                    <button className={tab === "liabilitiessubaccs" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("liabilitiessubaccs")}> Liabilities </button>
                    <button className={tab === "equitysubaccs" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("equitysubaccs")}> Equity </button>
                    <button className={tab === "incomesubaccs" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("incomesubaccs")}> Income </button>
                    <button className={tab === "expensessubaccs" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("expensessubaccs")}> Expenses </button> */}
            </div>
            <div className='tab-content font-12' style={{marginTop:"3rem"}}>
                {{
                    'mainaccs': <MainAccounts setTab={setTab}/>,
                    'subaccs': <SubAccounts setTab={setTab}/>,
                    // 'assetssubaccs': <AssetsSubAccounts setTab={setTab}/>,
                    // 'liabilitiessubaccs': <LiabilitiesSubAccounts setTab={setTab}/>,
                    // 'equitysubaccs': <EquitySubAccounts setTab={setTab}/>,
                    // 'incomesubaccs': <IncomeSubAccounts setTab={setTab}/>,
                    // 'expensessubaccs': <ExpensesSubAccounts setTab={setTab}/>,
                }[tab]}
            </div>
        </>
    );
}

export default ChartsOfAccounts;