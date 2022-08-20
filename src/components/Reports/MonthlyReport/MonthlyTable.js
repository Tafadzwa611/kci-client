import React, { Fragment } from 'react';
import { FirstRow, SecondRow, ThirdRow } from './TableRows';

const MonthlyTable = ({report, currencyIso}) => {
    return (
        <div className="table-container">
            <div className="table-responsive font-12" style={{maxHeight:"600px"}}>
                <table className="table" style={{width:"100%"}}>
                    <thead>
                        <tr>
                            <th className="text-right text-light">Month</th>
                            <th className="text-right text-light">New_Loans</th>
                            <th className="text-right text-light">Active_Clients</th>
                            <th className="text-right text-light">Number_of_Repayments</th>
                            <th className="text-right text-light">Total_Principal_Released</th>
                            <th className="text-right text-light">Current_Principal_At_Risk</th>
                            <th></th>
                            <th className="text-right text-light">Principal_Disbursed</th>
                            <th className="text-right text-light">Interest_Expected</th>
                            <th className="text-right text-light">Fees_Expected</th>
                            <th className="text-right text-light">Penalty</th>
                            <th className="text-right text-light">Total</th>
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