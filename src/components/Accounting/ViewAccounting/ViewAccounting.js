import React, {useState, useEffect} from 'react';
import Cashflow from '../Cashflow/Cashflow';
import CashReport from '../CashReport/CashReport';
import ProfitAndLoss from '../ProfitAndLoss/ProfitAndLoss';
import TrialBalance from '../TrialBalance/TrialBalance';
import Journals from '../Journals/Journals';

const ViewAccounting = () => {
    const [tab, setTab] = useState('cshflw');

    useEffect(() => {
        document.title = 'View Accounting';
    }, []);
    
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
                            <button className={tab === "emp" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("emp")}> Balance Sheet </button>
                            <button className={tab === "jrnls" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("jrnls")}> Journal Entries </button>
                            <button className={tab === "kin" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("kin")}> Charts of Accounts </button>
                    </div>
                    <div className='tab-content font-12' style={{marginTop:"3rem"}}>
                        {{
                            'cshflw': <Cashflow setTab={setTab}/>,
                            'cshmngmnt': <CashReport setTab={setTab}/>,
                            'prftnls': <ProfitAndLoss setTab={setTab}/>,
                            'trlbnce': <TrialBalance setTab={setTab}/>,
                            'jrnls': <Journals setTab={setTab}/>
                        }[tab]}
                    </div>
                </>
            </div>
        </div>
    );
}

export default ViewAccounting;