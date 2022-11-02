import React, {useEffect, useState} from 'react';
import ViewOtherincome from './ViewOtherIncome';
import OtherIncomeReport from './OtherIncomeReport/OtherIncomeReport';


const OtherIncome = () => {

    const [tab, setTab] = useState('otherincome');

    useEffect(() => {
        document.title = 'View Other Income';
    }, []);
    
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="table-heading" style={{marginBottom:"20px"}}>View Other Income</h5>
                <>
                    <div className="bloc-tabs">
                            <button className={tab === "otherincome" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("otherincome")}> Other Income </button>
                            <button className={tab === "otherincomereport" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("otherincomereport")}> Other Income Report </button>
                    </div>
                    <div className='tab-content font-12' style={{marginTop:"3rem"}}>
                        {{
                            'otherincome': <ViewOtherincome setMainTab={setTab}/>,
                            'otherincomereport': <OtherIncomeReport setMainTab={setTab}/>,
                        }[tab]}
                    </div>
                </>
            </div>
        </div>
    );
}

export default OtherIncome;