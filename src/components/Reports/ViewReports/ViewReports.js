import React, {useEffect, useState} from 'react';
import ClientsReport from '../ClientsReport/ClientsReport';
import LoansReport from '../LoansReport/LoansReport';
import MonthlyReport from '../MonthlyReport/MonthlyReport';
import TopBorrowers from '../TopBorrowers/TopBorrowers';
import DisbursementReport from '../DisbursementReport/DisbursementReport';
import LoanProductReport from '../LoanProductReport/LoanProductReport';
import FeesReport from '../FeesReport/FeesReport';
import LoanOfficerReport from '../LoanOfficerReport/LoanOfficerReport';
import DailyReport from '../DailyReport/DailyReport';
import AgingReport from '../AgingReport/AgingReport';
import PortfolioAtRiskReport from '../PortfolioAtRiskReport/PortfolioAtRiskReport'

const ViewReports = () => {

    const [tab, setTab] = useState('clientsreport');

    useEffect(() => {
        document.title = 'View Reports';
    }, []);
    
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="table-heading" style={{marginBottom:"20px"}}>View Reports</h5>
                <>
                    <div className="bloc-tabs">
                            <button className={tab === "clientsreport" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("clientsreport")}> Clients Report </button>
                            <button className={tab === "loansreport" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("loansreport")}> Loans Report </button>
                            <button className={tab === "monthlyreport" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("monthlyreport")}> Monthly Report </button>
                            <button className={tab === "topbrrwers" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("topbrrwers")}> Top Borrowers </button>
                            <button className={tab === "disbursmntreport" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("disbursmntreport")}> Disbursement Report </button>
                            <button className={tab === "loanpdtrpt" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("loanpdtrpt")}> Loan Product Report </button>
                            <button className={tab === "feesrpt" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("feesrpt")}> Fees Report </button>
                            <button className={tab === "loanoffrreport" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("loanoffrreport")}> loans Officer Report </button>
                            <button className={tab === "dailyrpt" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("dailyrpt")}> Daily report </button>
                            <button className={tab === "agingrpt" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("agingrpt")}> Aging Report </button>
                            <button className={tab === "parreport" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("parreport")}> Par Report </button>
                    </div>
                    <div className='tab-content font-12' style={{marginTop:"3rem"}}>
                        {{
                            'clientsreport': <ClientsReport />,
                            'loansreport': <LoansReport />,
                            'monthlyreport': <MonthlyReport />,
                            'topbrrwers': <TopBorrowers />,
                            'disbursmntreport': <DisbursementReport />,
                            'loanpdtrpt': <LoanProductReport />,
                            'feesrpt': <FeesReport />,
                            'loanoffrreport': <LoanOfficerReport />,
                            'dailyrpt': <DailyReport />,
                            'agingrpt': <AgingReport />,
                            'parreport': <PortfolioAtRiskReport />,
                        }[tab]}
                    </div>
                </>
            </div>
        </div>
    );
}

export default ViewReports;