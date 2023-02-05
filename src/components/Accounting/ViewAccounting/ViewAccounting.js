import React, {useState, useEffect} from 'react';
import Cashflow from '../Cashflow/Cashflow';
import CashReport from '../CashReport/CashReport';
import ProfitAndLoss from '../ProfitAndLoss/ProfitAndLoss';
import TrialBalance from '../TrialBalance/TrialBalance';
import Journals from '../Journals/Journals';
import ChartsOfAccounts from '../ChartsOfAccounts/ChartsOfAccounts';
import BalanceSheet from '../BalanceSheet/BalanceSheet';
import Ledger from '../Ledger/Ledger';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';

const ViewAccounting = () => {
    const [tab, setTab] = useState('cshflw');

    useEffect(() => {
        document.title = 'View Accounting';
    }, []);
    
    const {loggedInUser} = useLoggedInUser()

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="table-heading" style={{marginBottom:"20px"}}>View Accounting</h5>
                <>
                    <div className="bloc-tabs">
                            <button className={tab === "cshflw" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("cshflw")}> Cashflow </button>
                            <button className={tab === "cshmngmnt" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("cshmngmnt")}> Cash Management </button>
                            <button className={tab === "prftnls" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("prftnls")}> Profit & Loss </button>
                            <button className={tab === "trlbnce" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("trlbnce")}> Trial Balance </button>
                            <button className={tab === "blncesht" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("blncesht")}> Balance Sheet </button>
                            <button className={tab === "jrnls" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("jrnls")}> Journal Entries </button>
                            <button className={tab === "chtsoaccs" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("chtsoaccs")}> Charts of Accounts </button>
                            <button className={tab === "ledger" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("ledger")}> Ledger </button>
                    </div>
                    <div className='tab-content font-12' style={{marginTop:"3rem"}}>
                        {{
                            'cshflw': <Cashflow setTab={setTab}/>,
                            'cshmngmnt': <CashReport setTab={setTab}/>,
                            'prftnls': <ProfitAndLoss loggedInUser={loggedInUser} />,
                            'trlbnce': <TrialBalance setTab={setTab}/>,
                            'blncesht': <BalanceSheet setTab={setTab}/>,
                            'jrnls': <Journals setTab={setTab}/>,
                            'chtsoaccs': <ChartsOfAccounts setTab={setTab}/>,
                            'ledger': <Ledger setTab={setTab}/>
                        }[tab]}
                    </div>
                </>
            </div>
        </div>
    );
}

export default ViewAccounting;