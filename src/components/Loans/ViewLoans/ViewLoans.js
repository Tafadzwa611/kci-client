import React, {useEffect, useState} from 'react';
import LoansList from '../LoansList/LoansList';
// import AddClient from '../add_client/AddClient';


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
                            <button className={tab === "cshmngmnt" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("cshmngmnt")}> Add Client </button>
                    </div>
                    <div className='tab-content font-12' style={{marginTop:"3rem"}}>
                        {{
                            'loans': <LoansList setSidebar={setSidebar} setMainTab={setTab}/>,
                            // 'cshmngmnt': <AddClient setMainTab={setTab}/>,
                        }[tab]}
                    </div>
                </>
            </div>
        </div>
    );
}

export default ViewLoans;