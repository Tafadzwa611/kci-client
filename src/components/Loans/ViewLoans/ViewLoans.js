import React, {useEffect, useState} from 'react';
import LoansList from '../LoansList/LoansList';
import DueLoansList from '../DueLoans/DueLoansList';
import ViewDefaultsAndArrears from '../DefaultedAndArrearsLoans/ViewDefaultsAndArrears';
import { makeRequest } from '../../../utils/utils';



const ViewLoans = ({setSidebar}) => {

    const [tab, setTab] = useState('loans');
    const [tenantID, setTenantID] = React.useState([]);


    useEffect(() => {
        document.title = 'View Loans';
    }, []);

    React.useEffect(() => {
        getTenant();
    }, []);
    
    const getTenant = async () => {
        window.scrollTo(0, 0);
        const data = await fetchTenant();
        setTenantID(data);
    }
    
    async function fetchTenant() {
        try {
            const response = await makeRequest.get('/usersapi/logged_in_user/', {timeout: 8000});

            if (response.ok) {
                const json_res = await response.json();
                return json_res;
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    } 
    
    console.log(tenantID)
    
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