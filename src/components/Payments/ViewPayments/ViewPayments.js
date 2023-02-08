import React, {useEffect, useState} from 'react';
import Payments from '../Payments/Payments';
import ViewPaymentsChart from '../PaymentsChart/ViewPaymentsChart';
import PaymentsReport from '../PaymentsReport/PaymentsReport';
import ExcelPayments from '../ExcelPayments/ExcelPayments';

const ViewPayments = () => {

    const [tab, setTab] = useState('payments');

    useEffect(() => {
        document.title = 'View Payments';
    }, []);
    
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="table-heading" style={{marginBottom:"20px"}}>View Payments</h5>
                <>
                    <div className="bloc-tabs">
                        <button className={tab === "payments" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("payments")}> View Payments </button>
                        <button className={tab === "addpayments" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("addpayments")}> Add Payments </button>
                        <button className={tab === "uploadfile" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("uploadfile")}> Upload File </button>
                        <button className={tab === "paymentcharts" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("paymentcharts")}> Payments Chart </button>
                        <button className={tab === "paymentrpts" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("paymentrpts")}> Payments Report </button>

                    </div>
                    <div className='tab-content font-12' style={{marginTop:"3rem"}}>
                        {{
                            'payments': <Payments setMainTab={setTab}/>,
                            'paymentcharts': <ViewPaymentsChart setMainTab={setTab}/>,
                            'uploadfile': <ExcelPayments setMainTab={setTab}/>,
                            'paymentrpts': <PaymentsReport setMainTab={setTab}/>,
                        }[tab]}
                    </div>
                </>
            </div>
        </div>
    );
}

export default ViewPayments;