import React, {useEffect, useState} from 'react';
import LoansList from '../LoansList/LoansList';
import DueLoansList from '../DueLoans/DueLoansList';
import ViewDefaultsAndArrears from '../DefaultedAndArrearsLoans/ViewDefaultsAndArrears';



const ViewLoans = ({setSidebar}) => {

    const [tab, setTab] = useState('loans');

    useEffect(() => {
        document.title = 'View Loans';
    }, []);
    
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="table-heading" style={{marginBottom:"20px"}}>View Loans</h5>
                <>
                    <div className="bloc-tabs">
                            <button className={tab === "loans" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("loans")}> View Loans </button>
                            <button className={tab === "addloan" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("addloan")}> Add Loan </button>
                            <button className={tab === "dueloans" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("dueloans")}> Due Loans </button>
                            <button className={tab === "arrsloans" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("arrsloans")}> Arrears loans </button>
                    </div>
                    <div className='tab-content font-12' style={{marginTop:"3rem"}}>
                        {{
                            'loans': <LoansList setSidebar={setSidebar} setMainTab={setTab}/>,
                            'dueloans': <DueLoansList setMainTab={setTab}/>,
                            'arrsloans': <ViewDefaultsAndArrears setMainTab={setTab}/>,
                        }[tab]}
                    </div>
                </>
            </div>
        </div>
    );
}

export default ViewLoans;