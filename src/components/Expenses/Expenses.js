import React, {useEffect, useState} from 'react';
import ViewExpenses from './ViewExpenses';
import ExpensesReport from './ExpensesReport/ExpensesReport';


const Expenses = () => {

    const [tab, setTab] = useState('expenses');

    useEffect(() => {
        document.title = 'View Expenses';
    }, []);
    
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="table-heading" style={{marginBottom:"20px"}}>View expenses</h5>
                <>
                    <div className="bloc-tabs">
                            <button className={tab === "expenses" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("expenses")}> Expenses </button>
                            <button className={tab === "expensesreport" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("expensesreport")}> Expenses Report </button>
                    </div>
                    <div className='tab-content font-12' style={{marginTop:"3rem"}}>
                        {{
                            'expenses': <ViewExpenses setMainTab={setTab}/>,
                            'expensesreport': <ExpensesReport setMainTab={setTab}/>,
                        }[tab]}
                    </div>
                </>
            </div>
        </div>
    );
}

export default Expenses;