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
import PaymentsReport from '../PaymentsReport/PaymentsReport';
import PortfolioAtRiskReport from '../PortfolioAtRiskReport/PortfolioAtRiskReport'
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';

const ViewReports = () => {

    const [tab, setTab] = useState('clientsreport');

    const {loggedInUser} = useLoggedInUser()

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
                            <button className={tab === "paymentsreport" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("paymentsreport")}> Payments Report </button>
                            <button className={tab === "monthlyreport" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("monthlyreport")}> Monthly Report </button>
                            <button className={tab === "topbrrwers" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("topbrrwers")}> Top Borrowers </button>
                            <button className={tab === "disbursmntreport" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("disbursmntreport")}> Disbursement Report </button>
                            <button className={tab === "loanpdtrpt" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("loanpdtrpt")}> Loan Product Report </button>
                            <button className={tab === "feesrpt" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("feesrpt")}> Fees Report </button>
                            <button className={tab === "loanoffrreport" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("loanoffrreport")}> loans Officer Report </button>
                            <button className={tab === "dailyrpt" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("dailyrpt")}> Daily report </button>
                            {/* <button className={tab === "agingrpt" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("agingrpt")}> Aging Report </button> */}
                            <button className={tab === "parreport" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("parreport")}> Par Report </button>
                    </div>
                    <div className='tab-content font-12' style={{marginTop:"3rem"}}>
                        {{
                            'clientsreport': <ClientsReport loggedInUser={loggedInUser} />,
                            'loansreport': <LoansReport loggedInUser={loggedInUser} />,
                            'paymentsreport': <PaymentsReport />,
                            'monthlyreport': <MonthlyReport loggedInUser={loggedInUser} />,
                            'topbrrwers': <TopBorrowers loggedInUser={loggedInUser} />,
                            'disbursmntreport': <DisbursementReport loggedInUser={loggedInUser} />,
                            'loanpdtrpt': <LoanProductReport loggedInUser={loggedInUser} />,
                            'feesrpt': <FeesReport loggedInUser={loggedInUser} />,
                            'loanoffrreport': <LoanOfficerReport loggedInUser={loggedInUser} />,
                            'dailyrpt': <DailyReport loggedInUser={loggedInUser}  />,
                            // 'agingrpt': <AgingReport />,
                            'parreport': <PortfolioAtRiskReport loggedInUser={loggedInUser} />,
                        }[tab]}
                    </div>
                </>
            </div>
        </div>
    );
}

export default ViewReports;