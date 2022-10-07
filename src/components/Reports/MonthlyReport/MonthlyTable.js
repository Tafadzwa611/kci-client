import React, { Fragment } from 'react';
import { FirstRow, SecondRow, ThirdRow } from './TableRows';

const MonthlyTable = ({report, currencyIso}) => {
    return (
        <div className="table-container" style={{padding:"0", paddingTop:"1.5rem", border:"none"}}>
            <div className="table-responsive font-12" style={{maxHeight:"600px"}}>
                <table className="table" style={{width:"100%"}}>
                    <thead className="clients-report-table">
                        <tr className="journal-details fees__report_thead">
                            <th className="text-right">Month</th>
                            <th className="text-right">New_Loans</th>
                            <th className="text-right">Active_Clients</th>
                            <th className="text-right">Number_of_Repayments</th>
                            <th className="text-right">Total_Principal_Released</th>
                            <th className="text-right">Current_Principal_At_Risk</th>
                            <th></th>
                            <th className="text-right">Principal_Disbursed</th>
                            <th className="text-right">Interest_Expected</th>
                            <th className="text-right">Fees_Expected</th>
                            <th className="text-right">Penalty</th>
                            <th className="text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    {report.map((monthlyReport, index) => {
                        return (
                            <Fragment key={index}>
                                <FirstRow monthlyReport={monthlyReport}/>
                                <SecondRow monthlyReport={monthlyReport} currencyIso={currencyIso}/>
                                <ThirdRow monthlyReport={monthlyReport} currencyIso={currencyIso}/>
                            </Fragment>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MonthlyTable;