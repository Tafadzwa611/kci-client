import React, {useState, useEffect} from 'react';
import Cashflow from '../Cashflow/Cashflow';
import CashReport from '../CashReport/CashReport';

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
                            <button className={tab === "info" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("info")}> Profit & Loss </button>
                            <button className={tab === "addr" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("addr")}> Trial Balance </button>
                            <button className={tab === "emp" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("emp")}> Balance Sheet </button>
                            <button className={tab === "bnk" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("bnk")}> Journal Entries </button>
                            <button className={tab === "kin" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("kin")}> Charts of Accounts </button>
                    </div>
                    <div className='tab-content font-12' style={{marginTop:"3rem"}}>
                        {{
                            'cshflw': <Cashflow setTab={setTab}/>,
                            'cshmngmnt': <CashReport setTab={setTab}/>
                        }[tab]}
                    </div>
                </>
            </div>
        </div>
    );
}

export default ViewAccounting;